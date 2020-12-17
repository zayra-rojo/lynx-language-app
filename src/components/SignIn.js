import React, { useState } from 'react';
import { Card } from 'antd';
import '../style.css';
import firebase from 'firebase';
import { auth } from '../utils/firebase';
import { Typography, Layout, Row, Col } from 'antd';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
const { Title } = Typography;

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccess: () => false,
  },
};
const SignIn = () => {
  return (
    <div>
      <Row
        Row
        type='flex'
        justify='center'
        align='middle'
        style={{ minHeight: '100vh' }}
      >
        <Col>
          <Card padding='40px 60px' align='middle'>
            <Title level={2}>Sign in with Google</Title>
            <br />
            <br />
            <div>
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default SignIn;
