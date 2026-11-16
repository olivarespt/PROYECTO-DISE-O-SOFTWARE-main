import  { useContext } from 'react';
import { InventoryContext } from '../context/InventoryContext';
import { LanguageContext } from '../context/LanguageContext';

const Inventory = () => {
  // Conectamos inventario y traducciones
  const { inventory, assignToDeck } = useContext(InventoryContext);
  const { t } = useContext(LanguageContext);

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('myInventory')}</h2>

      {/* Condición: Si no hay cartas se muestra un mensaje, si hay cartas se muestra la grilla */}
      {inventory.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-lg shadow text-gray-500">
          {t('emptyInventory')}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Iteramos sobre las cartas guardadas */}
          {inventory.map((card) => (
            <div key={card.id} className="bg-white p-5 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between">
              
              <div>
                <h3 className="text-xl font-bold text-red-600 border-b pb-2 mb-2">{card.name}</h3>
                <div className="text-sm text-gray-700 space-y-1">
                  <p><strong>Rareza:</strong> {card.rarity}</p>
                  <p><strong>Tipo:</strong> {card.type}</p>
                  <p><strong>Expansión:</strong> {card.expansion}</p>
                </div>
                
                {/* tag del mazo actual */}
                <div className="mt-4">
                  <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Mazo Asignado:</span>
                  <p className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold ml-2 mt-1">
                    {card.deck}
                  </p>
                </div>
              </div>

              {/* Controles para asignarle a un nuevo mazo */}
              <div className="mt-6 flex gap-2">
                <input
                  type="text"
                  placeholder="Nombre del mazo..."
                  className="border border-gray-300 rounded px-3 py-2 w-full text-sm outline-none focus:border-red-500 transition-colors"
                  onKeyDown={(e) => {
                    // Permite guardar presionando la tecla Enter
                    if (e.key === 'Enter' && e.target.value.trim() !== '') {
                      assignToDeck(card.id, e.target.value);
                      e.target.value = ''; 
                    }
                  }}
                />
                <button
                  className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition-colors"
                  onClick={(e) => {
                    const input = e.target.previousSibling;
                    if (input.value.trim() !== '') {
                       assignToDeck(card.id, input.value);
                       input.value = '';
                    }
                  }}
                >
                  Asignar
                </button>
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Inventory;