import React from 'react';

function Main({ onNavigate }) {
  return (
    <main className="main-content">
      <section>
        <h2>Seite in Arbeit</h2>
        <p>
          Funktion wird freigeschaltet
        </p>
        <button className="start-button" onClick={() => onNavigate('landing')}>
          Zurück
        </button>
      </section>
    </main>
  );
}

export default Main;