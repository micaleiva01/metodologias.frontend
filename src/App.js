import React from 'react';
import Teams from './pages/Teams.jsx';
import Pilots from "./pages/Pilots";
import Heading from './components/heading.jsx';
import Footer from './components/footer.jsx';
import "./App.css";

function App() {
  return (
    <div className="App body">
      <main>
        <Heading />
        <Teams />
        <Pilots />
        <Footer />
      </main>
    </div>
  );
}

export default App;
