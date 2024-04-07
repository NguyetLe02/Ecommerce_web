import React from 'react'
import { Banner } from '../../components'
import { useSelector } from 'react-redux'
import { DetailProduct } from '../public'

const Home = () => {
    const { isLoggedIn, currentUser } = useSelector(state => state.user)
    console.log(isLoggedIn, currentUser);
    console.log(currentUser?.role)
    return (
        <div className='w-full px-[30px] flex flex-col gap-5 '>
            <Banner />
            <div>Brand</div>
            <div className='  h-full flex justify-center items-center'>
                <div className=' text-2xl font-semibold text-center bg-white absolute p-3'>Mẫu mới nhất</div>
                <div className=' w-full border border-black'> </div>
            </div>
            <div>Mặc vào dịp</div>
            <div>Phong cách</div>
            <div>Loại đồ</div>
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
    )
}

export default Home
