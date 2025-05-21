import React from 'react';

function Dashboard({ onNavigate }) {
  return (
    <main className="main-content">
      <section>
        <h2>The Three Dimensions of the Governance Model</h2>

        <div className="governance-box">
          <h3>1. Structures</h3>
          <p>The Structures dimension describes the fundamental formal anchoring of a corporate startup within the parent company. It includes decisions on the legal and organisational structure, the spatial allocation and the external appearance of the startup. The focus here is on the extent to which a corporate startup is separated or integrated from the existing company. Structural framework conditions such as the choice of location, the degree of legal independence or the proximity to the group organisation have a major influence on the operational freedom and perception of the startup - both internally and externally. This dimension therefore lays the foundation for how independently a corporate startup can operate and how closely it remains connected to the company.          </p>
        </div>

        <div className="governance-box">
          <h3>2. Processes & Operations</h3>
          <p>This dimension deals with the specific organisation of the operational processes and control mechanisms of a corporate startup. The focus here is on the regulations and processes that determine how the startup operates in day-to-day business, how decisions are made, how resources are provided and what criteria are used to evaluate success. The design of these processes has a significant influence on whether a startup can work efficiently and agilely or whether it is restricted by internal company structures. A high degree of process autonomy can increase the speed of innovation, while a more regulated approach ensures strategic control by the parent company. The challenge of this dimension lies in creating a balance between operational freedom and internal corporate control.          </p>
        </div>

        <div className="governance-box">
          <h3>3. Relational Mechanisms</h3>
          <p>The Relational Mechanisms dimension refers to the way in which the corporate startup and the parent company work together on a cultural and interpersonal level. It includes the quality of communication, building trust, understanding shared values and dealing with cultural differences. While formal structures and processes create a framework, it is often these soft factors that determine the success or failure of the collaboration. An open, trusting relationship between the players involved makes it possible to reduce tensions, avoid conflicts and utilise synergies effectively. This dimension is particularly relevant in order to create a cooperative environment in which the start-up can act independently without losing contact with the corporate world.          </p>
        </div>

        <button className="start-button" onClick={() => onNavigate('mindmap')}>
          Go To The Mind Map
        </button>
      </section>
    </main>
  );
}

export default Dashboard;
