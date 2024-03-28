const { Router } = require("express");
const authenticate = require('../middleware/authenticate');
const { createChat, renameGroup, addUserToGroup, removeUserFromGroup, getAllChat} = require("../controllers/chat.controller");

const router = Router();

// "/chats"
router.post("/", authenticate, createChat);

// "/chats"
router.get("/", authenticate, getAllChat);

// "/chats/rename"
router.put("/rename", authenticate, renameGroup);

// "/chats/add/user"
router.put("/add/user", authenticate, addUserToGroup);

// "/chats/"
router.put("/remove/user", authenticate, removeUserFromGroup);


module.exports = router;