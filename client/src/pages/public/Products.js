import React, { useEffect, useState } from 'react'
import { apiGetProducts } from '../../apis'
import { Pagination, ProductCard, ProductFilter, ProductSort } from '../../components'
import { useParams, useSearchParams } from 'react-router-dom'

const Products = () => {
    const [products, setProducts] = useState(null)
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
    console.log(search)
    const { type, optionid } = useParams()
    const fetchProducts = async (type, optionid) => {
        let response
        if (search) {
            response = await apiGetProducts({ title: search })
        } else {
            response = await apiGetProducts({ [type]: optionid })
        }
        if (response.counts !== 0) setProducts(response?.products)
        else setProducts(null)
    }

    useEffect(() => {
        fetchProducts(type, optionid)
    }, [search])

    return (
        <div className=' w-full lg:w-main px-[30px]'>
            {/* <Breadcrumb /> */}
            <div className='w-full flex sm:flex-col gap-3 py-4'>
                <div className=' flex-none'>
                    <ProductFilter />
                </div>
                {products ?
                    <div className=' flex-1 flex-col'>
                        <div className=' flex sm:flex-col justify-between'>
                            <div className=' text-2xl font-semibold '>Tất cả sản phẩm</div>
                            <ProductSort />
                        </div>
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
                    : <span className=' text-xl font-semibold'>{`Không có sản phẩm nào có  bạn cần tìm`}</span>
                    // : <span className=' text-xl font-semibold'>{`Không có sản phẩm nào có ${type} bạn cần tìm`}</span>
                }
            </div>
        </div>

    )
}
export default Products
