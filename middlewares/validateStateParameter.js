const config = require("../config/config");

const validateStateParameter = (req, res, next) => {
    
    const state = req.query.state || null;
    
    const storedState = req.cookies ? req.cookies[config.stateKey] : null;
    
    if (state === null || state !== storedState) {
    
        res.status(400).send({ error: "state_mismatch" });

  } else {
    
    next();

  };
  
};

module.exports = validateStateParameter;
