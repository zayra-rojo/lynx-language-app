import React from 'react';
import { Form, Input, Typography, Layout, Row, Col, Button, Card } from 'antd';
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

function SingleCard(props) {
  return (
    <div>
      <Card hoverable={true} style={cardStyle} align='middle'>
        <Title level={2}>{props.cardObj.front}</Title>
        <Title level={3}>{props.cardObj.back}</Title>
        <Title level={3}>{props.cardObj.song}</Title>
      </Card>
      <br />
    </div>
  );
}

export default SingleCard;
