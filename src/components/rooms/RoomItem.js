import React from "react";
import TimeAgo from "timeago-react";

const RoomItem = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-disappear">Room Name</h3>
        <TimeAgo datetime={new Date()} className="font-normal" />
      </div>

      <div className="d-flex align-items-center">
        <span>No Messages Yet ...</span>
      </div>
    </div>
  );
};

export default RoomItem;