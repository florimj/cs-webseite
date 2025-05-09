import React from 'react';

function LandingPage({ onNavigate }) {
  return (
      <main className="main-content">
      <img src="/illustration-startup.svg" alt="Startup Illustration" className="landing-image" />
        <section>
          <h2>Welcome!</h2>
          <p>
            Explore our interactive model for the governance of corporate start-ups.
            <hr></hr>
            Learn more about mechanisms, structures and decision-making processes.
          </p>
          <button className="start-button" onClick={() => onNavigate('dashboard')}>
            Start Now!
          </button>
        </section>
      </main>
  );
}

export default LandingPage;