import React from 'react';
import { Divider, Typography, Layout, Card } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
const cardStyle = {
  width: '430px',
  // height: 'px',

  height: '300px',
  borderRadius: '16px',
  // marginRight: '24px',
  padding: '20px 40px',
  boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
};

function SingleCard(props) {
  let srcUrl = 'https://open.spotify.com/embed/track/' + props.spotifySongUri;
  console.log('inside SingleCard, spotifySongUri=', props.spotifySongUri);
  return (
    <div>
      <Card align='middle' style={cardStyle}>
        <Divider>
          <Title>{props.word}</Title>
        </Divider>

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
