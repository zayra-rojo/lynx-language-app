require('dotenv').config();

let config = {
  MUSIXMATCH_API_KEY: process.env.MUSIXMATCH_API_KEY,
  spotify: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REDIRECT_URI: process.env.REDIRECT_URI,
  },

  PORT: process.env.PORT,

  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
};
module.exports = config;
