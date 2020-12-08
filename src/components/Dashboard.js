import React from 'react';
import { auth, firestore } from '../utils/firebase';
import { Layout, Typography, Row, Col, Button, Card } from 'antd';
import CardWithSong from './CardWithSong';
const { Title } = Typography;

const { Header, Footer, Sider, Content } = Layout;

const cardStyle = {
  width: '300px',
  // height: 'px',

  // height: 400,
  borderRadius: '16px',
  marginRight: '24px',
  padding: '20px 40px',
  boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
};
function Dashboard() {
  const [numCards, setNumCards] = React.useState(0);

  const cardInfo = {
    word: 'vieron',
    songName: 'Hawai',
    spotifyUri: '4uoR6qeWeuL4Qeu2qJzkuG',
  };

  React.useEffect(() => {
    const flashcardCount = firestore
      .collection('users')
      .doc(auth.currentUser.uid)
      .collection('settings')
      .doc('flashcard-settings')
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setNumCards(doc.data().num_flashcards);
          console.log('number of cards=', doc.data().num_flashcards);
        }
      });
  }, []);

  return (
    <div align='middle'>
      <Row gutter={[16, 48]}>
        <Col>
          <Title level={1}>{'Hello, ' + auth.currentUser.displayName}</Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card hoverable={true} style={cardStyle} align='middle'>
            <Title level={4}>{'You have'}</Title>
            <Title level={1}>
              <b>{numCards}</b>
            </Title>
            <Title level={4}>{'flashcards'}</Title>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default Dashboard;
