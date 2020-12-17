import React from 'react';
import { auth, firestore } from '../utils/firebase';
import SingleCard from './Card';
import { Typography, Skeleton, Row, Col, Card, Empty } from 'antd';
const { Title } = Typography;

const cardStyle = {
  width: '400px',
  // height: 'px',

  // height: 400,
  borderRadius: '16px',
  marginRight: '24px',
  padding: '20px 40px',
  boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
};

function DeckPage() {
  const [deck, setDeck] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isEmpty, setIsEmpty] = React.useState(false);

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
      setIsLoading(false);
      if (data.length == 0) setIsEmpty(true);
    };

    fetchData();
  }, []);

  const loadingCard = (
    <Card style={cardStyle}>
      <Skeleton loading={true} avatar active>
        Bonjour
      </Skeleton>
    </Card>
  );

  const loadingDeckPlaceholder = (
    <>
      <Row Row type='flex' gutter={[16, 16]}>
        <Col>{loadingCard}</Col>
        <Col>{loadingCard}</Col>
        <Col>{loadingCard}</Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col>{loadingCard}</Col>
        <Col>{loadingCard}</Col>
        <Col>{loadingCard}</Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col>{loadingCard}</Col>
        <Col>{loadingCard}</Col>
        <Col>{loadingCard}</Col>
      </Row>
    </>
  );

  const showPlaceholderDeck = () => {
    setIsLoading(false);
  };
  if (isEmpty) {
    return (
      <>
        <Empty description={<span>Your deck is empty!</span>} />
      </>
    );
  } else {
    return (
      <>
        <div align='middle'>
          {' '}
          <Title level={1}>Your Deck</Title>
        </div>
        <div>
          {isLoading ? (
            loadingDeckPlaceholder
          ) : (
            <Row
              Row
              type='flex'
              justify='left'
              // style={{ minHeight: '100vh' }}
              gutter={[8, 8]}
            >
              {deck.map((card) => (
                <Col>
                  <SingleCard cardObj={card} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </>
    );
  }
}

export default DeckPage;
