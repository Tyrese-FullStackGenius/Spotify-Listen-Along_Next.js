const fs = require("fs");

// ================== //
//    QUEUE MANAGER   //
// ================== //

class QueueManager {
  constructor(options) {
    this.playingContext = {
      track: null,
      user: null,
      startTimestamp: null,
    };
    this.queue = [];
    this.onQueueChanged = options.onQueueChanged;
    this.onQueueEnded = options.onQueueEnded;
    this.onPlay = options.onPlay;
    this.getToken = options.getToken;
    this.spotifyApi = options.spotifyApi;
    this.playedHistory = [];
  }

  handleQueueChanged() {
    this.sort();
    this.save();
    this.onQueueChanged();
  }

  getPlayingContext() {
    return this.playingContext;
  }

  getQueue() {
    return this.queue;
  }

  // Sort queue according to user votes
  sort() {
    this.queue.sort((a, b) => {
      const diffVoters = b.voters.length - a.voters.length;
      if (diffVoters !== 0) {
        return diffVoters;
      } else {
        return a.queuedTimestamp - b.queuedTimestamp;
      }
    });
  }

  addItem(queueItem) {
    this.queue.push(queueItem);
    this.handleQueueChanged();
    // If there is no track playing, play the track we're trying to add to the queue
    if (this.playingContext.track === null) {
      this.play();
    }
  }

  removeId(user, id) {
    const index = this.queue.findIndex((item) => item.id === id);
    if (index !== -1 && this.queue[index].user.id === user.id) {
      this.queue.splice(index, 1);
      this.handleQueueChanged();
    }
  }

  initialize() {
    this.play();
  }

  play() {
    console.log(`api.js says... > play`);
    // If there is already at least one song in the queue...
    if (this.queue.length > 0) {
      console.log(`api.js says... > play has a queue`);

      // Let's add to our queue...
      const queueItem = this.queue.shift();
      this.handleQueueChanged();
      this.playingContext = {
        track: queueItem.track,
        user: queueItem.user,
        startTimestamp: Date.now(),
        voters: queueItem.voters,
      };
      this.playedHistory.push({
        track: queueItem.track,
        user: queueItem.user,
      });
      setTimeout(() => {
        this.play();
      }, 2000 + queueItem.track.duration_ms);
      this.onPlay();

      // Otherwise... no song in the queue!
    } else {
      this.playingContext = {
        track: null,
        user: null,
        startTimestamp: null,
        voters: [],
      };

      this.onQueueEnded();
    }
  }

  voteUpId(user, id) {
    const index = this.queue.findIndex((item) => item.id === id);
    if (index === -1) {
      return false;
    }
    const voters = this.queue[index].voters;
    if (voters) {
      const userVotes = voters.filter((voter) => voter.id === user.id);
      if (userVotes.length === 0) {
        this.queue[index].voters.push(user);
        this.handleQueueChanged();
        return true;
      }
    }
  }

  // Save our queue locally via fs
  save() {
    fs.writeFileSync(
      `./queue.json`,
      JSON.stringify({
        playingContext: this.playingContext,
        queue: this.queue,
      }),
      ``
    );
  }

  // Read our locally stored queue via fs
  read() {
    try {
      const data = JSON.parse(fs.readFileSync(`./queue.json`));
      this.playingContext = data.playingContext;
      this.queue = data.queue;
    } catch (err) {
      // do nothing...
    }
  }
}

module.exports = QueueManager;
