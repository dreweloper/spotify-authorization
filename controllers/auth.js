const querystring = require("querystring");
const requestToken = require("../helpers/requestToken");
const config = require("../config/config");
const generateRandomString = require("../helpers/generateRandomString");

const requestUserAuth = (req, res) => {
  const state = generateRandomString(16);
  res.cookie(config.stateKey, state);

  // App requests authorization
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.CLIENT_ID,
        scope: config.scope,
        redirect_uri: config.redirect_uri,
        state,
        show_dialog: false,
      })
  );
};

const requestAccessToken = async (req, res) => {

    const code = req.query.code || null;

  try {

    res.clearCookie(config.stateKey);

    const response = await requestToken(code);

    if (response.ok) {

      res.status(response.status).send(response.data);

    } else {

      res.status(response.status).send(response.error);

    };

  } catch (error) {

    console.error(error);

    res.status(500).send(error);
  }
};

module.exports = { requestUserAuth, requestAccessToken };
