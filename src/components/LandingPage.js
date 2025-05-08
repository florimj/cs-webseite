import React from 'react';

function LandingPage({ onNavigate }) {
  return (
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
  );
}

export default LandingPage;