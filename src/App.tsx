import { Product as ProductModel } from './Models/Product.model'
import { ReactNode } from 'react'
import { createContext, useState, useEffect } from 'react'
import { fetchProducts, updateFavorite, updateStock } from './Services/Product.services'
import Page from './Components/Page'
import { ProductsContextType } from './Interfaces/interfaces'

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductModel[]>([])
  const [cart, setCart] = useState<ProductModel[]>([])

  useEffect(() => {
    getProducts()
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);  

  const getProducts = async () => {
    try {
      const data = await fetchProducts()
      setProducts(data)
    } catch (error) {
      console.error("Error al obtener los productos:", error)
    }
  }

  const modifyStock = async (productId: string, add: boolean) => {
    let updatedStock = 0

    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === productId) {
          if (add && product.stock <= 0) return product
          updatedStock = product.stock + (add ? -1 : 1)
          return { ...product, stock: updatedStock }
        }
        return product
      })
    );

    setCart((prevCart) => {
      const productInCart = prevCart.find((p) => p.id === productId)
      const productToAdd = products.find((p) => p.id === productId)

      if (!productToAdd) return prevCart;

      if (productToAdd.stock < 1 && add) {
        alert("No hay más en stock");
        return prevCart;
      }

      if (productInCart) {
        return prevCart.map((product) =>
          product.id === productId
            ? { ...product, stock: Math.max(product.stock + (add ? 1 : -1), 0) }
            : product
        );
      } else {
        const newProduct = { ...productToAdd, stock: 1 }
        return [...prevCart, newProduct];
      }
    });

    await updateStock(productId, updatedStock);
  };

  const modifyFav = async (productId: string, currentFavorite: string | number) => {

    try {
      const newFavorite = currentFavorite == 1 ? 0 : "1"
      await updateFavorite(productId, newFavorite);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, favorite: newFavorite } : product
        )
      )
    } catch {
      throw new Error("Ocurrió un problema en la solicitud")
    }
  }

  return (
    <ProductsContext.Provider value={{ products, cart, modifyStock, modifyFav }}>
      {children}
    </ProductsContext.Provider>
  )
}

function App() {
  return (
    <ProductsProvider>
      <Page />
    </ProductsProvider>
  );
}

export default App;
