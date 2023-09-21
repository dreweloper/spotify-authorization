const { Router } = require("express");
const authControllers = require("../controllers/auth");
const { handleAuthorizationCallback } = require("../middlewares/index");

// Middleware and routing system
const router = Router();

router.get("/login", authControllers.requestUserAuth);

router.get("/callback", [handleAuthorizationCallback], authControllers.requestAccessToken);

router.get("/refresh-token", authControllers.requestRefreshedAccessToken);

module.exports = router;