
import { LanguageProvider } from './context/LanguageContext';
import { InventoryProvider } from './context/InventoryContext';
import Navbar from './components/Navbar';
import Scanner from './components/Scanner';
import Inventory from './components/Inventory';
import TransactionHistory from './components/TransactionHistory';
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
            
            {/* coleción */}
            <Inventory />
            <hr className="my-10 border-gray-300" />
            <TransactionHistory />
          </main>

        </div>
      </InventoryProvider>
    </LanguageProvider>
  );
}

export default App;