import { useState } from "react";
import ProductsList from "./ProductsList";
import Cart from "./Cart";

function Page() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="h-screen">
      <div className="grid grid-cols-7 h-full">
        <div className={`${activeTab === "products" ? "col-span-7" : "hidden"} md:col-span-5 md:block`}>
          <ProductsList />
        </div>
        <div className={`${activeTab === "cart" ? "col-span-7" : "hidden"} md:col-span-2 md:block`}>
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
