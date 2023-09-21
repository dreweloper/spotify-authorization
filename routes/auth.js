const { Router } = require("express");
const authControllers = require("../controllers/auth");
const { validateStateParameter } = require("../middlewares/index");

// Middleware and routing system
const router = Router();

router.get("/login", authControllers.requestUserAuth);

router.get(
  "/callback",
  [validateStateParameter],
  authControllers.requestAccessToken
);

module.exports = router;
