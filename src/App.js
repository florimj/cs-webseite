import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Footer from './components/footer';
import Header from './components/header';
import Main from './components/main_empty';

function App() {
  const [view, setView] = useState('landing');

  return (
    <>
      {view === 'landing' && <LandingPage onNavigate={setView} />}
      {/* weitere Komponenten kommen später */}
    </>
  );
}

export default App;
