// REF: https://www.npmjs.com/package/uuid
// * note: a track uuid contains track index within the playlist, track uri, and track name

const { v4: uuidv4 } = require("uuid");

// ================== //
//     QUEUE ITEM     //
// ================== //

class QueueItem {
  constructor(options = {}) {
    this.id = options.id || uuidv4();
    this.track = options.track || {};
    this.user = options.user || {};
    this.voters = options.voters || [];
    this.startTimestamp = options.startTimestamp || null;
    this.queuedTimestamp = options.queuedTimestamp || Date.now();
  }
  toJSON() {
    return {
      id: this.id,
      user: this.user,
      track: this.track,
      voters: this.voters,
      startTimestamp: this.startTimestamp,
    };
  }
}

module.exports = QueueItem;
