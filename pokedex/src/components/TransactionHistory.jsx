import { useState, useContext } from 'react';
import { InventoryContext } from '../context/InventoryContext';

const TransactionHistory = () => {
  const { transactions, addTransaction } = useContext(InventoryContext);
  const [cardName, setCardName] = useState('');
  const [type, setType] = useState('Compra');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cardName.trim() || !amount.trim()) return;
    addTransaction(cardName, type, amount);
    setCardName('');
    setAmount('');
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Mis compras / ventas
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Nombre de la carta (ej. Oshawott)"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm"
        >
          <option value="Compra">Compra</option>
          <option value="Venta">Venta</option>
        </select>
        <input
          type="number"
          step="0.01"
          placeholder="Monto (USD)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm w-32"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-blue-700"
        >
          Registrar
        </button>
      </form>

      {transactions.length === 0 ? (
        <p className="text-gray-500 text-sm">No tienes compras o ventas aún.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {transactions.map((tx) => (
            <li key={tx.id} className="py-2 flex justify-between text-sm">
              <span>
                <strong>{tx.type}:</strong> {tx.cardName} ({tx.date})
              </span>
              <span className="font-bold text-gray-800">${tx.amount} USD</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionHistory;