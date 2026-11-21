import { createContext, useState } from 'react';
// eslint-disable-next-line react-refresh/only-export-components
export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  // Memory for transactions history
  const [transactions, setTransactions] = useState([]);

  const addCard = (cardData) => {
    let estimatedPrice = 'No disponible';
    const tcgPrices = cardData.tcgplayer?.prices ? Object.values(cardData.tcgplayer.prices) : [];
    const firstTcgPrice = tcgPrices.find((p) => p.market || p.mid || p.low);
    const priceValue =
      firstTcgPrice?.market ||
      firstTcgPrice?.mid ||
      firstTcgPrice?.low ||
      cardData.cardmarket?.prices?.averageSellPrice ||
      cardData.cardmarket?.prices?.trendPrice;

  if (priceValue) {
    estimatedPrice = `$${priceValue} USD`;
  }

    const newCard = {
      id: new Date().getTime(),
      apiId: cardData.id, // Compare missing cards for set
      name: cardData.name,
      rarity: cardData.rarity || 'Desconocida',
      type: cardData.types ? cardData.types.join(', ') : 'Desconocido',
      expansion: cardData.set.name,
      setId: cardData.set.id, // ID set
      price: estimatedPrice,
      deck: 'Sin asignar',
      forTrade: false // is not available for trade (default)
    };

    setInventory((prevInventory) => [...prevInventory, newCard]);
  };

  const assignToDeck = (cardId, deckName) => {
    setInventory((prevInventory) =>
      prevInventory.map((card) =>
        card.id === cardId ? { ...card, deck: deckName } : card
      )
    );
  };

  // trade status (available or not)
  const toggleTradeStatus = (cardId) => {
    setInventory((prevInventory) =>
      prevInventory.map((card) =>
        card.id === cardId ? { ...card, forTrade: !card.forTrade } : card
      )
    );
  };

  // register a transaction (buy or sell) in the history
  const addTransaction = (cardName, type, amount) => {
    const newTransaction = {
      id: new Date().getTime(),
      cardName,
      type, // buy or sell
      amount,
      date: new Date().toLocaleDateString()
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        addCard,
        assignToDeck,
        toggleTradeStatus,
        transactions,
        addTransaction
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};