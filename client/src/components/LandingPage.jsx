import React from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Clock,
  Key,
  ArrowRight,
  Atom,
  Send,
  Sparkles,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden hero-gradient">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-spin-slow" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Atom className="w-8 h-8 text-purple-400 animate-spin-slow" />
              <span className="text-xl font-bold text-white">EventHorizon</span>
            </div>
            <Link
              to="/create"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-all hover:scale-105"
            >
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8 gradient-text leading-tight">
            Where Secrets Vanish
            <br />
            Beyond the Event Horizon
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Like messages crossing a black hole's event horizon, your secrets
            disappear forever. Not even we can retrieve them once they're gone.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/create"
              className="group inline-flex items-center px-8 py-4 text-lg font-medium rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all hover:scale-105"
            >
              Create Secret Message
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-xl glass-card hover:bg-white/10 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      <div className="relative py-20 bg-gradient-to-b from-gray-900/50 to-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Quantum-Grade Security",
                description:
                  "Your messages are protected with encryption so strong, it's like they're trapped behind a black hole's event horizon.",
                color: "text-purple-400",
              },
              {
                icon: Clock,
                title: "Temporal Collapse",
                description:
                  "Set when your message should collapse into the void. Once the time's up, it's gone forever - just like light in a black hole.",
                color: "text-blue-400",
              },
              {
                icon: Key,
                title: "Singularity Protection",
                description:
                  "Optional passphrase protection adds another layer of security before messages cross the event horizon.",
                color: "text-violet-400",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass-card p-8 hover:scale-105 transition-all duration-300"
              >
                <feature.icon className={`w-12 h-12 ${feature.color} mb-6`} />
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="how-it-works" className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            The Journey Into the Void
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Sparkles,
                title: "Create",
                description:
                  "Compose your message and set its quantum parameters - expiration time and optional passphrase",
              },
              {
                icon: Send,
                title: "Share",
                description:
                  "Send the coordinates (secure link) to your intended recipient",
              },
              {
                icon: Atom,
                title: "Vanish",
                description:
                  "Once read, your message collapses into the singularity, leaving no trace behind",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative glass-card p-8 text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                    <step.icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mt-6 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-12 md:p-20">
            <h2 className="text-4xl font-bold mb-8 gradient-text">
              Ready to Cross the Event Horizon?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands who trust EventHorizon to make their sensitive
              messages vanish without a trace.
            </p>
            <Link
              to="/create"
              className="group inline-flex items-center px-8 py-4 text-lg font-medium rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all hover:scale-105"
            >
              Begin Transmission
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
