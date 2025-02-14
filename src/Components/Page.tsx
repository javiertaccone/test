import { useContext, useState } from "react"; 
import ProductsList from "./ProductsList";
import Cart from "./Cart";
import { ProductsContext } from "../App";

function Page() {
  const [activeTab, setActiveTab] = useState("products");
  const context = useContext(ProductsContext);
  
  const isCartEmpty = !context?.cart || context.cart.length === 0 || context.cart.every(product => product.stock === 0);

  return (
    <div className="h-screen">
      <div className="grid grid-cols-7 h-full">
        <div className={`
          ${activeTab === "products" ? "col-span-7" : "hidden"} 
          ${isCartEmpty ? "md:col-span-7 md:flex md justify-center" : "md:col-span-5"} 
          md:block
        `}>
          <ProductsList />
        </div>
        <div className={`
          ${activeTab === "cart" ? "col-span-7" : "hidden"} 
          ${isCartEmpty ? "md:hidden" : "md:col-span-2 md:block"}
        `}>
          <Cart />
        </div>
      </div>
      <button 
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full md:hidden"
        onClick={() => setActiveTab(activeTab === "products" ? "cart" : "products")}
      >
        {activeTab === "products" ? "🛒" : "📦"}
      </button>
    </div>
  );
}

export default Page;
