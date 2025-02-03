import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Key, AlertCircle, Atom } from "lucide-react";

const ViewMessage = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [showDestroyAnimation, setShowDestroyAnimation] = useState(false);
  const [messageViewed, setMessageViewed] = useState(false);
  const [countdown, setCountdown] = useState(10);

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
          throw new Error("Message has already collapsed into the void");
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

  useEffect(() => {
    fetchMessage();
  }, []);

  useEffect(() => {
    let intervalId;
    let timeoutId;

    if (messageViewed) {
      intervalId = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            timeoutId = setTimeout(() => {
              setShowDestroyAnimation(true);
            }, 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [messageViewed]);

  if (!initialLoadComplete) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-pulse-slow" />
            <div className="absolute inset-2 bg-gray-900 rounded-full" />
            <div className="absolute inset-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-spin-slow" />
          </div>
          <p className="text-gray-400">Scanning quantum coordinates...</p>
        </div>
      </div>
    );
  }

  if (error === "Invalid password") {
    return (
      <div className="min-h-screen hero-gradient py-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="glass-card p-8">
            <div className="flex items-center justify-center mb-8">
              <Key className="w-8 h-8 text-purple-400 mr-3" />
              <h2 className="text-2xl font-bold gradient-text">
                Protected Message
              </h2>
            </div>

            <form onSubmit={fetchMessage} className="space-y-6">
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter quantum key"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-3" />
                    Decrypting...
                  </div>
                ) : (
                  "Access Message"
                )}
              </button>

              {error && (
                <div className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-4 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center px-4">
        <div className="max-w-md w-full glass-card p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto relative">
              <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse" />
              <div className="absolute inset-2 bg-gray-900 rounded-full flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-red-400" />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-red-400 mb-4">{error}</h2>
          <p className="text-gray-400">
            This message has been consumed by the void.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {!showDestroyAnimation ? (
          <div
            className="glass-card p-8"
            onClick={() => !messageViewed && setMessageViewed(true)}
          >
            <div className="flex items-center justify-center mb-8">
              <Atom className="w-8 h-8 text-purple-400 mr-3 animate-spin-slow" />
              <h2 className="text-2xl font-bold gradient-text">
                Quantum Message
              </h2>
            </div>

            <div className="bg-black/20 border border-white/10 rounded-xl p-6 mb-6">
              <p className="text-white whitespace-pre-wrap">{content}</p>
            </div>

            {!messageViewed && (
              <p className="text-center text-gray-400">
                Click to mark message as viewed
              </p>
            )}

            {messageViewed && (
              <div className="text-center">
                <p className="text-gray-400">
                  Message will collapse in {countdown} seconds
                </p>
                <div className="w-full bg-gray-700 h-1 mt-2 relative">
                  <div
                    className="absolute left-0 top-0 h-1 bg-purple-500"
                    style={{ width: `${(countdown / 10) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/90 transition-opacity duration-1000">
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-64 h-64 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 animate-pulse-slow blur-2xl opacity-20" />
              </div>
              <div className="w-32 h-32 rounded-full bg-black border-4 border-purple-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 animate-spin-slow opacity-50" />
                <div className="absolute inset-2 bg-black rounded-full" />
              </div>
              <p className="absolute top-full left-1/2 -translate-x-1/2 mt-8 text-gray-400 text-center">
                Message has collapsed into the singularity
                <br />
                <span className="text-sm opacity-75">
                  No trace remains in our universe
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMessage;
