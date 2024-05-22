import React, { useEffect, useState } from 'react'
import { apiGetProducts } from '../../apis'
import { Pagination, ProductCard, ProductFilter, ProductSort } from '../../components'
import { useParams, useSearchParams } from 'react-router-dom'

const Products = () => {
    const [products, setProducts] = useState(null)
    const [params] = useSearchParams();
    const [sortedProducts, setSortedProducts] = useState(null)
    const { type, optionid } = useParams()
    const fetchProducts = async (queries) => {
        const response = await apiGetProducts(queries)
        if (response.counts !== 0) {
            setProducts(response?.products)
            setSortedProducts(response?.products)
        }
        else setProducts(null)
    }

    useEffect(() => {
        let param = []
        for (let i of params.entries()) param.push(i)
        const queries = {}
        for (let i of params) queries[i[0]] = i[1]
        if (type && optionid) queries[type] = optionid
        queries['sort'] = '-createdAt'
        fetchProducts(queries)
    }, [params])

    const sortProductsLowToHigh = () => {
        const sorted = [...products].sort((a, b) => a.rentalPrice - b.rentalPrice);
        console.log(sorted)
        setSortedProducts(sorted);
    };

    const sortProductsHighToLow = () => {
        const sorted = [...products].sort((a, b) => b.rentalPrice - a.rentalPrice);
        setSortedProducts(sorted);
    };

    return (
        <div className=' w-full lg:w-main px-[30px]'>
            <div className='w-full flex sm:flex-col gap-3 py-4'>
                <div className=' flex-none'>
                    <ProductFilter />
                </div>
                {products ?
                    <div className=' flex-1 flex-col'>
                        <div className=' flex sm:flex-col justify-between'>
                            <div className=' text-2xl font-semibold '>Tất cả sản phẩm</div>
                            <ProductSort
                                sortLowToHigh={sortProductsLowToHigh}
                                sortHighToLow={sortProductsHighToLow}
                            />
                        </div>
                        <div className=' grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3'>
                            {sortedProducts?.map(product => (
                                <ProductCard
                                    key={product._id}
                                    productData={product} />
                            ))}
                        </div>
                        <div className=' italic '>
                            <Pagination
                                totalCount={products?.length}
                            />
                        </div>
                    </div>
                    : <span className=' text-xl font-semibold'>{`Không có sản phẩm nào có  bạn cần tìm`}</span>
                    // : <span className=' text-xl font-semibold'>{`Không có sản phẩm nào có ${type} bạn cần tìm`}</span>
                }
            </div>
        </div>

    )
}
export default Products
