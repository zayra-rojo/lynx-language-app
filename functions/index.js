const express = require('express');
var axios = require('axios');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
// const cors = require('cors');
const config = require('./config.js');

// =>  ~ node
// Welcome to Node.js v12.18.0.
// Type ".help" for more information.
// > encodeURI('google.com')
// 'google.com'
// > encodeURI('googlé.com')
// 'googl%C3%A9.com'
// >

const app = express();
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });
app.use(cors);
admin.initializeApp();

// Middleware
// app.use((req, res, next) => {
//   res.append('Access-Control-Allow-Origin', ['*']);
//   res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.append('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });
// app.use(cors({ origin: '*' }));
// encode uri
app.post('/addFlashcard', async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const userUid = req.body.uid;

  const musixmatchParams = {
    front: req.body.front,
    q_lyrics: req.body.front,
    language: req.body.language ? req.body.language : 'fr',
    s_track_rating: 'desc',
    page_size: 3,
    format: 'json',
    song: 'placeholder',
  };

  await getSongFromMusixmatch(musixmatchParams);

  let spotifyUri = await getSpotifyUri(musixmatchParams.song);
  console.log('outside getSpotify(), spotifyUri=', spotifyUri);

  const cardInfo = {
    front: req.body.front,
    back: req.body.back,
    song: musixmatchParams.song,
    source: req.body.source,
    spotifySongUri: spotifyUri,
  };
  await saveFlashcard(userUid, cardInfo);

  res.status(201).send();
});
exports.webAPI = functions.https.onRequest(app);

/* Helper functions */
async function getSongFromMusixmatch(musixmatchParams) {
  //TODO: use params obj and pass to axios
  let url =
    'https://api.musixmatch.com/ws/1.1/track.search?format=json&q_lyrics=' +
    encodeURI(musixmatchParams.q_lyrics) +
    '&f_lyrics_language=fr&s_track_rating=desc&page_size=1&page=1&apikey=' +
    config.MUSIXMATCH_API_KEY;

  console.log(
    'inside musixmatch function, encodedURU(lyrics)=',
    encodeURI(musixmatchParams.q_lyrics)
  );

  console.log('inside musixmatch function, encodedUri=', url);

  await axios
    .get(url)
    .then((response) => {
      musixmatchParams.song =
        response.data.message.body.track_list[0].track.track_name;
      console.log('SONG TITLE IS: ', musixmatchParams.song);
    })
    .catch((error) => console.log('error in axios.get, ', error));
}

async function saveFlashcard(user_uid, cardInfo) {
  await admin
    .firestore()
    .collection('users')
    .doc(user_uid)
    .collection('flashcards')
    .add({
      front: cardInfo.front,
      back: cardInfo.back,
      song: cardInfo.song,
      source: cardInfo.source,
      spotifySongUri: cardInfo.spotifySongUri,
    });
}

async function getSpotifyAccessToken() {
  try {
    const resp = await axios({
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      params: {
        grant_type: 'client_credentials',
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: config.spotify.CLIENT_ID,
        password: config.spotify.CLIENT_SECRET,
      },
    });

    // checking
    console.log(
      'inside getSpotifyAccessToken() response.data.access_token: ',
      resp.data.access_token
    );
    return resp.data.access_token;
  } catch (error) {
    console.log('error getting spotify access token: ', error);
  }
}

async function getSpotifyUri(song) {
  let token = await getSpotifyAccessToken();
  console.log('outside... token= ', token);

  try {
    const spotifyRes = await axios({
      url:
        'https://api.spotify.com/v1/search?q=' +
        encodeURI(song) +
        '&type=track&limit=1',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log(
      'inside getSpotifyUri, sUri.data.tracks.items[0].uri: ',
      spotifyRes.data.tracks.items[0].uri
    );
    return spotifyRes.data.tracks.items[0].uri;

    //return sUri;
  } catch (error) {
    console.log('error in get spotify uri: ', error);
  }
}

// https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_lyrics=bonjour&f_music_genre_id=14&f_lyrics_language=fr&s_track_rating=desc&page_size=5&page=1&apikey=ee5932e58d6a546d292e753097d44d47
