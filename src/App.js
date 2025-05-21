import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Footer from './components/footer';
import Header from './components/header';
import Dashboard from './components/Dashboard';
import Models from './components/Models';
import Mindmap from './components/Mindmap';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';

function App() {
  const [view, setView] = useState('landing');

  return (
    <div className="page-container">
    <Header onNavigate={setView} />

    <main className="main-content">
      {view === 'landing' && <LandingPage onNavigate={setView} />}
      {view === 'dashboard' && <Dashboard onNavigate={setView} />}
      {view === 'models' && <Models onNavigate={setView} />}
      {view === 'mindmap' && <Mindmap onNavigate={setView} />}
      {view === 'about' && <AboutUs onNavigate={setView} />}
      {view === 'contact' && <Contact onNavigate={setView} />}
      {/* weitere Komponenten */}
    </main>

    <Footer onNavigate={setView} />
  </div>
  );
}

export default App;
