import { useState } from 'react';
import LandingPage from './components/LandingPage';

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
