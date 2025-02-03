import React, { useState } from "react";
import { Clock, Key, Send, AlertCircle, Copy, Sparkles } from "lucide-react";
import axios from "axios";

const CreateMessage = () => {
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [hours, setHours] = useState("");
  const [messageId, setMessageId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/message/${messageId}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen hero-gradient py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {!messageId ? (
          <div className="glass-card p-8">
            <div className="flex items-center justify-center mb-8">
              <Sparkles className="w-8 h-8 text-purple-400 mr-3" />
              <h2 className="text-2xl font-bold gradient-text">
                Create Quantum Message
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter your secret message..."
                  required
                  className="w-full h-48 bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password (optional)"
                    className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    placeholder="Burn after X hours (optional)"
                    className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-3" />
                    Creating Quantum Link...
                  </div>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1" />
                    Create Quantum Link
                  </>
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
        ) : (
          <div className="glass-card p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-pulse-slow" />
              <div className="absolute inset-2 bg-gray-900 rounded-full" />
              <div className="absolute inset-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-spin-slow" />
            </div>

            <h3 className="text-2xl font-bold mb-6 gradient-text">
              Quantum Link Generated
            </h3>

            <div className="relative group">
              <div className="bg-black/40 border border-white/10 rounded-lg p-4 break-all mb-2">
                {`${window.location.origin}/message/${messageId}`}
              </div>
              <button
                onClick={copyToClipboard}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <Copy className={`w-5 h-5 ${copied ? "text-green-400" : ""}`} />
              </button>
            </div>

            <p className="text-gray-400 mt-6">
              This message will collapse into the quantum void after being read
              {hours && ` or in ${hours} hours`}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateMessage;
