// REF: https://socket.io/docs/v3/server-initialization/
// REF: https://developer.spotify.com/documentation/general/guides/authorization-guide/

require("dotenv").config();

const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const compression = require("compression");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const auth = require("./authorization.js");
const api = require("./api.js");

nextApp.prepare().then(() => {
  app.use(compression());
  app.use(cookieParser());

  app.set("views", __dirname + "/views");
  // Embedded JavaScript for use with our Spotify Callback render
  app.set("view engine", "ejs");

  // need this to parse our refresh_token
  app.use(
    bodyParser.json({
      limit: 1024,
    })
  );

  // Auth Router
  app.use("/auth", auth);

  // API + Web Socket Router
  app.use("/api", api(io));

  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  // *** to-do: 404???

  server.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log(
      `Dude, let's surf the interwebs | Listening on port: ${
        process.env.PORT || 3000
      }`
    );
  });
});
