
import { LanguageProvider } from './context/LanguageContext';
import { InventoryProvider } from './context/InventoryContext';
import Navbar from './components/Navbar';
import Scanner from './components/Scanner';
import Inventory from './components/Inventory';
import TransactionHistory from './components/TransactionHistory';
import MissingCards from './components/MissingCards';
function App() {
  return (
    <LanguageProvider>
      <InventoryProvider>
        <div className="min-h-screen bg-gray-100">
          
          {/* barra de navegación superior */}
          <Navbar />
          
          <main className="p-4">
            {/* El área para escanear cartas */}
            <Scanner />
            
            {/* Separador visual */}
            <hr className="my-10 border-gray-300" /> 
            
            {/* colección */}
            <Inventory />
            <hr className="my-10 border-gray-300" />
            <TransactionHistory />
            <hr className="my-10 border-gray-300" />
            <MissingCards />

          
          </main>

        </div>
      </InventoryProvider>
    </LanguageProvider>
  );
}

export default App;