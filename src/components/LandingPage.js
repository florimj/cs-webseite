import React from 'react';
import { FaHome, FaSitemap, FaTree, FaInfoCircle, FaEnvelope } from 'react-icons/fa';

function LandingPage({ onNavigate }) {
  return (
    <div className="page-container">
      <header className="main-header">
        <h1>Corporate Startup Governance Modell</h1>
        <nav>
          <button onClick={() => onNavigate('landing')}><FaHome /> Home</button>
          <button onClick={() => onNavigate('dashboard')}><FaSitemap /> Dashboard</button>
          <button onClick={() => onNavigate('baum')}><FaTree /> Entscheidungsbaum</button>
          <button onClick={() => onNavigate('about')}><FaInfoCircle /> About Us</button>
          <button onClick={() => onNavigate('contact')}><FaEnvelope /> Contact</button>
        </nav>

      </header>

      <main className="main-content">
      <img src="/illustration-startup.svg" alt="Startup Illustration" className="landing-image" />
        <section>
          <h2>Willkommen!</h2>
          <p>
            Erkunde unser interaktives Modell zur Governance von Corporate Startups.
            Lerne mehr über Mechanismen, Strukturen und Entscheidungsprozesse.
          </p>
          <button className="start-button" onClick={() => onNavigate('dashboard')}>
            Jetzt starten
          </button>
        </section>
      </main>

      <footer className="main-footer">
        <div className="footer-content">
          <img src="/HHZ_Logo_Hochschulen.png" alt="HHZ Logo" className="footer-logo-left" />
          <div className="footer-text-center">
            <p>© 2025 HHZ Böblingen – All Rights Reserved</p>
            <p>
              You need to know more?! <span className="contact-link">LET’S talk now!</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
