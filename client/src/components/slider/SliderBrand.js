import React, { useState, useEffect } from 'react'
import { apiGetBrands } from '../../apis'
import { SliderIcon } from '../../components'

const SliderBrand = () => {
    const [Brands, setBrands] = useState([])
    const fetchBrands = async () => {
        const response = await apiGetBrands()
        if (response.success) setBrands(response.Brands)
    }

    useEffect(() => {
        fetchBrands()
    }, [])

    return (
        <div>
            <SliderIcon
                data={Brands}
                column={5}
                type={'brand'}
            />
        </div >
    )
}

export default SliderBrand
