import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Footer from './components/footer';
import Header from './components/header';
import Dashboard from './components/Dashboard';
import Mindmap from './components/Mindmap';

function App() {
  const [view, setView] = useState('landing');

  return (
    <div className="page-container">
    <Header onNavigate={setView} />

    <main className="main-content">
      {view === 'landing' && <LandingPage onNavigate={setView} />}
      {view === 'dashboard' && <Dashboard onNavigate={setView} />}
      {view === 'mindmap' && <Mindmap onNavigate={setView} />}
      {/* weitere Komponenten */}
    </main>

    <Footer />
  </div>
  );
}

export default App;
