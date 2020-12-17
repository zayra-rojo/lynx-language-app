import React, { Component } from 'react';
import SignIn from './SignIn';
import LayoutPage from './Layout';
import firebase from 'firebase';
import { auth } from '../utils/firebase';

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
