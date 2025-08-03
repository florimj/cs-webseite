import React from 'react';

function LandingPage({ onNavigate }) {
  return (
      <main className="main-content">
      <img src="/illustration-startup.svg" alt="Startup Illustration" className="landing-image" />
        <section style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h2>Welcome!</h2>
          <p>
            Explore our interactive model for the governance of corporate start-ups. Learn more about mechanisms, structures and decision-making processes
          </p>
          <button className="start-button" onClick={() => onNavigate('dashboard')}>
            Start Now!
          </button>
        </section>

        <section
          className="project-info"
          style={{
            marginTop: '50px',
            padding: '0 20px',
            maxWidth: '900px',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'left',
            lineHeight: '1.6',
            fontSize: '1.05rem',
          }}
        >
          <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>About This Project</h3>
          <p>
            This website was developed as part of a university project at HHZ Böblingen and aims to
            provide practical insights into the governance of corporate start-ups. Based on scientific
            research (Garidis et al.), we’ve built an interactive environment to support strategic
            decision-making in corporate innovation settings.
          </p>

          <h3 style={{ textAlign: 'center', marginTop: '40px' }}>What You Can Explore</h3>
          <ul style={{ paddingLeft: '20px' }}>
            <li><strong>Home:</strong> Intro and navigation starting point.</li>
            <li><strong>Startup Models:</strong> Discover different governance archetypes and how companies support their start-ups.</li>
            <li><strong>Dashboard:</strong> Learn how companies govern their corporate startups along three key dimensions.</li>
            <li><strong>Mindmap:</strong> Visually explore governance dimensions and detailed mechanisms.</li>
            <li><strong>Strategy Decision Tree:</strong> Find out which model suits your situation through guided decisions.</li>
            <li><strong>About Us:</strong> Meet the team behind the project and the academic background.</li>
            <li><strong>Contact:</strong> Send us your feedback or collaboration ideas.</li>
          </ul>

          <h3 style={{ textAlign: 'center', marginTop: '40px' }}>How to Use It</h3>
          <p>
            You can begin by clicking <strong>"Start Now!"</strong> to access the Dashboard, or use the navigation bar to explore different sections. 
            The tools on this site are designed to help you understand, compare, and apply corporate startup strategies in practice.
          </p>
        </section>


      </main>
  );
}

export default LandingPage;