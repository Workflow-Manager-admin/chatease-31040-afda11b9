import React from 'react';
import './App.css';
import NavBar from './NavBar';
import LandingPage from './LandingPage';

function App() {
  return (
    <div className="app">
      <NavBar />
      <main>
        <LandingPage />
        {/* Where the chat area will mount below. Example placeholder: */}
        <div id="chat" style={{ minHeight: 320, width: "100%" }}>
          {/* Chat UI goes here */}
        </div>
      </main>
    </div>
  );
}

export default App;