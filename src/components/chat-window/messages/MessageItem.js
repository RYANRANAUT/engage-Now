import React, { memo } from "react";
import { Button } from "rsuite";
import TimeAgo from "timeago-react";
import { useCurrentRoom } from "../../../context/current-room.context";
import { useHover, useMediaQuery } from "../../../misc/custom-hooks";
import { auth } from "../../../misc/firebase";
import PresenceDot from "../../PresenceDot";
import ProfileAvatar from "../../ProfileAvatar";
import IconBtnControl from "./IconBtnControl";
import ImgBtnModal from "./ImgBtnModal";
import ProfileInfoBtnModal from "./ProfileInfoBtnModal";

const renderFileMessage = (file) => {
  if (file.contentType.includes("image")) {
    return (
      <div className="height-220">
        <ImgBtnModal src={file.url} fileName={file.name} />
      </div>
    );
  }

  if (file.contentType.includes("audio")) {
    return (
      <audio controls>
        <source src={file.url} type="audio/mp3" />
        Sorry, Audio element not supported...
      </audio>
    );
  }

  return <a href={file.url}>Download {file.name}</a>;
};

const MessageItem = ({ message, handleAdmin, handleLike, handleDelete }) => {
  const { author, createAt, text, file, likes, likeCount } = message;

  const [selfRef, isHovered] = useHover();
  const isMobile = useMediaQuery("(max-width: 992px)");

  const isAdmin = useCurrentRoom((v) => v.isAdmin);
  const admins = useCurrentRoom((v) => v.admins);

  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;

  const canShowIcons = isMobile || isHovered;
  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);

  return (
    <li
      className={`padded mb-1 cursor-pointer ${isHovered ? "bg-black-02" : ""}`}
      ref={selfRef}
    >
      <div className="d-flex align-items-center font-bolder mb-1">
        <PresenceDot uid={author.uid} />

        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        />

        <ProfileInfoBtnModal
          profile={author}
          appearance="link"
          className="p-0 ml-1"
        >
          {canGrantAdmin && (
            <Button
              block
              onClick={() => handleAdmin(author.uid)}
              style={{
                backgroundColor: "#1f2833",
                color: "#66FCF1",
                letterSpacing: "2px",
              }}
            >
              {isMsgAuthorAdmin ? "Remove admin access" : "Give admin access"}
            </Button>
          )}
        </ProfileInfoBtnModal>
        <TimeAgo
          datetime={createAt}
          className="font-normal ml-2"
          style={{ color: "#45a29e" }}
        />

        <IconBtnControl
          {...(isLiked ? { color: "violet" } : { color: "violet" })}
          isVisible={canShowIcons}
          iconName="heart"
          tooltip="Like"
          onClick={() => handleLike(message.id)}
          badgeContent={likeCount}
        />

        {isAuthor && (
          <IconBtnControl
            style={{ backgroundColor: "violet" }}
            isVisible={canShowIcons}
            iconName="close"
            tooltip="Delete message"
            onClick={() => handleDelete(message.id, file)}
          />
        )}
      </div>

      <div>
        {text && (
          <span className="word-break-all" style={{ color: "#c5c6c7" }}>
            {text}
          </span>
        )}

        {file && renderFileMessage(file)}
      </div>
    </li>
  );
};

export default memo(MessageItem);
