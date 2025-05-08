import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Footer from './components/footer';
import Header from './components/header';
import Main from './components/main_empty';

function App() {
  const [view, setView] = useState('landing');

  return (
    <div className="page-container">
    <Header onNavigate={setView} />

    <main className="main-content">
      {view === 'landing' && <LandingPage onNavigate={setView} />}
      {view === 'dashboard' && <Main onNavigate={setView} />}
      {view === 'main' && <Main />}
      {/* weitere Komponenten kommen später */}
    </main>

    <Footer />
  </div>
  );
}

export default App;
