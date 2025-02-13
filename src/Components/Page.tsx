import ProductsList from "./ProductsList"
import Cart from "./Cart"

function Page() {
    return (
        <div className='grid grid-cols-7'>
            <div className='col-span-5'>
                <ProductsList />
            </div>
            <div className='col-span-2'>
                <Cart />
            </div>
        </div>
    )
}
export default Page