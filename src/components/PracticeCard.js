import React from 'react';
import { Form, Input, Typography, Layout, Row, Col, Button, Card } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
const cardStyle = {
  width: '400px',
  // height: 'px',

  height: 200,
  borderRadius: '16px',
  marginRight: '24px',
  padding: '20px 40px',
  boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
};

function SingleCard(props) {
  let srcUrl = 'https://open.spotify.com/embed/track/' + props.spotifySongUri;
  console.log('inside SingleCard, spotifySongUri=', props.spotifySongUri);
  return (
    <div>
      <Card title={props.word} align='middle' style={cardStyle}>
        <iframe
          src={srcUrl}
          width='300'
          height='80'
          frameborder='0'
          allowtransparency='true'
          allow='encrypted-media'
        ></iframe>
        {/* <Title level={1}>{props.word}</Title> */}
      </Card>
      <br />
    </div>
  );
}

export default SingleCard;
