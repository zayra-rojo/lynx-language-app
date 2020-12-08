import React from 'react';
import { auth } from '../utils/firebase';
import { Layout, Typography, Row, Col, Button, Card } from 'antd';
import CardWithSong from './CardWithSong';
const { Title } = Typography;

const { Header, Footer, Sider, Content } = Layout;

const cardStyle = {
  width: '400px',
  // height: 'px',

  // height: 400,
  borderRadius: '16px',
  marginRight: '24px',
  padding: '20px 40px',
  boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
};
function Dashboard() {
  const cardInfo = {
    word: 'vieron',
    songName: 'Hawai',
    spotifyUri: '4uoR6qeWeuL4Qeu2qJzkuG',
  };
  return (
    <div align='middle'>
      <Row gutter={[16, 48]}>
        <Col>
          <Title level={1}>{'Hello, ' + auth.currentUser.displayName}</Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card hoverable={true} style={cardStyle} align='middle'></Card>
        </Col>
      </Row>
    </div>
  );
}
export default Dashboard;
