// REF: https://react-redux.js.org/using-react-redux/connect-mapdispatch
// REF: https://react-redux.js.org/using-react-redux/connect-mapstate
// REF: https://github.com/formatjs/formatjs

import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import QueueItem from "./QueueItem.js";

import { queueRemoveTrack } from "../features/queue/queueActions.js";
import { voteUp } from "../features/vote/voteActions.js";

// ================= //
//       QUEUE       //
// ================= //

class Queue extends React.PureComponent {
  // * note: React.Component vs React.PureComponent... PureComponent does a SHALLOW COMPARISON on state change
  render() {
    const { items, session } = this.props;
    return (
      <div className="queue row justify-content-center p-2">
        <h2 className="queue-header">
          <FormattedMessage id="queue.title" />
        </h2>
        {items.length === 0 ? (
          <p>
            <FormattedMessage id="queue.empty" />
          </p>
        ) : (
          <table className="queue-table">
            <tbody>
              {items.map((i, index) => (
                <QueueItem
                  item={i}
                  session={session}
                  index={index}
                  key={index}
                  onVoteUp={() => this.props.voteUp(i.id)}
                  onRemoveItem={() => this.props.queueRemoveTrack(i.id)}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

// Dispatch actions with mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  voteUp: (id) => dispatch(voteUp(id)),
  queueRemoveTrack: (id) => dispatch(queueRemoveTrack(id)),
});

// Extract data with mapStateToProps
const mapStateToProps = (state) => ({
  queue: state.queue,
});

export default connect(mapStateToProps, mapDispatchToProps)(Queue);
