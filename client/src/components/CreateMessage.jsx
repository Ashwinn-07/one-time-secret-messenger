import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiCopy, FiLock, FiClock } from "react-icons/fi";
import axios from "axios";
import "../styles/CreateMessage.css";

const CreateMessage = () => {
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [hours, setHours] = useState("");
  const [messageId, setMessageId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/messages", {
        content,
        password,
        hours,
      });
      setMessageId(res.data._id);
      setError("");
    } catch (err) {
      setError("Failed to create message");
    }
  };

  return (
    <div className="create-message-container">
      {!messageId ? (
        <form onSubmit={handleSubmit} className="create-message-form">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your secret message..."
            required
            className="create-message-textarea"
          />

          <div className="create-message-options">
            <div className="option-group">
              <FiLock />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (optional)"
              />
            </div>

            <div className="option-group">
              <FiClock />
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Burn after X hours (optional)"
              />
            </div>
          </div>

          <button type="submit" className="create-button">
            Create Secret Link
          </button>

          {error && <p className="create-error">{error}</p>}
        </form>
      ) : (
        <div className="success-container">
          <p>Your secret link:</p>
          <div className="success-link">
            {`${window.location.origin}/message/${messageId}`}
            <CopyToClipboard
              text={`${window.location.origin}/message/${messageId}`}
            >
              <button className="copy-button">
                <FiCopy /> Copy
              </button>
            </CopyToClipboard>
          </div>
          <p className="success-message">
            This message will self-destruct after being read once
            {hours && ` or in ${hours} hours`}.
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateMessage;
