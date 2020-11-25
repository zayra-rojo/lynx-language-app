import React from 'react';
import { Form, Input, Typography, Layout, Row, Col, Button, Card } from 'antd';
import { OmitProps } from 'antd/lib/transfer/ListBody';
const { Title } = Typography;

const cardStyle = {
  width: '350px',
  // height: 'px',

  // height: 400,
  borderRadius: '16px',
  marginRight: '24px',
  padding: '10px 10px',
  boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
};

function CardWithSong(props) {
  let srcUrl =
    'https://open.spotify.com/embed/track/' + props.cardInfo.spotifyUri;
  return (
    <div>
      <Card style={cardStyle} align='middle'>
        <Title level={2}>{props.cardInfo.word}</Title>
        <Title level={2}>{props.cardInfo.songName}</Title>
        <iframe
          src={srcUrl}
          width='300'
          height='80'
          frameborder='0'
          allowtransparency='true'
          allow='encrypted-media'
        ></iframe>
      </Card>
      <br />
    </div>
  );
}

export default CardWithSong;
