// src/App.js
import React from "react";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";
import "./App.css";

function App() {
  const gridSize = 10; // This is the 'N' in your NxN grid

  return (
    <div className="App">
      <Navbar />
      <div className="grid-container">
        <Grid gridSize={gridSize} />
      </div>
    </div>
  );
}

export default App;
