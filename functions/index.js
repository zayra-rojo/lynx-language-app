const express = require('express');
var axios = require('axios');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const config = require('./config.js');

const app = express();
admin.initializeApp();

// Middleware
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/addFlashcard', async (req, res) => {
  const data = req.body;
  //const uid = auth.currentUser.uid;
  const uid = req.body.uid;

  // get song from Musixmatch api
  let word = data.front;
  let lyric;
  let page_size = 3;
  let s_track_rating = 'desc';
  let language = 'fr';

  //TODO: use params obj and pass to axios
  let url =
    'https://api.musixmatch.com/ws/1.1/track.search?format=json&q_lyrics=' +
    word +
    '&f_lyrics_language=fr&s_track_rating=desc&page_size=1&page=1&apikey=' +
    config.MUSIXMATCH_API_KEY;
  // language (or no language), or require users to set language, or figure it out in background
  var song = 'placeholder';

  await axios
    .get(url)
    .then((response) => {
      console.log(response.data.message.body.track_list[0].track);
      song = response.data.message.body.track_list[0].track.track_name;
      console.log('SONG TITLE IS: ', song);
    })
    .catch((error) => console.log('error in axios.get, ', error));

  //TODO: spotify uri of song

  // Save flashcard
  await admin
    .firestore()
    .collection('users')
    .doc(uid)
    .collection('flashcards')
    .add({
      front: data.front,
      back: data.back,
      song: song,
      source: data.source,
    });
  console.log(song);

  res.status(201).send();
});
// sets up an endpoint
exports.webAPI = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_lyrics=bonjour&f_music_genre_id=14&f_lyrics_language=fr&s_track_rating=desc&page_size=5&page=1&apikey=ee5932e58d6a546d292e753097d44d47
