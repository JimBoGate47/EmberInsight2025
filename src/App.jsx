import { useState } from 'react';
import './App.css';
import Map from './Components/Map';
import Header from './Components/Header';

function App() {
  // Estado para controlar si mostrar o no los focos
  const [showFires, setShowFires] = useState(false);

  // Función para manejar la generación de focos
  const handleGenerate = () => {
    setShowFires(true);
  };

  return (
    <div>
      <Header />

      {/* Pasamos showFires y handleGenerate como props a Map */}
      <Map showFires={showFires} handleGenerate={handleGenerate} />
    </div>
  );
}

export default App;
