const fetch = require("node-fetch");
const config = require("../config/config");

const getTokenOptions = (code, refreshToken = undefined) => {

  const base64Auth = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString("base64");

  const headers = {
    Authorization: `Basic ${base64Auth}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  if (!refreshToken) {

    return {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: config.redirect_uri,
      }),
      headers,
    };

  } else {

    return {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      headers,
    };

  };

};

const requestToken = async (code, refreshToken) => {

  const url = "https://accounts.spotify.com/api/token";

  const options = getTokenOptions(code, refreshToken);

  try {

    const response = await fetch(url, options);

    if (!response.ok) {

      throw new Error("The request could not be completed successfully");

    } else {

      const data = await response.json();

      return {
        ok: true,
        status: response.status,
        data
      };

    };

  } catch (error) {

    console.error("Fetch error:", error.message);

    return {
      ok: false,
      status: response.status,
      error
    };

  };
  
};

module.exports = requestToken;
