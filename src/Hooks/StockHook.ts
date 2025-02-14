import { ProductsContextType } from "../Interfaces/interfaces"

export const handleStock = (context:ProductsContextType ,add: boolean, productId: string) => {
    try {
        context?.modifyStock(productId, add)
    } catch (error) {
        console.error(`Error al actualizar el stock del producto ${productId}:`, error)
    }
    
}