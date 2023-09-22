const { Router } = require("express");
const authControllers = require("../controllers/auth");

// Middleware and routing system
const router = Router();

router.get("/login", authControllers.requestUserAuth);

router.get("/access-token", authControllers.requestAccessToken);

router.get("/refresh-token", authControllers.requestRefreshedAccessToken);

module.exports = router;