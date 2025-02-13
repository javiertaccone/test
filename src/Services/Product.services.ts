const API_URL = "http://localhost:3000/grocery";

export const fetchProducts = async () => {
  const response = await fetch(API_URL, { method: "GET" });
  return response.json();
};

export const updateFavorite = async (id: string, fav: string | number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ favorite: fav }),
  });
  return response.json();
};

export const updateStock = async (id: string, newStock: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ stock: newStock }),
  });
  return response.json();
};
