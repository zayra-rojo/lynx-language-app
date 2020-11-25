let config = {
  MUSIXMATCH_API_KEY: process.env.REACT_APP_MUSIXMATCH_API_KEY,
  spotify: {
    CLIENT_ID: process.env.REACT_APP_CLIENT_ID,
    CLIENT_SECRET: process.env.REACT_APP_CLIENT_SECRET,
    REDIRECT_URI: process.env.REACT_APP_REDIRECT_URI,
  },

  PORT: process.env.REACT_APP_PORT,

  FIREBASE_API_KEY: process.env.REACT_APP_FIREBASE_API_KEY,
};
module.exports = config;
