import React, { useState, useEffect } from 'react'
import { apiGetProducts } from '../../apis'
import { ProductCard } from '../../components'
import Slider from 'react-slick'

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
};


const SliderHotProducts = () => {
    const [hotProducts, setHotProducts] = useState([])
    const fetchhotProducts = async () => {
        const response = await apiGetProducts({ sort: '-sold' })
        if (response.success) setHotProducts(response.products)
        // console.log(response.hotProducts[0].icon)
        // console.log(hotProducts)
    }

    useEffect(() => {
        fetchhotProducts()
    }, [])

    return (
        <div>
            <Slider {...settings}>
                {hotProducts.map((product) => (
                    <ProductCard
                        key={product._id}
                        productData={product}
                    />
                ))}
            </Slider>
        </div >
    )
}

export default SliderHotProducts
