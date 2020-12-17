const express = require('express');
var axios = require('axios');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const config = require('./config.js');
const app = express();

app.use(cors);
admin.initializeApp();

exports.initializePracticeFrequencies = functions.auth
  .user()
  .onCreate((user) => {
    console.log('inside initializePracticeFrequency, user=', user);

    // create a flashcard-frequencies collection and set daily frequencies to zero
    let promises = [];
    let mondayFrequency = admin
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('practice-frequency-per-day')
      .doc('monday')
      .set({
        frequency: 0,
      });
    promises.push(mondayFrequency);

    let tuesdayFrequency = admin
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('practice-frequency-per-day')
      .doc('tuesday')
      .set({
        frequency: 0,
      });
    promises.push(tuesdayFrequency);

    let wednesdayFrequency = admin
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('practice-frequency-per-day')
      .doc('wednesday')
      .set({
        frequency: 0,
      });
    promises.push(wednesdayFrequency);

    let thursdayFrequency = admin
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('practice-frequency-per-day')
      .doc('thursday')
      .set({
        frequency: 0,
      });
    promises.push(thursdayFrequency);

    let fridayFrequency = admin
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('practice-frequency-per-day')
      .doc('friday')
      .set({
        frequency: 0,
      });
    promises.push(fridayFrequency);

    let saturdayFrequency = admin
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('practice-frequency-per-day')
      .doc('saturday')
      .set({
        frequency: 0,
      });
    promises.push(saturdayFrequency);

    let sundayFrequency = admin
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('practice-frequency-per-day')
      .doc('sunday')
      .set({
        frequency: 0,
      });
    promises.push(sundayFrequency);

    // Create flashcard settings doc w/
    let flashcardSettingsIntialize = admin
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('settings')
      .doc('flashcard-settings')
      .set({ num_flashcards: 0 });
    promises.push(flashcardSettingsIntialize);

    // Initialize default music preferences
    let musicPreferencesInitalize = admin
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('settings')
      .doc('music-preferences')
      .set({ language_id: 'es', genre_id: '0' });
    promises.push(musicPreferencesInitalize);
    return Promise.all(promises);
  });
exports.scheduledFunction = functions.pubsub
  .schedule('every monday 01:00')
  .onRun((context) => {
    console.log('inside scheduledFunction, this will run every 7 days');

    // Reset frequency of all days to zero
    admin
      .firestore()
      .document('users/{userId}/practice-frequency-per-day/monday')
      .set({ frequency: 0 });
    admin
      .firestore()
      .document('users/{userId}/practice-frequency-per-day/tuesday')
      .set({ frequency: 0 });
    admin
      .firestore()
      .document('users/{userId}/practice-frequency-per-day/wednesday')
      .set({ frequency: 0 });
    admin
      .firestore()
      .document('users/{userId}/practice-frequency-per-day/thursday')
      .set({ frequency: 0 });
    admin
      .firestore()
      .document('users/{userId}/practice-frequency-per-day/friday')
      .set({ frequency: 0 });
    admin
      .firestore()
      .document('users/{userId}/practice-frequency-per-day/saturday')
      .set({ frequency: 0 });
    admin
      .firestore()
      .document('users/{userId}/practice-frequency-per-day/sunday')
      .set({ frequency: 0 });

    return null;
  });

app.post('/addFlashcard', async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const userUid = req.body.uid;

  const musixmatchParams = {
    q_lyrics: req.body.front,
    language_id: req.body.language_id ? req.body.language_id : 'en',
    genre_id: req.body.genre_id ? req.body.genre_id : '',
    song: 'placeholder',
  };
  await getSongFromMusixmatch(musixmatchParams);
  let spotifyUri = await getSpotifyUri(musixmatchParams.song);

  const cardInfo = {
    front: req.body.front,
    back: req.body.back,
    song: musixmatchParams.song,
    // source: req.body.source,
    spotifySongUri: spotifyUri,
  };
  await saveFlashcard(userUid, cardInfo);
  res.status(201).send();
});
exports.webAPI = functions.https.onRequest(app);

/* Helper functions */

async function getSongFromMusixmatch(params) {
  if (params.genre_id != 0)
    params.genre_id = '&f_music_genre_id=' + params.genre_id;
  else params.genre_id = '';

  if (params.language_id == null) params.language_id = 'fr';

  let url = `https://api.musixmatch.com/ws/1.1/track.search?format=json&q_lyrics=${encodeURI(
    params.q_lyrics
  )}${params.genre_id}&f_lyrics_language=${
    params.language_id
  }&s_track_rating=desc&page_size=1&page=1&apikey=${config.MUSIXMATCH_API_KEY}
    `;
  console.log('inside getSongFromMusixmatch, url=', url);
  await axios
    .get(url)
    .then((response) => {
      params.song = response.data.message.body.track_list[0].track.track_name;
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
      // source: cardInfo.source,
      spotifySongUri: cardInfo.spotifySongUri,
    });

  const flashcardSettingsRef = await admin
    .firestore()
    .collection('users')
    .doc(user_uid)
    .collection('settings')
    .doc('flashcard-settings');

  flashcardSettingsRef.update({
    num_flashcards: admin.firestore.FieldValue.increment(1),
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
    return resp.data.access_token;
  } catch (error) {
    console.log('error getting spotify access token: ', error);
  }
}

async function getSpotifyUri(song) {
  let token = await getSpotifyAccessToken();

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
    return spotifyRes.data.tracks.items[0].id;
  } catch (error) {
    console.log('error in get spotify uri: ', error);
  }
}
