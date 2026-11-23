export const searchCardByName = async (input) => {
  try {
    const[cardName, setName]= input.split(' - ').map((s) => s.trim());
    const rawQuery = setName
    ? `name:"${cardName}" set.name:"${setName}"`
    : `name:"${cardName}"`;
    const query = encodeURIComponent(rawQuery);
    const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=${query}`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching card data:", error);
    return [];
    }
  };

export const getSets = async () => {
  try {
    const response = await fetch('https://api.pokemontcg.io/v2/sets?orderBy=-releaseDate&pageSize=30');
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching sets:", error);
    return [];
  }
};

export const getCardsBySet = async (setId) => {
  try {
    const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${setId}&pageSize=100`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching cards by set:", error);
    return [];
  }
};
