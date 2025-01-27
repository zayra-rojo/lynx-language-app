import React from 'react';
import PracticeCard from './PracticeCard';
import { auth, firestore } from '../utils/firebase';
import firebase from 'firebase/app';
import { Typography, Row, Col, Button, Empty } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
const { Title } = Typography;

const DAYS = {
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
  7: 'sunday',
};

function PracticePage() {
  const [deck, setDeck] = React.useState([]);
  const [word, setWord] = React.useState();
  const [index, setIndex] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [spotifyUri, setSpotifyUri] = React.useState();
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [isFlipped, setIsFlipped] = React.useState(false);

  React.useEffect(() => {
    const uid = auth.currentUser.uid;

    const fetchData = () => {
      firestore
        .collection('users')
        .doc(uid)
        .collection('flashcards')
        .get()
        .then((snapshot) => {
          let data = [];
          snapshot.forEach((doc) => {
            data.push({
              uid: doc.id,
              ...doc.data(),
            });
          });
          setDeck(data);
          setIsLoading(false);
          if (data.length == 0) setIsEmpty(true);
        })
        .catch((err) => console.log('err', err));
    };

    fetchData();
  }, []);

  const incrementNumCardsPracticed = () => {
    let d = new Date();
    var n = d.getDay();

    const uid = auth.currentUser.uid;
    const statsRef = firestore
      .collection('users')
      .doc(uid)
      .collection('practice-frequency-per-day')
      .doc(DAYS[n]);

    statsRef.update({
      frequency: firebase.firestore.FieldValue.increment(1),
    });
  };

  const onFlip = (e) => {
    e.preventDefault();

    let result = deck[index];
    word == result.front ? setWord(result.back) : setWord(result.front);
    setSpotifyUri(result.spotifySongUri);
    if (!isFlipped) incrementNumCardsPracticed();
    setIsFlipped(true);
  };

  const onNext = (e) => {
    e.preventDefault();

    if (index + 1 >= deck.length) {
      setWord(deck[0].front);
      setSpotifyUri(deck[0].spotifySongUri);
      setIndex(0);
    } else {
      setWord(deck[index + 1].front);
      setSpotifyUri(deck[index + 1].spotifySongUri);
      setIndex(index + 1);
    }
    setIsFlipped(false);
  };

  const onBack = (e) => {
    e.preventDefault();

    if (index - 1 < 0) {
      // do nothing
    } else {
      setWord(deck[index - 1].front);
      setSpotifyUri(deck[index - 1].spotifySongUri);
      setIndex(index - 1);
    }
    setIsFlipped(false);
  };

  const onStart = (e) => {
    e.preventDefault();

    if (word == null) {
      setWord(deck[0].front);
      setSpotifyUri(deck[0].spotifySongUri);
    }
    setIndex(0);
  };

  const setInitial = () => {
    if (word == null && deck.length != 0) {
      setIsEmpty(false);
      setWord(deck[0].front);
      setSpotifyUri(deck[0].spotifySongUri);
    } else if (deck.length != 0) {
      setWord(null);
      setSpotifyUri(null);
    } else {
    }
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
        {' '}
        {isLoading ? null : (
          <div align='middle'>
            <Title level={1}>Practice</Title>
            <Row justify='center' align='middle' gutter={[16, 16]}>
              <Col>
                <Title level={2}>
                  <b>{index + 1 + ' / ' + deck.length}</b>
                </Title>
              </Col>
            </Row>
            <Row justify='center' align='middle' gutter={[16, 16]}>
              <Col>
                <Button
                  type='primary'
                  shape='circle'
                  size='large'
                  htmlType='submit'
                  onClick={onBack}
                  icon={<LeftOutlined />}
                ></Button>
              </Col>

              <Col>
                {word == null ? setInitial() : null}
                <PracticeCard word={word} spotifySongUri={spotifyUri} />
                <Button onClick={onFlip} type='primary' htmlType='submit'>
                  Flip
                </Button>{' '}
              </Col>
              <Col>
                <Button
                  type='primary'
                  shape='circle'
                  size='large'
                  htmlType='submit'
                  onClick={onNext}
                  icon={<RightOutlined />}
                ></Button>
              </Col>
            </Row>
          </div>
        )}
      </>
    );
  }
}

export default PracticePage;
