import React, { useState, useEffect } from 'react'
import { apiGetProduct } from '../../apis'
import { Button, ZoomImage, RatingStar, ChooseDate, InputQuantity, ProductInformation, SliderHotProducts } from '../../components'
import CurrencyFormat from 'react-currency-format';
import icons from '../../ultils/icons'
import moment from 'moment';
import { useParams } from 'react-router-dom'

const DetailProduct = () => {
    const { FaCartPlus } = icons
    const { pid } = useParams()
    const category = 'Đồ bộ'
    const [product, setProduct] = useState(null)
    const [showImage, setShowImage] = useState(null)
    const fetchProductData = async () => {
        const response = await apiGetProduct(pid)
        if (response.success) {
            setProduct(response.productData)
            setShowImage(response.productData.images[0])
        }
    }
    const title = product?.title
    useEffect(() => {
        if (pid) fetchProductData()
    }, [pid])
    return (
        <div className=' w-full lg:w-main px-[30px] pt-5'>
            <div className=' w-full h-full  sm:flex flex-col grid grid-cols-2 gap-3'>
                <div className='flex gap-3 z-10'>
                    <div className=' flex-none sm:hidden w-[80px] flex flex-col gap-3 overflow-y-auto max-h-[700px]'>
                        {product?.images?.map(el => (
                            <img key={el} onClick={() => setShowImage(el)} src={el} alt='sub-image' className='w-full object-cover' />
                        ))}
                    </div>
                    <div className=' flex-1 flex justify-center'>
                        <div className=' sm:w-[250px]'>
                            <ZoomImage image={showImage} />
                        </div>

                    </div>
                </div>
                <div className=' flex-1 flex flex-col gap-3 pl-4'>
                    <div className=' flex flex-col gap-3'>
                        {title && <h3 className=' font-bold text-3xl'>{title}</h3>}
                        <div className=' flex gap-3 text-sm'>
                            <span className=' border-r border-black pr-2'>Thương hiệu: {product?.brand}</span>
                            <span>Loại: {category}</span>
                        </div>
                        <div className=' flex items-start gap-2'>
                            <div>
                                <RatingStar value={product?.totalRatings} />
                            </div>
                            <div className=' text-sm'>{product?.ratings.length} đánh giá</div>
                        </div>
                    </div>
                    <div className=' py-2 border-black border-y text-3xl font-bold text-main'><CurrencyFormat value={product?.rentalPrice} displayType={'text'} thousandSeparator={true} suffix={' đ'} renderText={value => <div>{value}</div>} /></div>
                    <div className=' flex gap-3' >Giá hãng:  <div className=' font-semibold text-main'><CurrencyFormat value={product?.cost} displayType={'text'} thousandSeparator={true} suffix={' đ'} renderText={value => <div>{value}</div>} /></div></div>
                    <div className=' flex flex-col gap-3'>
                        <span>Kích thước</span>
                        <div className=' flex'>
                            <div>S</div>
                            <div>M</div>
                            <div>L</div>
                        </div>
                    </div>
                    {/* <div className=' flex flex-col gap-3'>
                        <span>Màu sắc</span>
                        <div className=' flex'>
                            <div>Trắng</div>
                            <div>Đen</div>
                            <div>Đỏ</div>
                        </div>
                    </div> */}
                    <div className='flex justify-between'>
                        <div className='flex flex-col'>
                            <span>Ngày bắt đầu thuê:</span>
                            <ChooseDate defaultValue={moment()} />
                        </div>
                        <div className='flex flex-col'>
                            <span>Ngày kết thúc thuê:</span>
                            <ChooseDate defaultValue={moment().add(5, 'days')} />
                        </div>
                    </div>
                    <div className=' flex flex-col'>
                        <span className='flex'>Hotline hỗ trợ: <span className=' font-semibold'>0984762214</span> </span>
                    </div>
                    <div className=' flex justify-between'>
                        <div className='flex flex-col'>
                            <span>Số lượng</span>
                            <InputQuantity />
                        </div>
                        <div className=' flex gap-3'>
                            <Button
                                iconsAfter={<FaCartPlus />}
                            />
                            <Button
                                name={'Thuê ngay'}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className=' py-4'>
                <ProductInformation />
            </div>
            <div className=' w-full m-auto py-6' >
                <h3 className=' text-xl font-semibold border-b-2 border-sub mb-2'>CÓ THỂ BẠN QUAN TÂM</h3>
                <SliderHotProducts />
            </div>
        </div >
    )
}

export default DetailProduct
