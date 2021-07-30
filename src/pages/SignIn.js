import React from "react";
import firebase from "firebase/app";
import { Container, Grid, Panel, Row, Col, Button, Icon, Alert } from "rsuite";
import { auth, database } from "../misc/firebase";

const SignIn = () => {
  const signInWithProvider = async (provider) => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }

      Alert.success("Signed in Successfully", 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const onFbSignIn = () => {
    signInWithProvider(new firebase.auth.FacebookAuthProvider());
  };

  const onGoogleSignIn = () => {
    signInWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2 className="title-header">engage Now</h2>
                <p>Conversation with the dear ones.</p>
              </div>

              <div className="mt-3">
                <Button block className="btn login" onClick={onFbSignIn}>
                  <Icon icon="facebook" /> Continue with Facebook
                </Button>

                <Button block className="btn login" onClick={onGoogleSignIn}>
                  <Icon icon="google" /> Continue with Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;
