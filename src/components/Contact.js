import React from 'react';

function Contact() {
  return (
    <main className="main-content">
      <h2>Contact</h2>
      <p style={{ maxWidth: '800px', textAlign: 'justify', lineHeight: '1.6' }}>
        If you have questions about the project or would like to give feedback, feel free to contact us:
      </p>

      <a href="mailto:mail@reutlingen-university.de">
        <button className="start-button">Send us an Email</button>
      </a>

      <p style={{ marginTop: '2rem', fontSize: '0.95rem' }}>
        We are happy to hear from you!
      </p>
    </main>
  );
}

export default Contact;

