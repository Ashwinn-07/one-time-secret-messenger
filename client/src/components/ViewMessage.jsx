import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ViewMessage.css";

const ViewMessage = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const fetchMessage = async (e) => {
    if (e) {
      e.preventDefault();
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/messages/${id}${password ? `?password=${password}` : ""}`
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid password");
        } else if (response.status === 404) {
          throw new Error("Message not found or already viewed");
        } else {
          throw new Error("Failed to fetch message");
        }
      }

      const data = await response.json();
      setContent(data.content);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setInitialLoadComplete(true);
    }
  };

  React.useEffect(() => {
    fetchMessage();
  }, []);

  // Show loading state during initial fetch
  if (!initialLoadComplete) {
    return (
      <div className="view-message-container">
        <div className="loading-container">
          <span className="loading-spinner"></span>
          <p>Loading message...</p>
        </div>
      </div>
    );
  }

  // Show password form only if we get an Invalid password error
  if (error === "Invalid password") {
    return (
      <div className="view-message-container">
        <h2 className="view-message-title">Protected Message</h2>
        <form onSubmit={fetchMessage} className="password-form">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password to view message"
            className="password-input"
            required
          />

          <button
            type="submit"
            className={`view-button ${isLoading ? "disabled" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Loading...
              </>
            ) : (
              "View Message"
            )}
          </button>

          {error && <div className="view-error">{error}</div>}
        </form>
      </div>
    );
  }

  // Show other errors
  if (error) {
    return (
      <div className="view-message-container">
        <div className="view-error">{error}</div>
      </div>
    );
  }

  // Show the message content
  return (
    <div className="view-message-container">
      <h2 className="view-message-title">Secret Message</h2>
      <div className="message-content">{content}</div>
      <p className="destroyed-message">
        This message has been destroyed and can no longer be accessed.
      </p>
    </div>
  );
};

export default ViewMessage;
