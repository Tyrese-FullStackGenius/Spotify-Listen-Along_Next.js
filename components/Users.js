import React from "react";
import { FormattedMessage } from "react-intl";

// ================= //
//       USERS       //
// ================= //

export default ({ items }) => {
  return (
    <div>
      <h2 className="user-list__header">
        <FormattedMessage id="online" />
      </h2>
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
                    "/images/user-icon.svg"
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
