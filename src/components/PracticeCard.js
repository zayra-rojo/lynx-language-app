import React from 'react';
import { Divider, Typography, Card } from 'antd';
const { Title } = Typography;
var Spinner = require('react-spinkit');

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
  const [isLoading, setIsLoading] = React.useState(true);

  const hideSpinner = () => {
    setIsLoading(false);
  };

  let srcUrl = 'https://open.spotify.com/embed/track/' + props.spotifySongUri;

  return (
    <div>
      <Card align='middle' style={cardStyle}>
        <Divider>
          <Title>{props.word}</Title>
        </Divider>
        {isLoading ? (
          <Spinner name='line-scale-pulse-out-rapid' color='purple' />
        ) : null}
        <iframe
          src={srcUrl}
          style={
            isLoading ? { visibility: 'hidden' } : { visibility: 'visible' }
          }
          onLoad={hideSpinner}
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
