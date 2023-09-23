const fetch = require("node-fetch");
const getTokenOptions = require('./getTokenOptions');

const requestToken = async (code, refresh_token, redirect_uri) => {

  const options = getTokenOptions(code, refresh_token, redirect_uri);

  try {

    const response = await fetch("https://accounts.spotify.com/api/token", options);

    if (!response.ok) {

      throw await response.json();

    } else {

      const data = await response.json();

      return { ok: true, data };

    };

  } catch (error) {

    console.error("Fetch error:", error);

    return { ok: false, error };

  };
  
};

module.exports = requestToken;
