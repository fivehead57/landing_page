import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import landingPagePhoto from '/Users/salonisingh/Desktop/treta/ttretta/src/assets/landingpage_photo.png'; // Adjust path as needed

function App() {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 0) {
        navbar.classList.add('scrolled'); // Add class when scrolled
      } else {
        navbar.classList.remove('scrolled'); // Remove class when at the top
      }
    };

    window.addEventListener('scroll', handleScroll); // Attach scroll event
    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup event on component unmount
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/">Home</Link>
          <div className="dropdown">
            <Link to="/features" className="dropbtn">Features</Link>
            <div className="dropdown-content">
              <Link to="/recommendations">Recommendations</Link>
              <Link to="/evaluation">Evaluation</Link>
              <Link to="/testing">Testing</Link>
            </div>
          </div>
          <div className="dropdown">
            <Link to="/tools" className="dropbtn">Tools</Link>
            <div className="dropdown-content">
              <Link to="/education">Education</Link>
              <Link to="/algorithms">Algorithms</Link>
              <Link to="/charts">Charts</Link>
            </div>
          </div>
          <Link to="/blogs">Blogs</Link>
          <Link to="/login">Login/Register</Link>
        </nav>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

const LandingPage = () => {
  const messages = [
    "Trade with Confidence!",
    "Discover New Opportunities!",
    "Stay Ahead of Market Trends!",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true); // State to control visibility

  useEffect(() => {
    const showMessage = (index) => {
      setCurrentMessageIndex(index); // Update current message index
      setIsVisible(true); // Show the current message

      // Fade out the current message after a delay
      const fadeOutTimeout = setTimeout(() => {
        setIsVisible(false); // Start fading out

        // Show the next message after fading out
        const nextIndex = (index + 1) % messages.length;
        setTimeout(() => {
          showMessage(nextIndex); // Show the next message
        }, 500); // Wait for fade out duration before showing the next message
      }, 2000); // Display current message for 2 seconds

      return () => clearTimeout(fadeOutTimeout); // Cleanup timeout on unmount
    };

    showMessage(0); // Start with the first message

    return () => {
      clearTimeout(); // Cleanup timeout on unmount
    };
  }, [messages.length]);

  return (
    <div className="landing">
      <section className="section tagline">
        <div className="tagline-content">
          <h1>With TTRETTA</h1>
          <div className={`transforming-text ${isVisible ? 'fade-in' : 'fade-out'}`}>
            <h2>{messages[currentMessageIndex]}</h2>
          </div>
        </div>
        <img src={landingPagePhoto} alt="Ttretta" />
      </section>
      <section className="section why-ttretta">
        <h2>Why Ttretta?</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac neque vel arcu malesuada cursus.</p>
        <div className="boxes">
          <div className="box">
            <i className="icon">📈</i>
            <h3>Trusted Stock Recommendations</h3>
          </div>
          <div className="box">
            <i className="icon">📊</i>
            <h3>Data-Driven Insights</h3>
          </div>
          <div className="box">
            <i className="icon">🔍</i>
            <h3>In-Depth Analysis</h3>
          </div>
          <div className="box">
            <i className="icon">🛠️</i>
            <h3>Customizable Tools</h3>
          </div>
        </div>
      </section>
      <section className="section features">
        <h2>How Do We Help You?</h2>
        <ul>
          <li>Real-time stock recommendations</li>
          <li>In-depth stock evaluation</li>
          <li>Customizable testing tools</li>
        </ul>
      </section>
      <section className="section choose-us">
        <h2>Why Choose Us?</h2>
        <p>Our expert analysis and user-friendly tools set us apart.</p>
      </section>
      <section className="section faqs">
        <h2>FAQs</h2>
        <p>Find answers to your questions about stock trading.</p>
      </section>
    </div>
  );
}

export default App;
