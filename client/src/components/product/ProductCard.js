import React, { useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { SelectOption } from '../../components'
import icons from '../../ultils/icons'
import { Link } from 'react-router-dom'
import path from '../../ultils/path'

const { FaEye, FaCartPlus } = icons
const ProductCard = ({ productData }) => {
    const [isShowOptions, setIsShowOptions] = useState(false)
    return (
        <div className=' w-full px-1'>
            <Link
                to={`/${path.PRODUCTS}/detail/${productData?._id}/${productData?.slug}`}
                className=' w-full p-2 hover:border hover:shadow-lg rounded-2xl flex flex-col justify-between'
                onMouseEnter={e => {
                    e.stopPropagation();
                    setIsShowOptions(true);
                }}
                onMouseLeave={e => {
                    e.stopPropagation();
                    setIsShowOptions(false);
                }}
            >
                <div className=' flex flex-col relative items-center'>
                    <img src={isShowOptions ? productData?.images[1] : productData?.images[0] || 'https://static.thenounproject.com/png/1077596-200.png'} alt='' className=' object-cover rounded-[12px]' />
                    {isShowOptions &&
                        <div className=' h-10 absolute bottom-5 flex gap-1 justify-center items-center animate-slide-top'>
                            <SelectOption icon={<FaEye />} />
                            <SelectOption icon={'Thuê'} />
                            <SelectOption icon={<FaCartPlus />} />
                        </div>
                    }
                </div>
                <div className=' flex flex-col py-1'>
                    <div className=' line-clamp-1 font-semibold'> {productData?.title}</div>
                    <div className='  font-bold text-main'><CurrencyFormat value={productData?.rentalPrice} displayType={'text'} thousandSeparator={true} suffix={' đ'} renderText={value => <div>{value}</div>} /></div>
                </div>
            </Link>
        </div>
    )
}

export default ProductCard
