const querystring = require("querystring");
const requestToken = require("../helpers/requestToken");
const config = require("../config/config");
const generateRandomString = require("../helpers/generateRandomString");

const requestUserAuth = (req, res) => {
    
    const state = generateRandomString(16);

    res.cookie(config.stateKey, state);

    // App requests authorization
    res.redirect("https://accounts.spotify.com/authorize?" + querystring.stringify({
            response_type: "code",
            client_id: process.env.CLIENT_ID,
            scope: config.scope,
            redirect_uri: config.redirect_uri,
            state,
            show_dialog: true,
        })
    );
};

const requestAccessToken = async (req, res) => {
    
    const code = req.query.code;

    try {

        const response = await requestToken(code, null);

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
    
    const refreshToken = req.query.refresh_token;

    try {
        
        const response = await requestToken(null, refreshToken);

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