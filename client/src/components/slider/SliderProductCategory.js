import React, { useState, useEffect } from 'react'
import { apiGetProductCategories } from '../../apis'
import { SliderIcon } from '../../components'
import { useSelector } from 'react-redux'

const SliderProductCategory = () => {
    // const { productCategories } = useSelector(state => state.app)
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
                type={'category'}
            />
        </div >
    )
}

export default SliderProductCategory
