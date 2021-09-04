import React, { useCallback, useRef, useState } from "react";
// import { auth } from "../../misc/firebase";
import {
  Alert,
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Modal,
  Schema,
} from "rsuite";
import firebase from "firebase/app";
import { useModalState } from "../misc/custom-hooks";
import { auth, database } from "../misc/firebase";

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Group Name is required"),
  description: StringType().isRequired("Description is required"),
});

const INITIAL_FORM = {
  name: "",
  description: "",
};

const CreateRoomBtnModal = () => {
  const { isOpen, open, close } = useModalState();
  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const onFormChange = useCallback((value) => {
    setFormValue(value);
  }, []);

  const onSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }

    setIsLoading(true);

    const newRoomdata = {
      ...formValue,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      admins: {
        [auth.currentUser.uid]: true,
      },
    };

    try {
      await database.ref("rooms").push(newRoomdata);
      Alert.info(`${formValue.name} has been created`, 4000);
      setIsLoading(false);
      setFormValue(INITIAL_FORM);
      close();
    } catch (error) {
      setIsLoading(false);
      Alert.error(error.message, 4000);
    }
  };

  return (
    <div className="mt-1">
      <Button
        block
        className="new-group"
        style={{ backgroundColor: "#1f2833", color: "#66FCF1" }}
        onClick={open}
      >
        <Icon icon="creative" />
        CREATE NEW GROUP
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>
            <h5>NEW GROUP</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel>Add Name</ControlLabel>
              <FormControl name="name" placeholder="Type Group Name here .." />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Group Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={5}
                name="description"
                placeholder="Type Description here .."
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            className="new-group"
            style={{ backgroundColor: "#1f2833", color: "#66FCF1" }}
            onClick={onSubmit}
            disabled={isLoading}
          >
            Create new group
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;
