// REF: https://socket.io/docs/v3
// REF: https://socket.io/docs/v3/server-initialization/
// REF: https://socket.io/docs/v3/server-socket-instance/
// REF: https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow
// REF: https://developer.spotify.com/documentation/general/guides/authorization-guide/

const express = require("express");
const SpotifyWebAPI = require("spotify-web-api-node");

const AuthConfig = require("../config/authorization.js");

const Robot = require("./models/RecommendationRobot.js");
const QueueItem = require("./models/QueueItem.js");
const QueueManager = require("./models/QueueManager.js");

const spotifyApi = new SpotifyWebAPI({
  clientId: AuthConfig.CLIENT_ID,
  clientSecret: AuthConfig.CLIENT_SECRET,
});

const Router = express.Router;

// ================== //
//   AUTHENTICATE     //
// ================== //

let accessToken = null;

// Fetch a new Token
const fetchNewToken = (callback) => {
  console.log("fetchNewToken method says... > Fetching new token..");
  spotifyApi
    .clientCredentialsGrant()
    .then((data) => {
      accessToken = data.body["access_token"];
      const expires_in = data.body["expires_in"];
      spotifyApi.setAccessToken(accessToken);
      callback && callback(accessToken);
      setTimeout(() => {
        fetchNewToken();
      }, (expires_in - 10 * 60) * 1000);
    })
    .catch((err) => {
      console.error(
        "fetchNewToken method says... > Error fetching new token",
        err
      );
    });
};

// Returns a new token OR the cached one must still be valid
const getToken = (callback) => {
  if (accessToken !== null) {
    callback && callback(accessToken);
  } else {
    fetchNewToken(callback);
  }
};

// Initialize our Recommender Robot
const roboUser = new Robot({
  getToken: getToken,
  spotifyApi: spotifyApi,
});

// Add our Recommender Robot to our users array.
// He'll always be in the room. Always. :)
let users = [roboUser.toJSON()];

// REF: https://stackoverflow.com/questions/53030744/should-i-use-a-global-variable-to-share-socket-io-instance-across-entire-server
let globalSocket = null;
let globalIo = null;

// ======================= //
//      QUEUE MANAGER      //
// ======================= //

const queueManager = new QueueManager({
  onPlay: () => {
    const { track, user } = queueManager.getPlayingContext();
    // if one user happens to log-in on multiple tabs, just send "play track" on one tab, and "update now playing" to other tabs....
    users.forEach((u) => {
      u.socketIdArray.forEach((socketId, index) => {
        if (index === 0) {
          // Send our "play track" event
          globalIo.to(socketId).emit("play track", track, user);
        } else {
          // Send our "update now playing" event
          globalIo.to(socketId).emit("update now playing", track, user);
        }
      });
    });
  },

  // Send our "update queue" event
  onQueueChanged: () => {
    globalSocket && globalSocket.emit("update queue", queueManager.getQueue());
    globalSocket &&
      globalSocket.broadcast.emit("update queue", queueManager.getQueue());
  },

  // Send our "update queue" event
  onQueueEnded: async () => {
    globalSocket && globalSocket.emit("update queue", queueManager.getQueue());
    globalSocket &&
      globalSocket.broadcast.emit("update queue", queueManager.getQueue());

    // Since our queue is empty, have our Recommender Robot generate a recommendation based on Spotify seeds
    const roboRecommendation = await roboUser.generateRecommendations(
      queueManager.playedHistory,
      getToken,
      spotifyApi
    );
    // As long as Robot returns a recommendation, add the recommended item to our queue
    if (roboRecommendation !== null) {
      queueManager.addItem(
        new QueueItem({
          track: roboRecommendation,
          user: roboUser,
        }).toJSON()
      );
    }
  },
});

queueManager.read();
queueManager.initialize();

const exportedApi = (io) => {
  // Still a little confused by the below, but following TOB's recommendationss...
  let api = Router();

  globalIo = io;

  // Home
  api.get("/", (req, res) => {
    res.json({ version });
  });

  // Now Playing
  api.get("/now-playing", (req, res) => {
    res.json(queueManager.playingContext);
  });

  // Queue
  api.get("/queue", (req, res) => {
    res.json(queueManager.queue);
  });

  // Users
  api.get("/users", (req, res) => {
    res.json(users);
  });

  // Auth
  api.get("/me", async (req, res) => {
    await getToken();
    try {
      const resApi = spotifyApi.getMe();
      res.json(resApi.body);
    } catch (err) {
      console.error("error", err);
      res.status(500);
    }
  });

  // ======================= //
  //   SOCKET.IO INTERFACE   //
  // ======================= //
  // * note: The socket object on both sides (server + client) extends the EventEmitter class, so...
  // ==> • socket.emit() sends our event
  // ==> • socket.on() receives our event by registering a listener

  io.on("connection", (socket) => {
    globalSocket = socket;

    // Listen for "queue track" event
    socket.on("queue track", (trackId) => {
      console.log("queueing track " + trackId);
      getToken(() => {
        spotifyApi
          .getTrack(trackId)
          .then((resApi) => {
            queueManager.addItem(
              new QueueItem({
                user: socket.user,
                track: resApi.body,
              }).toJSON()
            );
          })
          .catch((err) => {
            console.error("error", err);
          });
      });
    });

    // Listen for "vote up" event
    socket.on("vote up", (id) => {
      queueManager.voteUpId(socket.user, id);
    });

    // Listen for "remove track" event
    socket.on("remove track", (id) => {
      queueManager.removeId(socket.user, id);
    });

    // Listen for "user login" event
    socket.on("user login", (user) => {
      let index = -1;
      users.forEach((u, i) => {
        if (u.id === user.id) {
          index = i;
        }
      });

      socket.user = user;
      if (index !== -1) {
        // if the user has already loggedin...

        // then add their socketId into sockets
        users[index].socketIdArray.push(socket.id);
      } else {
        // otherwise... the user must not have logged-in yet
        users.push(Object.assign({}, user, { socketIdArray: [socket.id] }));

        // Send our "update users" event
        socket.emit("update users", users);
        socket.broadcast.emit("update users", users);

        // check to see if user should start playing something
        const playingContext = queueManager.getPlayingContext();
        if (playingContext.track !== null) {
          // Send our "play track" event
          socket.emit(
            "play track",
            playingContext.track,
            playingContext.user,
            Date.now() - playingContext.startTimestamp
          );
        }
      }
    });

    // Listen for "disconnect" event
    socket.on("disconnect", () => {
      console.log("disconnect " + socket.id);
      let userIndex = -1;
      let socketIdIndex = -1;
      // Update the rest of the users + their indices
      users.forEach((user, i) => {
        user.socketIdArray.forEach((socketId, j) => {
          if (socketId === socket.id) {
            userIndex = i;
            socketIdIndex = j;
          }
        });
      });

      // if user is logged in...
      if (userIndex !== -1 && socketIdIndex !== -1) {
        // if there are other users logged in as well...
        if (users[userIndex].socketIdArray.length > 1) {
          // then remove socketId from socketIdArray
          users[userIndex].socketIdArray.splice(socketIdIndex, 1);
        } else {
          // otherwise... remove user from users
          users.splice(userIndex, 1);
          // ...then send our "update users" event
          socket.emit(
            "update users",
            users.map((u) => u.user)
          );
          socket.broadcast.emit(
            "update users",
            users.map((u) => u.user)
          );
        }
      }
    });
  });

  return api;
};

module.exports = exportedApi;
