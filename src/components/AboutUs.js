import React from 'react';

function AboutUs({ onNavigate }) {
  return (
    <main className="main-content">
      <h2>About Us</h2>
      <p style={{ maxWidth: '800px', textAlign: 'justify', lineHeight: '1.6' }}>
        We are a student team working on a project on the topic of corporate startup governance models. Our goal is to translate academic insights into a user-friendly and accessible digital format. In addition to providing structured information, we aim to offer a meaningful service by enabling tailored recommendations for corporate startup strategies based on specific conditions and needs.
        <br /><br />
        This project was developed as part of a university project course at the Herman Hollerith Zentrum in Böblingen and aims to help organizations better understand the differences and practical applications of various corporate startup approaches.
      </p>

      <button className="start-button" style={{ marginTop: '2rem' }} onClick={() => onNavigate('contact')} >
        Get in touch
      </button>
    </main>
  );
}

export default AboutUs;
