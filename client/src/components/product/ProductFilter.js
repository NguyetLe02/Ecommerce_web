import React, { memo } from 'react'
import ProductFilterSelection from './ProductFilterSelection'
import { productFilter } from '../../ultils/contants'

const ProductFilter = () => {
    return (
        <div className=' w-full flex flex-col sm:grid grid-cols-2 gap-2'>
            <ProductFilterSelection
                label='Khoảng giá'
                items={productFilter.price}
            />
            <ProductFilterSelection
                label='Thương hiệu'
                items={productFilter.brand}
            />
            <ProductFilterSelection
                label='Loại trang phục'
                items={productFilter.category}
            />
            <ProductFilterSelection
                label='Màu sắc'
                items={productFilter.color}
            />
            <ProductFilterSelection
                label='Phong cách'
                items={productFilter.style}
            />
        </div>
    )
}

export default memo(ProductFilter)
