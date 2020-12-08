import React from 'react';
import PracticeCard from './PracticeCard';
import { auth, firestore } from '../utils/firebase';
import { Typography, Layout, Menu, Row, Col, Button, Empty, Card } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;

function PracticePage() {
  const [deck, setDeck] = React.useState([]);
  const [word, setWord] = React.useState();
  const [index, setIndex] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [spotifyUri, setSpotifyUri] = React.useState();
  const [isEmpty, setIsEmpty] = React.useState(false);

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
          console.log('data.length=', data.length);
          if (data.length == 0) setIsEmpty(true);
        })
        .catch((err) => console.log('err', err));
    };

    fetchData();
  }, []);

  const onFlip = (e) => {
    e.preventDefault();
    // set word to be the back of flashcard (english meaning)
    // gets the object that contains the current word
    console.log('Printing all flashcards first... ', deck);
    let result = deck[index];

    word == result.front ? setWord(result.back) : setWord(result.front);
    setSpotifyUri(result.spotifySongUri);
  };

  const onNext = (e) => {
    e.preventDefault();

    if (index + 1 >= deck.length) {
      setWord(deck[0].front);
      setSpotifyUri(deck[0].spotifySongUri);
      setIndex(0);
    } else {
      console.log('previous index: ', index);
      setWord(deck[index + 1].front);
      setSpotifyUri(deck[index + 1].spotifySongUri);
      console.log('in onNext, spotifyuri=', spotifyUri);
      setIndex(index + 1);
      console.log('new index index (may be async): ', index);
    }
  };

  const onBack = (e) => {
    e.preventDefault();
    console.log('in onBack...');

    if (index - 1 < 0) {
      // do nothing
      console.log('cant go back, index=', index);
    } else {
      console.log('going back...');
      setWord(deck[index - 1].front);
      setSpotifyUri(deck[index - 1].spotifySongUri);
      setIndex(index - 1);
    }
  };

  const onStart = (e) => {
    e.preventDefault();
    console.log('in onStart, print deck', deck);
    console.log('deck[0]', deck[0]);
    if (word == null) {
      setWord(deck[0].front);
      setSpotifyUri(deck[0].spotifySongUri);
      console.log('in onStart, spotifyuri=', spotifyUri);
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
    console.log('running getInitial...');
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
