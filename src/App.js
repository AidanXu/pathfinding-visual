import React from "react";
import Grid from "./components/Grid"; // Adjust the path as necessary
import "./App.css"; // Make sure this is pointing to the correct file

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <h1>Navigation Bar</h1>
        {/* Add additional navigation items here */}
      </div>
      <div className="grid-container">
        <Grid />
      </div>
    </div>
  );
}

export default App;
