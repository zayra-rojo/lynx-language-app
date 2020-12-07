import React from 'react';
import axios from 'axios';
import { auth, firestore } from '../utils/firebase';
import {
  Divider,
  Form,
  Input,
  Typography,
  Layout,
  Row,
  Col,
  Button,
  Card,
} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
};
const cardStyle = {
  width: '430px',
  // height: 'px',

  borderRadius: '16px',
  marginRight: '20px',
  padding: '10px 20px',
  boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
};
function CreatePage() {
  const [front, setFront] = React.useState(null);
  const [back, setBack] = React.useState(null);
  // const [source, setSource] = React.useState(null);

  const getUserSettings = async () => {
    const uid = auth.currentUser.uid;
    let ans;
    await firestore
      .collection('users')
      .doc(uid)
      .collection('settings')
      .doc('music-preferences')
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log('inside CreatePage.js, document data: ', doc.data());
          ans = doc.data();
        } else {
          console.log(console.log('no such document!'));
        }
      });

    return ans;
  };

  const onSubmit = async () => {
    // If logged in user doesn't have its own document (containing uid and subcollection containing all flashcards)
    // then create it.
    const uid = auth.currentUser.uid;
    const userSettings = await getUserSettings();
    console.log('in onSubmit, userSettings=', userSettings);

    const data = {
      front: front,
      back: back,
      song: '',
      // source: source,
      uid: uid,
      language_id: userSettings.language_id,
      genre_id: userSettings.genre_id,
    };
    console.log('onSubmit...');
    setBack('');
    setFront('');
    console.log(data);
    const saving = await axios.post(
      'https://us-central1-language-learning-app-300.cloudfunctions.net/webAPI/addFlashcard',
      data
    );
  };

  return (
    <div>
      <Row justify='center' style={{ minHeight: '15vh' }}>
        <Title level={1}>Create</Title>
      </Row>
      <Row
        Row
        type='flex'
        justify='center'
        // align='middle'
      >
        <Col>
          <Card style={cardStyle}>
            <Divider>
              <Title level={2}>Create a flashcard</Title>
            </Divider>

            <div>
              <Form
                {...layout}
                name='nest-messages'
                // onFinish={onSubmit}
                validateMessages={validateMessages}
              >
                <Row justify='center'>
                  <Col flex={1}>
                    <Title level={3}>Front:{''} </Title>
                  </Col>
                  <Col flex={10}>
                    <Form.Item rules={[{ required: true }]}>
                      <Input
                        allowClear='true'
                        size='medium'
                        autoSize='true'
                        value={front}
                        onChange={(e) => {
                          setFront(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify='center'>
                  <Col flex={1}>
                    <Title level={3}>Back: </Title>
                  </Col>
                  <Col flex={10}>
                    <Form.Item rules={[{ required: true }]}>
                      <Input
                        size='medium'
                        value={back}
                        onChange={(e) => {
                          setBack(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button
                  onClick={onSubmit}
                  type='primary'
                  shape='round'
                  size='large'
                  htmlType='submit'
                >
                  Save
                </Button>
              </Form.Item>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CreatePage;
