const getTokenOptions = (code, refresh_token, redirect_uri) => {

    const base64Auth = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString("base64");
  
    const headers = {
      Authorization: `Basic ${base64Auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };
  
    if (!refresh_token) {
  
        return {
            method: "POST",
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri
            }),
            headers,
        };
  
    } else {
  
        return {
            method: "POST",
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token
            }),
            headers,
        };

    };
  
};

module.exports = getTokenOptions;
