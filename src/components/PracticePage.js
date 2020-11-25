import React from 'react';
import PracticeCard from './PracticeCard';
import { auth, firestore } from '../utils/firebase';
import { Typography, Layout, Menu, Row, Col, Button, Card } from 'antd';
const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;

function PracticePage() {
  const [deck, setDeck] = React.useState([]);
  const [word, setWord] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

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
        })
        .catch((err) => console.log('err', err));
    };

    fetchData();
  }, []);

  const onFlip = (e) => {
    //e.preventDefault();
    // set word to be the back of flashcard (english meaning)
    // gets the object that contains the current word
    console.log('Printing all flashcards first... ', deck);
    let result;
    for (var i = 0; i < deck.length; i++) {
      if (deck[i]['front'] === word || deck[i]['back'] === word) {
        result = deck[i];
        break;
      }
    }

    console.log('In onFlip callback... found result flashcard is: ', result);
    word == result.front ? setWord(result.back) : setWord(result.front);
  };

  const onNext = (e) => {
    e.preventDefault();
    console.log('in onNext...');
    // set word to be the next flashcard (front) in the deck array
    // if at end of array, then reset to 1st card
    for (let i = 0; i < deck.length; i++) {
      if (deck[i].front == word || deck[i].back == word) {
        if (i + 1 < deck.length) {
          setWord(deck[i + 1].front);
        } else {
          setWord(deck[0].front);
        }
        break;
      }
    }
  };

  const onStart = (e) => {
    e.preventDefault();
    console.log('in onStart, print deck', deck);
    console.log('deck[0]', deck[0]);
    if (word == null) setWord(deck[0].front);
  };
  return (
    <>
      {isLoading ? null : (
        <div align='middle'>
          <Title level={1}>Your deck!</Title>
          <Row>
            <Col span={8} offset={8}>
              {word == null ? setWord(deck[0].front) : null}
              <PracticeCard word={word} />
              <Button onClick={onFlip} type='primary' htmlType='submit'>
                Flip
              </Button>{' '}
              <Button onClick={onNext} type='primary' htmlType='submit'>
                Next
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default PracticePage;
