import React, { useState } from "react";
import { Alert, Button, Icon, Tag } from "rsuite";
import firebase from "firebase/app";
import { auth } from "../../misc/firebase";

const ProviderBlock = () => {
  const [isConnected, setIsConnected] = useState({
    "google.com": auth.currentUser.providerData.some(
      (data) => data.providerId === "google.com"
    ),
    "facebook.com": auth.currentUser.providerData.some(
      (data) => data.providerId === "facebook.com"
    ),
  });

  const updateIsConnected = (providerId, value) => {
    setIsConnected((p) => {
      return {
        ...p,
        [providerId]: value,
      };
    });
  };

  const unlink = async (providerId) => {
    try {
      if (auth.currentUser.providerData.length === 1) {
        throw new Error(`You can't disconnect from ${providerId}`);
      }

      await auth.currentUser.unlink(providerId);

      updateIsConnected(providerId, false);
      Alert.info(`Disconnected from ${providerId}`, 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const unlinkFacebook = () => {
    unlink("facebook.com");
  };
  const unlinkGoogle = () => {
    unlink("google.com");
  };

  const link = async (provider) => {
    try {
      await auth.currentUser.linkWithPopup(provider);
      Alert.info(`Linked to ${provider.providerId}`, 4000);

      updateIsConnected(provider.providerId, true);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  const linkFacebook = () => {
    link(new firebase.auth.FacebookAuthProvider());
  };
  const linkGoogle = () => {
    link(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <div>
      {isConnected["google.com"] && (
        <Tag
          className="dashboard-tags mt-3"
          color="green"
          closable
          onClose={unlinkGoogle}
        >
          <Icon style={{ color: "black" }} icon="google" />
          <h7 className="dashboard-headers">Connected</h7>
        </Tag>
      )}
      {isConnected["facebook.com"] && (
        <Tag
          className="dashboard-tags mt-3"
          color="blue"
          closable
          onclose={unlinkFacebook}
        >
          <Icon style={{ color: "black" }} icon="facebook" />
          <h7 className="dashboard-headers">Connected</h7>
        </Tag>
      )}

      <div className="mt-2">
        {!isConnected["google.com"] && (
          <Button block color="green" onClick={linkGoogle}>
            <Icon style={{ color: "black" }} icon="google" />
            <h7 className="dashboard-buttons">Link to Google</h7>
          </Button>
        )}

        {!isConnected["facebook.com"] && (
          <Button block color="blue" onClick={linkFacebook}>
            <Icon style={{ color: "black" }} icon="facebook" />
            <h7 className="dashboard-buttons">Link to Facebook</h7>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProviderBlock;
