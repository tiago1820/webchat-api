const { Router } = require("express");
const authenticate = require('../middleware/authenticate');
const { getAllMessage, createMessage } = require("../controllers/message.controller");

const router = Router();

// "/messages/chatId"
router.get("/:chatId", authenticate, getAllMessage);

// "/messages"
router.post("/", authenticate, createMessage);

module.exports = router;