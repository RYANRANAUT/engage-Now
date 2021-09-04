import React from "react";
import { Button, Modal } from "rsuite";
import { useModalState } from "../../../misc/custom-hooks";
import ProfileAvatar from "../../ProfileAvatar";

const ProfileInfoBtnModal = ({ profile, children, ...btnProps }) => {
  const { isOpen, close, open } = useModalState();
  const { name, avatar, createdAt } = profile;
  const shortName = profile.name.split(" ")[0];
  const memberSince = new Date(createdAt).toLocaleDateString();

  return (
    <>
      <Button {...btnProps} onClick={open} style={{ color: "#c5c6c7" }}>
        {shortName}
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          {/* <Modal.Title>{shortName} profile</Modal.Title> */}
        </Modal.Header>
        <Modal.Body className="text-center">
          <ProfileAvatar
            src={avatar}
            name={name}
            className="width-200 height-200 img-fullsize font-huge"
          />
          <h4 className="mt-2" style={{ color: "black" }}>
            {name}
          </h4>
          <p style={{ color: "black" }}>Member since {memberSince}</p>
        </Modal.Body>
        <Modal.Footer>
          {children}
          <Button
            block
            onClick={close}
            style={{ backgroundColor: "#1f2833", color: "#66FCF1" }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileInfoBtnModal;
