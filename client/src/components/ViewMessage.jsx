import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Key, Atom, AlertCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewMessage = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [isMessageCollapsed, setIsMessageCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDestroyAnimation, setShowDestroyAnimation] = useState(false);
  const [messageViewed, setMessageViewed] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const renderParticle = (index) => (
    <div
      key={index}
      className={`particle absolute w-1 h-1 bg-purple-500 rounded-full opacity-50`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
      }}
    />
  );

  const fetchMessage = async (passwordAttempt = "") => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/messages/${id}${
          passwordAttempt ? `?password=${passwordAttempt}` : ""
        }`
      );

      if (!response.ok) {
        if (response.status === 401) {
          setIsPasswordRequired(true);
          return false;
        } else if (response.status === 404) {
          setIsMessageCollapsed(true);
          return false;
        } else {
          toast.error("Failed to fetch message");
          return false;
        }
      }

      const data = await response.json();
      setContent(data.content);
      setIsPasswordRequired(false);
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    await fetchMessage(password);
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
              setIsTransitioning(true);
              setShowDestroyAnimation(true);

              setTimeout(() => {
                setIsMessageCollapsed(true);
              }, 5000);
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

  if (isMessageCollapsed) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center px-4 overflow-hidden">
        <div className="max-w-md w-full glass-card p-8 text-center relative">
          {[...Array(20)].map((_, i) => renderParticle(i))}

          <div className="mb-6 relative">
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 bg-red-500/20 rounded-full glow-pulse" />
              <div
                className="absolute inset-4 bg-purple-500/20 rounded-full glow-pulse"
                style={{ animationDelay: "0.5s" }}
              />

              <div className="absolute inset-8 bg-black rounded-full flex items-center justify-center overflow-hidden">
                <div className="absolute w-full h-full bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 warp-animation" />

                <AlertCircle className="w-8 h-8 text-red-400 relative z-10 warp-animation" />
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold void-text mb-4 relative">
            Consumed by the Void
          </h2>

          <div className="relative">
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-400 font-medium">
              This quantum message has collapsed into a singularity,
              <br />
              forever lost in the fabric of spacetime.
            </p>

            <div className="mt-4 text-sm text-gray-400 opacity-75 italic">
              [Temporal coordinates corrupted]
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isPasswordRequired) {
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

            <form onSubmit={handlePasswordSubmit} className="space-y-6">
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
            </form>
          </div>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {!showDestroyAnimation ? (
          <div
            className={`glass-card p-8 transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
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
              <div className="w-32 h-32 mx-auto relative">
                <div className="absolute inset-0 bg-red-500/20 rounded-full glow-pulse" />
                <div
                  className="absolute inset-4 bg-purple-500/20 rounded-full glow-pulse"
                  style={{ animationDelay: "0.5s" }}
                />

                <div className="absolute inset-8 bg-black rounded-full flex items-center justify-center overflow-hidden">
                  <div className="absolute w-full h-full bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 warp-animation" />

                  <AlertCircle className="w-8 h-8 text-red-400 relative z-10 warp-animation" />
                </div>
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

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />
      </div>
    </div>
  );
};

export default ViewMessage;
