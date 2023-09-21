const config = require("../config/config");

const handleAuthorizationCallback = (req, res, next) => {

  const storedState = req.cookies ? req.cookies[config.stateKey] : null;

  if (!req.query.state || req.query.state !== storedState) {
    
    res.redirect("/?error=state_mismatch");
  
  } else if (req.query.error) {

    res.redirect("/?error=access_denied");

  } else {

    next();

  };

};

module.exports = handleAuthorizationCallback;