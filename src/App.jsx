import React from 'react';
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
          <Navbar />
          <main className="p-4">
            <Scanner />
            <hr className="my-10 border-gray-300" /> 
            <Inventory />
          </main>
        </div>
      </InventoryProvider>
    </LanguageProvider>
  );
}

export default App;