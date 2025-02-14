import { useContext } from "react"
import { ProductsContext } from "../App"
import { ProductProps } from "../Interfaces/interfaces"
import { handleStock } from "../Hooks/StockHook"

function Product({ product }: ProductProps) {

    const context = useContext(ProductsContext)

    const truncatedDescription = product.productDescription.length > 180
        ? product.productDescription.substring(0, 180) + "..."
        : product.productDescription

    const handleFav = () => {
        try {
            context?.modifyFav(product.id, product.favorite)
        } catch (error) {
            console.error(`Error al actualizar el favorito del producto ${product.id}:`, error)
        }
    }
    
    return (
        <>
            <div key={product.id} className="relative flex w-full flex-col rounded-lg border border-gray-100 bg-white shadow-md">
                <div className="relative mx-3 mt-3 flex overflow-hidden rounded-xl">
                    <img className="object-cover" src={product.image_url} alt={product.productName} />
                    <svg onClick={handleFav}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={Number(product.favorite) === 1 ? "yellow" : "gray"}
                        className="star-icon absolute top-0 left-0 m-2"
                    >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                </div>
                <div className="flex flex-col flex-grow md:pt-4 pt-2 md:px-5 px-2 pb-5">
                    <div className="md:h-13 h:9">
                        <h5 className="md:text-xl tracking-tight leading-tight text-slate-900">{product.productName}</h5>
                    </div>
                    <div className="md:mb-2 mb-0.5 flex items-center justify-between">
                        <p className="text-slate-900">Left: {product.stock}</p>
                        <p className="md:text-3xl text-xl font-bold text-slate-900">{product.price}€</p>
                    </div>
                    <p className="text-sm text-slate-400 leading-none">{truncatedDescription}</p>
                    <div className="mt-auto pt-4"> 
                        <button onClick={() => handleStock(context!, true, product.id)}
                            className="rounded-md bg-slate-900 w-full py-2 text-sm font-medium text-white hover:bg-gray-700">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Product