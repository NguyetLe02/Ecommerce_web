import React from 'react'
import { Banner, SliderStyle, SliderProductCategory, SliderBrand } from '../../components'

const Home = () => {
    return (
        <div className=' w-full flex flex-col items-center'>
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
                    <div className='h-full flex justify-center items-center'>
                        <div className=' text-2xl font-semibold text-center bg-white absolute p-3'>Các mẫu nổi bật </div>
                        <div className=' w-full border border-black'> </div>
                    </div>
                    <div>
                        slide
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
