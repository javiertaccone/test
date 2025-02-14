import { useContext, useEffect, useState } from "react"
import { ProductsContext } from "../App"
import SmallProduct from "./SmallProduct"

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
          <SmallProduct key={product.id} product={product}/>
        ))}
      </div>
      <h5 className="flex mt-5 md:justify-end text-2xl tracking-tight font-bold text-slate-900">Total: {cartTotal}€</h5>
    </div>
  )
}
export default Cart
