import { useState, useEffect, useContext } from 'react';
import { InventoryContext } from '../context/InventoryContext';
import { getSets, getCardsBySet } from '../api';

const MissingCards = () => {
  const { inventory } = useContext(InventoryContext);
  const [sets, setSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState('');
  const [setCards, setSetCards] = useState([]);
  const [loading, setLoading] = useState(false);

  // LOad setlist
  useEffect(() => {
    const fetchSets = async () => {
      const data = await getSets();
      setSets(data);
    };
    fetchSets();
  }, []);

  // search all cards of the set
  const handleCheckSet = async () => {
    if (!selectedSet) return;
    setLoading(true);
    const cards = await getCardsBySet(selectedSet);
    setSetCards(cards);
    setLoading(false);
  };

  // Filter for the set cards that user does not own yet
  const ownedIds = new Set(inventory.map((card) => card.apiId));
  const missingCards = setCards.filter((card) => !ownedIds.has(card.id));
  const ownedCount = setCards.length - missingCards.length;

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Coleccionistas: Cartas que faltan por set
      </h2>

      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={selectedSet}
          onChange={(e) => setSelectedSet(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
        >
          <option value="">Selecciona una expansión...</option>
          {sets.map((set) => (
            <option key={set.id} value={set.id}>
              {set.name} ({set.total} cartas)
            </option>
          ))}
        </select>

        <button
          onClick={handleCheckSet}
          disabled={!selectedSet || loading}
          className="bg-red-600 text-white px-5 py-2 rounded text-sm font-semibold hover:bg-red-700 disabled:bg-gray-400"
        >
          {loading ? 'Buscando...' : 'Ver cartas faltantes'}
        </button>
      </div>

      {setCards.length > 0 && (
        <div>
          <p className="text-sm text-gray-700 mb-4">
            Tienes <strong>{ownedCount}</strong> de <strong>{setCards.length}</strong> cartas vistas en este set. Te faltan <strong className="text-red-600">{missingCards.length}</strong>.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-96 overflow-y-auto p-2 border rounded">
            {missingCards.map((card) => (
              <div
                key={card.id}
                className="border border-gray-200 rounded p-2 text-center bg-gray-50 flex flex-col items-center"
              >
                {card.images?.small && (
                  <img
                    src={card.images.small}
                    alt={card.name}
                    className="w-24 h-auto mb-2 opacity-75"
                  />
                )}
                <p className="text-xs font-bold text-gray-800">{card.name}</p>
                <p className="text-xs text-gray-500">#{card.number} · {card.rarity || 'Común'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MissingCards;