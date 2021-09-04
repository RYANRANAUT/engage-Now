import React, { useCallback } from "react";
import { Alert, Button, Drawer, Icon } from "rsuite";
import Dashboard from ".";
import { isOfflineForDatabase } from "../../context/profile.context";
import { useMediaQuery, useModalState } from "../../misc/custom-hooks";
import { auth, database } from "../../misc/firebase";

const DashboardToggle = () => {
  const { isOpen, close, open } = useModalState();
  const isMobile = useMediaQuery("(max-width: 992px)");
  const onSignOut = useCallback(() => {
    database
      .ref(`/status/${auth.currentUser.uid}`)
      .set(isOfflineForDatabase)
      .then(() => {
        auth.signOut();
        Alert.info("Signed Out", 4000);
        close();
      })
      .catch((err) => {
        Alert.error(err.message, 4000);
      });
  }, [close]);

  return (
    <>
      <Button
        block
        style={{ backgroundColor: "#1f2833", color: "#66FCF1" }}
        className="dashboard"
        onClick={open}
      >
        <Icon icon="dashboard" /> DASHBOARD
      </Button>

      <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
