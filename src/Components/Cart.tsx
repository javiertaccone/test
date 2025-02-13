import { useContext, useEffect, useState } from "react"
import { ProductsContext } from "../App"

function Cart() {

  const context = useContext(ProductsContext)
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    setCartTotal(calculateTotal())
  }, [context])

  const calculateTotal = () => {
    let total = 0;
    context?.cart.forEach((product) => {
      total += product.price * product.stock;
    });
    return total;
  };


  return (
    <div className="sticky top-0 p-5 h-screen bg-gray-100">
      <h5 className="text-3xl mb-1 tracking-tight font-bold text-slate-900">Cart</h5>
      <div
        className="overflow-y-auto max-h-[calc(100vh-150px)]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {context?.cart.map((product) => (
          product.stock > 0 &&
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
                      onClick={() => context?.modifyStock(product.id, false)}
                      className="text-2xl font-bold text-slate-700 bg-gray-200 hover:bg-gray-300 p-2 rounded-md w-10"
                    >-</button>
                    <p className="text-2xl font-bold text-slate-900">{product.stock}</p>
                    <button
                      onClick={() => context?.modifyStock(product.id, true)}
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
        ))}
      </div>
      <h5 className="flex mt-5 justify-end text-2xl tracking-tight font-bold text-slate-900">Total: {cartTotal}€</h5>
    </div>
  )
}
export default Cart
