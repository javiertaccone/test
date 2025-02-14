import { ProductProps } from "../Interfaces/interfaces"
import { ProductsContext } from "../App"
import { useContext } from "react"
import { handleStock } from "../Hooks/StockHook"

function SmallProduct({ product }: ProductProps) {

    const context = useContext(ProductsContext)

    return (
        <div key={product.id} className="my-5 rounded-lg border border-gray-100 bg-white shadow-md grid grid-cols-7">
            <div className='col-span-2 relative mx-3 my-3 flex overflow-hidden rounded-xl'>
                <img src={product.image_url}></img>
            </div>
            <div className='col-span-5'>
                <p className="text-l ml-5 mt-1 tracking-tight text-slate-900">{product.productName}</p>
                <div className="grid grid-cols-7">
                    <div className="col-span-5">
                        <div className="flex items-center justify-center p-4 space-x-2 bg-white rounded-lg">
                            <button
                                onClick={() => handleStock(context!, false, product.id)}
                                className="text-2xl font-bold text-slate-700 bg-gray-200 hover:bg-gray-300 p-2 rounded-md w-10"
                            >-</button>
                            <p className="text-2xl font-bold text-slate-900">{product.stock}</p>
                            <button
                                onClick={() => handleStock(context!, true, product.id)}
                                className="text-2xl font-bold text-slate-700 bg-gray-200 hover:bg-gray-300 p-2 rounded-md w-10"
                            >+</button>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <p className="text-3xl mt-2 font-bold text-slate-900">{product.price}€</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SmallProduct