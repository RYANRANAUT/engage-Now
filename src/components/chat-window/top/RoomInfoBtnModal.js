import React, { memo } from "react";
import { Button, Modal } from "rsuite";
import { useCurrentRoom } from "../../../context/current-room.context";
import { useModalState } from "../../../misc/custom-hooks";

const RoomInfoBtnModal = () => {
  const { isOpen, close, open } = useModalState();
  const description = useCurrentRoom((v) => v.description);
  const name = useCurrentRoom((v) => v.name);

  return (
    <>
      <Button appearance="link" className="px-0" onClick={open}>
        Group Information
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>
            <h5>About {name}</h5>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h6 className="mb-1">Description</h6>
          <p style={{ color: "black" }}>{description}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            block
            onClick={close}
            className="new-group"
            style={{ backgroundColor: "#1f2833", color: "#66FCF1" }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(RoomInfoBtnModal);
