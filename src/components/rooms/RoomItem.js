import React from "react";
import TimeAgo from "timeago-react";

const RoomItem = ({ room }) => {
  const { createdAt, name } = room;
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-disappear" style={{ color: "#66fcf1" }}>
          {name}
        </h3>
        <TimeAgo
          datetime={new Date(createdAt)}
          className="font-normal"
          style={{ color: "#45a29e" }}
        />
      </div>

      <div className="d-flex align-items-center">
        <span style={{ color: "#45a29e" }}>No Messages Yet ...</span>
      </div>
    </div>
  );
};

export default RoomItem;
