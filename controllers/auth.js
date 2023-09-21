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
        
        res.clearCookie(config.stateKey);

        const response = await requestToken(code, null);

        if (response.ok) {
            
            const { access_token, refresh_token } = response.data;

            res.redirect(303, "/?" + querystring.stringify({ access_token, refresh_token }));
        
        } else {
            
            const { error, error_description } = response.error;

            res.redirect(303, "/?" + querystring.stringify({ error, error_description }));
        
        };
    
    } catch (error) {
        
        console.error(error);

        res.redirect(303, "/?error=internal_server_error");

    };

};

const requestRefreshedAccessToken = async (req, res) => {
    
    const refreshToken = req.query.refresh_token;

    try {
        
        const response = await requestToken(null, refreshToken);

        if (response.ok) {
            
            const { access_token } = response.data;

            res.redirect(303, "/?" + querystring.stringify({ access_token }));
        
        } else {
            
            const { error, error_description } = response.error;

            res.redirect(303, "/?" + querystring.stringify({ error, error_description }));
        
        };
    
    } catch (error) {
        
        console.error(error);

        res.redirect(303, "/?error=internal_server_error");
    
    };

};

module.exports = {
    requestUserAuth,
    requestAccessToken,
    requestRefreshedAccessToken,
};