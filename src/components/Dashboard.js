import React from 'react';
import { auth, firestore } from '../utils/firebase';
import { Layout, Typography, Row, Col, Button, Card } from 'antd';
import PracticeFrequencyGraph from './PracticeFrequencyGraph';
const { Title } = Typography;

const { Header, Footer, Sider, Content } = Layout;

const cardStyle = {
  width: '300px',
  height: '370px',
  borderRadius: '16px',
  marginRight: '24px',
  padding: '20px 40px',
  boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
};

const cardGraphStyle = {
  width: '800px',
  height: '370px',
  borderRadius: '16px',
  marginRight: '24px',
  padding: '20px 40px',
  boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
};
function Dashboard() {
  const [numCards, setNumCards] = React.useState(0);
  const [loading, setIsLoading] = React.useState(true);
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
          setIsLoading(false);
        }
      });
  }, []);

  return (
    <div align='middle'>
      <Row gutter={[16, 48]}>
        <Col>
          <div class='dashboard-greeting'>
            {'Hello, ' + auth.currentUser.displayName}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card hoverable={true} style={cardStyle} align='middle'>
            <Title level={2}>{'You have'}</Title>

            <div class='flashcard-count'>
              <b>{loading ? null : numCards}</b>
            </div>

            <Title level={2}>{'flashcards'}</Title>
          </Card>
        </Col>
        <Col>
          <Card hoverable={false} style={cardGraphStyle} align='middle'>
            <PracticeFrequencyGraph />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default Dashboard;
