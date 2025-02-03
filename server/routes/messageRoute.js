const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMessage,
} = require("../controllers/messageController.js");

router.post("/", createMessage);
router.get("/:id", getMessage);

module.exports = router;
