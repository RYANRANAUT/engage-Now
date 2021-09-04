import React from "react";
import { Avatar } from "rsuite";
import { getNameInitials } from "../misc/helpers";

const ProfileAvatar = ({ name, ...avatarProps }) => {
  return (
    <Avatar
      circle
      {...avatarProps}
      style={{ background: "#1F2833", color: "#66fcf1" }}
    >
      {getNameInitials(name)}
    </Avatar>
  );
};

export default ProfileAvatar;
