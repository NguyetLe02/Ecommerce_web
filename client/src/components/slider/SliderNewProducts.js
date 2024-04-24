import React, { useState, useEffect } from 'react'
import { apiGetProducts } from '../../apis'
import { ProductCard } from '..'

const SliderNewProducts = () => {
    const [newProducts, setNewProducts] = useState([])
    const fetchNewProducts = async () => {
        const response = await apiGetProducts({ sort: '-createdAt', limit: 8 })

        console.log(response)
        if (response.success) setNewProducts(response.products)
    }

    useEffect(() => {
        fetchNewProducts()
    }, [])

    return (
        <div className=' w-full'>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                {newProducts.map((product) => (
                    <ProductCard
                        productData={product}
                    />
                ))}

            </div >
        </div>
    )
}

export default SliderNewProducts
