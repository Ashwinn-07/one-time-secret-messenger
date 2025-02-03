import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateMessage from "./components/CreateMessage";
import ViewMessage from "./components/ViewMessage";
import "./App.css";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateMessage />} />
        <Route path="/message/:id" element={<ViewMessage />} />
      </Routes>
    </Router>
  );
};

export default App;
