const mongoose = require("mongoose");
const shortid = require("shortid");

const MessageSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  content: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  password: String,
  expiresAt: Date,
});

MessageSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Message", MessageSchema);
