import React from 'react';
import { auth, firestore } from '../utils/firebase';
import { Dropdown, Typography, Menu, Row, Col, Button, Card } from 'antd';
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
const langCodes = {
  fr: 'French',
  it: 'Italian',
  es: 'Spanish',
  de: 'German',
};
const genreCodes = {
  0: 'Any genre',
  7: 'Hip hop',
  14: 'Pop',
  18: 'Rap',
  19: 'World',
  20: 'Alternative',
  21: 'Rock',
};
function SettingsPage() {
  const [language, setLanguage] = React.useState();
  const [genre, setGenre] = React.useState();

  const handleLanguageMenuClick = (e) => {
    setLanguage(e.key);

    const uid = auth.currentUser.uid;
    firestore
      .collection('users')
      .doc(uid)
      .collection('settings')
      .doc('music-preferences')
      .set(
        {
          language_id: e.key,
        },
        { merge: true }
      );
  };

  const handleGenreMenuClick = (e) => {
    setGenre(e.key);

    const uid = auth.currentUser.uid;
    firestore
      .collection('users')
      .doc(uid)
      .collection('settings')
      .doc('music-preferences')
      .set(
        {
          genre_id: e.key,
        },
        { merge: true }
      );
  };
  const languageDropdownMenu = (
    <Menu onClick={handleLanguageMenuClick}>
      <Menu.Item key='it'>Italian</Menu.Item>
      <Menu.Item key='de'>German</Menu.Item>
      <Menu.Item key='fr'>French</Menu.Item>
      <Menu.Item key='es'>Spanish</Menu.Item>
    </Menu>
  );
  const genreDropdownMenu = (
    <Menu onClick={handleGenreMenuClick}>
      <Menu.Item key='0'>Any genre</Menu.Item>
      <Menu.Item key='7'>Hip hop</Menu.Item>
      <Menu.Item key='14'>Pop</Menu.Item>
      <Menu.Item key='18'>Rap</Menu.Item>
      <Menu.Item key='19'>World</Menu.Item>
      <Menu.Item key='20'>Alternative</Menu.Item>
      <Menu.Item key='21'>Rock</Menu.Item>
    </Menu>
  );
  const overlayStyle = {
    width: '400px',
    marginRight: '24px',
    boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const uid = auth.currentUser.uid;
      firestore
        .collection('users')
        .doc(uid)
        .collection('settings')
        .doc('music-preferences')
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log('document data: ', doc.data());

            setLanguage(doc.data().language_id);
            setGenre(doc.data().genre_id);
            console.log(
              'in settings page, inside userEffect, printing settings: ',
              language
            );
          } else {
            console.log(console.log('no such document!'));
          }
        });
    };

    fetchData();
  }, []);

  return (
    <div align='middle'>
      <Title>Settings</Title>
      <Title level={3}>Edit your music recommendation options </Title>

      <Row gutter={[16, 48]}>
        <Col>
          <Title level={3}>Choose a language: </Title>
        </Col>
        <Col>
          {' '}
          <Dropdown
            overlayStyle={overlayStyle}
            overlay={languageDropdownMenu}
            placement='bottomLeft'
            arrow
          >
            <Button>
              <Title level={4}>{langCodes[language]}</Title>
            </Button>
          </Dropdown>
        </Col>
      </Row>
      <Row gutter={[16, 48]}>
        <Col>
          <Title level={3}>Choose a genre: </Title>
        </Col>
        <Col>
          <Dropdown
            overlayStyle={overlayStyle}
            overlay={genreDropdownMenu}
            placement='bottomLeft'
            arrow
          >
            <Button>
              <Title level={4}>{genreCodes[genre]}</Title>
            </Button>
          </Dropdown>
        </Col>
      </Row>
      <Row gutter={[16, 48]}>
        <Col>
          <Button onClick={() => auth.signOut()} type='primary' danger>
            Signout
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default SettingsPage;
