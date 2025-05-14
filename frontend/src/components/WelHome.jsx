import React from 'react';
import Navbar from './components/Navbar';
import WelHome from './components/WelHome';  // Updated import
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <WelHome />  {/* Use WelHome component */}
      <Footer />
    </div>
  );
}

export default App;

