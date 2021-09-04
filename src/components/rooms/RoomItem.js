import React from "react";
import TimeAgo from "timeago-react";
import ProfileAvatar from "../ProfileAvatar";

const RoomItem = ({ room }) => {
  const { createAt, name, lastMessage } = room;
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-disappear" style={{ color: "#66fcf1" }}>
          {name}
        </h3>
        <TimeAgo
          datetime={
            lastMessage ? new Date(lastMessage.createAt) : new Date(createAt)
          }
          className="font-normal"
          style={{ color: "#45a29e" }}
        />
      </div>

      <div className="d-flex align-items-center">
        {lastMessage ? (
          <>
            <div className="d-flex align-items-center">
              <ProfileAvatar
                src={lastMessage.author.avatar}
                name={lastMessage.author.name}
                size="sm"
              />
            </div>

            <div className="text-disappear ml-2" style={{ color: "#c5c6c7" }}>
              <div className="italic">{lastMessage.author.name}</div>
              <span>{lastMessage.text || lastMessage.file.name}</span>
            </div>
          </>
        ) : (
          <span style={{ color: "#45a29e" }}>No Messages Yet ...</span>
        )}
      </div>
    </div>
  );
};

export default RoomItem;
