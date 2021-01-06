import React from "react";
import { FormattedMessage } from "react-intl";

// ================= //
//       USERS       //
// ================= //

export default ({ items }) => {
  return (
    <div className="row justify-content-center p-1">
      <h2 className="user-list-header">
        <FormattedMessage id="online" />
      </h2>
      <ul className="user-list col-12">
        {items.map((i, index) => {
          const userName = i.display_name || i.id;
          return (
            <li key={index} className="user-list-item">
              <div className="user-image-container">
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
              <div className="user-name">{userName}</div>
            </li>
          );
        })}
      </ul>

      <div style={{ clear: "both" }} />
    </div>
  );
};
