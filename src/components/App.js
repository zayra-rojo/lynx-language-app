import React, { Component } from 'react';

import SignIn from './SignIn';
import LayoutPage from './Layout';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth } from '../utils/firebase';
import { Typography, Layout, Row, Col } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const { Title } = Typography;

class App extends Component {
  state = { isSignedIn: false };

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  componentDidMount = () => {
    auth.onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user });
    });
  };

  render() {
    return (
      <div className='App'>
        {this.state.isSignedIn ? (
          <LayoutPage />
        ) : (
          <div>
            <SignIn />
          </div>
        )}
      </div>
    );
  }
}
export default App;
