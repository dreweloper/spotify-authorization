const { Router } = require("express");
const {
    requestUserAuth,
    requestAccessToken,
    requestRefreshedAccessToken
} = require("../controllers/auth");

// Middleware and routing system
const router = Router();

router.get("/login", requestUserAuth);

router.get("/access-token", requestAccessToken);

router.get("/refresh-token", requestRefreshedAccessToken);

module.exports = router;