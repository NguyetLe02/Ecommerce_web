import React, { useEffect, useState } from 'react'
import { apiGetProducts } from '../../apis'
import { Breadcrumb, Pagination, ProductCard } from '../../components'

const Products = () => {
    const [products, setProducts] = useState(null)

    const fetchProducts = async () => {
        const response = await apiGetProducts()
        if (response.success) setProducts(response?.products)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className=' w-full lg:w-main px-[30px]'>
            {/* <Breadcrumb /> */}
            <div className='w-full flex sm:flex-col gap-3'>
                <div className=' flex-none'>
                    filter
                </div>
                <div className=' flex-1 flex-col'>
                    <div className=' text-2xl font-semibold py-4 '>Tất cả sản phẩm</div>
                    <div className=' grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3'>
                        {products?.map(product => (
                            <ProductCard productData={product} />
                        ))}
                    </div>
                    <div className=' italic '>
                        <Pagination
                            totalCount={products?.length}
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Products
