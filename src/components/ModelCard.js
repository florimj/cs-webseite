import React, { useState } from 'react';

function ModelCard({ title, intro, details }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="model-card">
      <h4>{title}</h4>
      <p>{intro}</p>

      {expanded && <p className="model-details">{details}</p>}

      <button className="start-button" onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Show less' : 'Read more'}
      </button>
    </div>
  );
}

export default ModelCard;