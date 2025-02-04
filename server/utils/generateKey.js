const crypto = require("crypto");

const key = crypto.randomBytes(32);

const base64Key = key.toString("base64");

console.log("Your encryption key:", base64Key);
