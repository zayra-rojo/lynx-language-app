import React from 'react';
// import './layout.css';
import { Divider, Typography, Row, Col, Skeleton, Card } from 'antd';
const { Title } = Typography;
var Spinner = require('react-spinkit');

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
  const [isLoading, setIsLoading] = React.useState(true);

  let srcUrl =
    'https://open.spotify.com/embed/track/' + props.cardObj.spotifySongUri;
  console.log(
    'inside SingleCard, spotifySongUri=',
    props.cardObj.spotifySongUri
  );

  const hideSpinner = () => {
    setIsLoading(false);
    console.log('hidespinner');
  };
  return (
    <div>
      <Card hoverable={true} style={cardStyle} align='middle'>
        <Divider>
          <Title level={2}>{props.cardObj.front}</Title>
        </Divider>

        <Title level={3}>{props.cardObj.back}</Title>
        {/* <Title level={3}>{props.cardObj.song}</Title> */}
        {isLoading ? (
          <Spinner name='line-scale-pulse-out-rapid' color='purple' />
        ) : null}
        <div>
          <iframe
            src={srcUrl}
            style={
              isLoading ? { visibility: 'hidden' } : { visibility: 'visible' }
            }
            width='300'
            height='80'
            onLoad={hideSpinner}
            frameborder='0'
            allowtransparency='true'
            allow='encrypted-media'
          ></iframe>
        </div>
      </Card>
      <br />
    </div>
  );
}

export default SingleCard;
