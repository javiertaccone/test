import { Product } from "../Models/Product.model"

export interface ProductProps {
    product: Product
}

export interface ProductsContextType {
  products: Product[]
  cart: Product[]
  modifyStock: (productId: string, add: boolean) => void
  modifyFav: (productId: string, currentFavorite: string | number) => void
}
