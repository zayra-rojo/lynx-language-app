import React from 'react';
import { auth } from '../utils/firebase';
import { Layout, Menu } from 'antd';
import CardWithSong from './CardWithSong';

const { Header, Footer, Sider, Content } = Layout;

function Dashboard() {
  const cardInfo = {
    word: 'vieron',
    songName: 'Hawai',
    spotifyUri: '4uoR6qeWeuL4Qeu2qJzkuG',
  };
  let word = 'se';
  let songName = 'Se te nota';
  return (
    <span>
      <div>Dashboard</div>
      <CardWithSong cardInfo={cardInfo} />
    </span>
  );
}
export default Dashboard;

{
  /* <h1>Welcome {auth.currentUser.displayName}</h1>
      <h1>Zayra's uid: {auth.currentUser.uid}</h1> 
          <button onClick={() => auth.signOut()}>Sign out</button>
*/
}
