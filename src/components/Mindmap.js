import React from 'react';

function Mindmap({ onNavigate }) {
  return (
    <main className="main-content">
      <h2>Mindmap</h2>
      <p>Mindmap</p>
      <button onClick={() => onNavigate('dashboard')}>Back</button>
    </main>
  );
}

export default Mindmap;