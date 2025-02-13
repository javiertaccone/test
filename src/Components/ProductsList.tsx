import Product from "./Product";
import { useContext, useEffect, useState, useRef, useMemo } from "react";
import { ProductsContext } from "../App.tsx";

function ProductsList() {
  const [filterFav, setFilterFav] = useState(false)
  const [visibleCount, setVisibleCount] = useState(12)
  const context = useContext(ProductsContext);
  const scrollTriggerRef = useRef(null)

  const filteredProducts = useMemo(() => {
    return (
      context?.products?.filter(
        (product) =>
          (!filterFav || product.favorite === "1") && product.stock > 0
      ) || []
    )
  }, [filterFav, context?.products])

  const visibleProducts = filteredProducts.slice(0, visibleCount)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 12)
        }
      },
      { rootMargin: "100px" }
    )

    const scrollTriggerElement = scrollTriggerRef.current;

    if (scrollTriggerElement) {
      observer.observe(scrollTriggerElement);
    }

    return () => {
      if (scrollTriggerElement) {
        observer.unobserve(scrollTriggerElement);
      }
    };

  }, [filteredProducts])

  return (
    <div className="m-8">
      <button onClick={() => setFilterFav(!filterFav)}
        className="rounded-md ml-3 bg-slate-900 w-35 mb-2 py-2 text-sm font-medium text-white hover:bg-gray-700">
        {filterFav ? "Mostrar Todos" : "Mostrar Favoritos"} 
      </button>
      <div className="flex flex-col items-end">
        <div className="grid grid-cols-4 gap-10 max-w-6xl ">
          {visibleProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <div ref={scrollTriggerRef} className="h-10"></div>
      </div >
    </div>
  );
}

export default ProductsList;
