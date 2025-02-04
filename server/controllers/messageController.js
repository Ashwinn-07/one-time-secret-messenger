const Message = require("../models/messageModel.js");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, "base64");
const PADDED_KEY = Buffer.concat([ENCRYPTION_KEY], 32);
const IV_LENGTH = 16;

function encrypt(text) {
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv("aes-256-cbc", PADDED_KEY, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return `${iv.toString("hex")}:${encrypted}`;
  } catch (error) {
    throw new Error("Encryption failed");
  }
}

function decrypt(text) {
  try {
    const [ivHex, encryptedText] = text.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", PADDED_KEY, iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    throw new Error("Decryption failed");
  }
}

const createMessage = async (req, res) => {
  const { content, password, hours } = req.body;
  try {
    const encryptedContent = encrypt(content);
    const message = new Message({
      content: encryptedContent,
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

    const decryptedContent = decrypt(message.content);

    await message.deleteOne();

    res.json({ content: decryptedContent });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

module.exports = { createMessage, getMessage };
