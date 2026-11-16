
import { LanguageProvider } from './context/LanguageContext';
import { InventoryProvider } from './context/InventoryContext';
import Navbar from './components/Navbar';
import Scanner from './components/Scanner';
import Inventory from './components/Inventory';

function App() {
  return (
    <LanguageProvider>
      <InventoryProvider>
        <div className="min-h-screen bg-gray-100">
          
          {/* Tu barra de navegación superior */}
          <Navbar />
          
          <main className="p-4">
            {/* El área para escanear cartas */}
            <Scanner />
            
            {/* Separador visual */}
            <hr className="my-10 border-gray-300" /> 
            
            {/* Tu colección personal */}
            <Inventory />
          </main>

        </div>
      </InventoryProvider>
    </LanguageProvider>
  );
}

export default App;