import React, { useCallback, useState } from "react";
import { Alert, Icon, Input, InputGroup } from "rsuite";
import firebase from "firebase/app";
import { useProfile } from "../../../context/profile.context";
import { useParams } from "react-router";
import { database } from "../../../misc/firebase";

function assembleMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {}),
    },
    createAt: firebase.database.ServerValue.TIMESTAMP,
  };
}

const Bottom = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { chatId } = useParams();
  const { profile } = useProfile();

  const onInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  const onClickSend = async () => {
    if (input.trim() === "") {
      return;
    }

    const msgData = assembleMessage(profile, chatId);
    msgData.text = input;

    const updates = {};

    const messageId = database.ref("messages").push().key;
    updates[`/messages/${messageId}`] = msgData;

    updates[`/rooms/${chatId}/lastMessage`] = {
      ...msgData,
      msgId: messageId,
    };

    setIsLoading(true);
    try {
      await database.ref().update(updates);
      setInput("");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.error(error.message);
    }
  };

  const onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      onClickSend();
    }
  };

  return (
    <div>
      <InputGroup>
        <Input
          className="msg-box"
          placeholder="Write a new message here ... "
          value={input}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
        />
        <InputGroup.Button
          className="msg-send-btn"
          appearance="dark"
          onClick={onClickSend}
          disabled={isLoading}
        >
          <Icon icon="send" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default Bottom;
