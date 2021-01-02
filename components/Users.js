import React from "react";

// ================= //
//       USERS       //
// ================= //

export default ({ items }) => {
  return (
    <div>
      <h2 className="user-list__header">ONLINE</h2>
      <ul className="user-list">
        {items.map((i, index) => {
          const userName = i.display_name || i.id;
          return (
            <li key={index} className="user-list__item media">
              <div className="media__img">
                <img
                  className="user-image"
                  src={
                    (i.images && i.images.length && i.images[0].url) ||
                    "/static/user-icon.png"
                  }
                  width="30"
                  height="30"
                  alt={userName}
                  title={userName}
                />
              </div>
              <div className="user-name media__bd">{userName}</div>
            </li>
          );
        })}
      </ul>
      <div style={{ clear: "both" }} />
    </div>
  );
};
