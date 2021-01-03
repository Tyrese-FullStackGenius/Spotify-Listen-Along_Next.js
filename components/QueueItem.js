import React from "react";

// ================= //
//    QUEUE ITEM     //
// ================= //

export default ({ index, item, session, onRemoveItem, onVoteUp }) => {
  const voteUp =
    item.voters &&
    session.user &&
    item.voters.filter((voter) => voter.id === session.user.id).length === 0 ? (
      <button onClick={onVoteUp}> ▲ </button>
    ) : null;
  return (
    <tr>
      {/* *** Let's fine-tune with inline styles here... */}
      <td className=".queue-item-table-data">
        <img src={item.track.album.images[2].url} width="40" height="40" />
      </td>
      <td className=".queue-item-table-data">{index + 1}</td>
      <td className=".queue-item-table-data">{item.track.name}</td>
      <td className=".queue-item-table-data">
        {item.track.artists.map((a) => a.name).join(", ")}
      </td>
      <td className=".queue-item-table-data">
        {item.user && (item.user.display_name || item.user.id)}
      </td>
      <td>
        {item.user && session.user && item.user.id === session.user.id ? (
          <button
            onClick={() => {
              onRemoveItem(item.id);
            }}
          >
            X
          </button>
        ) : (
          voteUp
        )}
      </td>
      <td>
        {item.voters && item.voters.length > 0 ? (
          <span>
            {item.voters.length === 1
              ? "1 vote"
              : item.voters.length + " votes"}
          </span>
        ) : (
          ""
        )}
      </td>
    </tr>
  );
};
