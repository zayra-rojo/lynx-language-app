import React from 'react';
import { auth, firestore } from '../utils/firebase';
import SingleCard from './Card';
import { Form, Input, Typography, Layout, Row, Col, Button, Card } from 'antd';
const { Title } = Typography;

function DeckPage() {
  const [deck, setDeck] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const uid = auth.currentUser.uid;
      // get all flashcards of logged in user, which are in the 'flashcards' subcollection
      const data = await firestore
        .collection('users')
        .doc(uid)
        .collection('flashcards')
        .get();

      setDeck(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchData();
  }, []);

  return (
    <>
      <div align='middle'>
        {' '}
        <Title level={1}>Your deck!</Title>
      </div>
      <>
        <Row gutter={[16, 16]}>
          {deck.map((card) => (
            <Col xs={{ span: 5, offset: 1 }}>
              <SingleCard cardObj={card} />
            </Col>
          ))}
        </Row>
      </>{' '}
    </>
  );
}

export default DeckPage;
