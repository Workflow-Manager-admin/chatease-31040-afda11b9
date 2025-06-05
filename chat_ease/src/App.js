import React from 'react';
import './App.css';
import NavBar from './NavBar';

function App() {
  return (
    <div className="app">
      <NavBar />
      <main>
        <div className="container" style={{paddingTop: '16px'}}>
          <div className="hero">
            <div className="subtitle">AI Conversation Partner: TalkBuddy</div>
            <h1 className="title">chat_ease</h1>
            <div className="description">
              Start building your application.
            </div>
            <button className="btn btn-large">Button</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;