import React, { useState, useEffect } from 'react'
import { apiGetProducts } from '../../apis'
import { Banner, SliderStyle, SliderProductCategory, SliderBrand, SliderHotProducts } from '../../components'

const Home = () => {
    // const [hotProducts, setHotProducts] = useState(null)
    // const [newProducts, setNewProducts] = useState(null)

    // const fetchData = async () => {
    //     const response = await Promise.all([apiGetProducts({ sort: '-sold' }), apiGetProducts({ sort: '-createdAt' })])
    //     if (response[0]?.success) setHotProducts(response[0]?.products)
    //     if (response[1]?.success) setNewProducts(response[1]?.products)
    // }

    // useEffect(() => {
    //     fetchData()
    // }, [])

    return (
        <div className=' w-screen flex flex-col items-center'>
            <Banner />
            <div className='w-full lg:w-main px-[30px] flex flex-col gap-5 '>
                <div className=' flex flex-col gap-3'>
                    <div className=' text-center text-2xl pt-2 '>Brand</div>
                    <div>
                        <SliderBrand />
                    </div>
                </div>
                <div className='  h-full flex flex-col'>
                    <div className=' flex justify-center items-center'>
                        <div className=' text-2xl font-semibold text-center bg-white absolute p-3'>Mẫu mới nhất</div>
                        <div className=' w-full border border-black'> </div>
                    </div>
                    <div>Slider</div>
                </div>
                <div className=' flex flex-col gap-3'>
                    <div className=' text-center text-2xl pt-2'>Phong cách</div>
                    <div>
                        <SliderStyle />
                    </div>
                </div>
                <div className=' flex flex-col gap-3'>
                    <div className=' text-center text-2xl pt-2'>Loại đồ</div>
                    <div>
                        <SliderProductCategory />
                    </div>
                </div>
                <div className=' flex flex-col'>
                    <div className='h-full flex justify-center items-center pb-6'>
                        <div className=' text-2xl font-semibold text-center bg-white absolute p-3'>Các mẫu nổi bật </div>
                        <div className=' w-full border border-black'> </div>
                    </div>
                    <div>
                        <SliderHotProducts />
                    </div>
                </div>
                <div className=' flex flex-col'>
                    <div className='h-full flex justify-center items-center'>
                        <div className=' text-2xl font-semibold text-center bg-white absolute p-3'>Tin tức </div>
                        <div className=' w-full border border-black'> </div>
                    </div>
                    <div>
                        slide
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Home
