import React, { useState, useEffect } from 'react'
import { apiGetProductCategories } from '../../apis'
import { SliderIcon } from '../../components'

const SliderProductCategory = () => {
    const [productCategories, setProductCategories] = useState([])
    const fetchProductCategories = async () => {
        const response = await apiGetProductCategories()
        if (response.success) setProductCategories(response.productCategories)
    }

    useEffect(() => {
        fetchProductCategories()
    }, [])

    return (
        <div>
            <SliderIcon
                data={productCategories}
                column={6}
                isTitle={true}
            />
        </div >
    )
}

export default SliderProductCategory
