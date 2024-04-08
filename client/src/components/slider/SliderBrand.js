import React, { useState, useEffect } from 'react'
import { apiGetBrands } from '../../apis'
import { SliderIcon } from '../../components'

const SliderBrand = () => {
    const [Brands, setBrands] = useState([])
    const fetchBrands = async () => {
        const response = await apiGetBrands()
        if (response.success) setBrands(response.Brands)
        console.log(response.Brands[0].icon)
    }

    useEffect(() => {
        fetchBrands()
    }, [])

    return (
        <div>
            <SliderIcon
                data={Brands}
                column={5}
            />
        </div >
    )
}

export default SliderBrand
