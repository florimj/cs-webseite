import React from 'react';
import { FaRocket, FaProjectDiagram, FaSitemap, FaTree, FaUsers, FaEnvelope } from 'react-icons/fa';

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
          backgroundColor: '#ffffff',
          padding: '3rem 2rem',
          maxWidth: '1000px',
          margin: '2rem auto',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          lineHeight: '1.7',
          fontSize: '1.1rem',
        }}
      >
        <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.5rem' }}>About This Project</h3>
        <p>
          This website was developed as part of a university project at HHZ Böblingen and aims to provide practical
          insights into the governance of corporate start-ups. Based on scientific research (Garidis et al.), we’ve
          built an interactive environment to support strategic decision-making in corporate innovation settings.
        </p>

        <h3 style={{ textAlign: 'center', margin: '3rem 0 1.5rem 0', fontSize: '1.5rem' }}>What You Can Explore</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '2rem' }}>
          <div><FaRocket /> <strong>Home:</strong> Intro and navigation starting point.</div>
          <div><FaProjectDiagram /> <strong>Startup Models:</strong> Governance archetypes & support forms.</div>
          <div><FaSitemap /> <strong>Dashboard:</strong> Explore how companies govern startups along dimensions.</div>
          <div><FaTree /> <strong>Mindmap:</strong> Visual exploration of governance structures.</div>
          <div><FaTree /> <strong>Strategy Decision Tree:</strong> Guided strategy recommendations.</div>
          <div><FaUsers /> <strong>About Us:</strong> Meet the team & academic foundation.</div>
          <div><FaEnvelope /> <strong>Contact:</strong> Get in touch or share feedback.</div>
        </div>

        <h3 style={{ textAlign: 'center', margin: '3rem 0 1.5rem 0', fontSize: '1.5rem' }}>How to Use It</h3>
        <p>
          You can begin by clicking <strong>"Start Now!"</strong> to access the Dashboard, or use the navigation bar at
          the top to explore the different sections of the website. This site is designed to help you understand,
          compare and apply corporate startup strategies effectively, based on real scientific findings and
          practitioner feedback.
        </p>
      </section>

    </main>
  );
}

export default LandingPage;