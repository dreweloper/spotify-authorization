const querystring = require("querystring");
const requestToken = require("../helpers/requestToken");

const requestUserAuth = (req, res) => {

    const { redirect_uri, scope, state  } = req.query;

    const queryString = querystring.stringify({
        response_type: "code",
        client_id: process.env.CLIENT_ID,
        scope,
        redirect_uri,
        state,
        show_dialog: true,
    });

    // App requests authorization
    res.redirect(`https://accounts.spotify.com/authorize?${queryString}`);

};

const requestAccessToken = async (req, res) => {
    
    const { code, redirect_uri } = req.query;

    try {

        const response = await requestToken(code, null, redirect_uri);

        if (response.ok) {
            
            res.status(200).send(response.data);
        
        } else {
            
            res.status(400).send(response.error);
        
        };
    
    } catch (error) {
        
        console.error(error);

        res.status(500).send(error);

    };

};

const requestRefreshedAccessToken = async (req, res) => {
    
    const { refresh_token } = req.query;

    try {
        
        const response = await requestToken(null, refresh_token, null);

        if (response.ok) {
            
            res.status(200).send(response.data);
        
        } else {
            
            res.status(400).send(response.error);
        
        };
    
    } catch (error) {
        
        console.error(error);

        res.status(500).send(error);
    
    };

};

module.exports = {
    requestUserAuth,
    requestAccessToken,
    requestRefreshedAccessToken,
};