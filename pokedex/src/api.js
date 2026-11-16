export const searchCardByName = async (name) => {
  try {
    const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:"${name}"`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching card data:", error);
    return [];
  }
};