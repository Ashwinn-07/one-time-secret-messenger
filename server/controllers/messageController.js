const Message = require("../models/messageModel.js");
const bcrypt = require("bcryptjs");

const createMessage = async (req, res) => {
  const { content, password, hours } = req.body;
  try {
    const message = new Message({
      content,
      expiresAt: hours ? new Date(Date.now() + hours * 60 * 60 * 1000) : null,
    });
    if (password) {
      const salt = await bcrypt.genSalt(10);
      message.password = await bcrypt.hash(password, salt);
    }

    await message.save();
    res.json({ _id: message._id });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

const getMessage = async (req, res) => {
  try {
    const message = await Message.findOne({
      _id: req.params.id,
      isRead: false,
    });
    if (!message)
      return res.status(404).json("Message not found or already used");
    if (message.password) {
      const isValid = await bcrypt.compare(
        req.query.password || "",
        message.password
      );
      if (!isValid) return res.status(401).json("Invalid Password");
    }

    const content = message.content;

    await message.deleteOne();

    res.json({ content });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

module.exports = { createMessage, getMessage };
