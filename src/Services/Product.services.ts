const API_URL = "http://localhost:3000/grocery"

export const fetchProducts = async () => {
  try {
    const response = await fetch(API_URL, { method: "GET" })
    return await response.json()
  } catch (error) {
    console.error("Error al obtener los productos:", error)
    return null
  }
}

export const updateFavorite = async (id: string, fav: string | number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ favorite: fav })
    })
    return await response.json()
  } catch (error) {
    console.error(`Error al actualizar el favorito del producto ${id}:`, error)
    return null
  }
}

export const updateStock = async (id: string, newStock: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ stock: newStock })
    })
    return await response.json()
  } catch (error) {
    console.error(`Error al actualizar el stock del producto ${id}:`, error)
    return null
  }
}
