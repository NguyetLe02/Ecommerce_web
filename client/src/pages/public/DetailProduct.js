import React, { useState, useEffect } from 'react'
import { apiGetProduct } from '../../apis'
import { Button, ZoomImage, RatingStar, ChooseDate, InputQuantity, ProductInformation, SliderHotProducts, ButtonAddToCart, StartDatePicker } from '../../components'
import CurrencyFormat from 'react-currency-format';
import icons from '../../ultils/icons'
import moment from 'moment';
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { DatePicker } from 'antd';
import { addDate, getDateFormat } from '../../ultils/helpers';

const DetailProduct = ({ data, isQuickView }) => {
    const { FaHeart } = icons
    const dateFormat = 'YYYY/MM/DD';
    const { pid } = useParams()
    if (!pid) pid = data
    const [selectProduct, setSelectProduct] = useState({
        product: {},
        size: null,
        startAt: null,
        endAt: null,
        quantity: 0
    })
    const [showImage, setShowImage] = useState(null)
    const fetchProductData = async () => {
        const response = await apiGetProduct(pid)
        if (response.success) {
            const productData = response.productData;
            setSelectProduct({
                product: productData,
                size: productData.type[0].size,
                startAt: dayjs().add(2, 'days'),
                endAt: dayjs().add(2, 'days'),
                quantity: 1
            });
            setShowImage(response.productData.images[0])
        }
    }
    const handleSelectSize = (size) => {
        const updatedProduct = {
            ...selectProduct,
            size: size
        };
        setSelectProduct(updatedProduct);
    };

    const handleChangeStartDate = (startDate) => {
        const updatedProduct = {
            ...selectProduct,
            startAt: startDate,
            endAt: startDate
        };
        setSelectProduct(updatedProduct);
    };
    const handleChangeEndDate = (endDate) => {
        const updatedProduct = {
            ...selectProduct,
            endAt: endDate
        };
        setSelectProduct(updatedProduct);
    };

    const handleChangeQuantity = (quantity) => {
        const updatedProduct = {
            ...selectProduct,
            quantity: quantity
        };
        setSelectProduct(updatedProduct);
    };
    // console.log(selectProduct.product.ratings.length)
    useEffect(() => {
        if (pid) fetchProductData()
    }, [pid])
    return (
        <div className=' w-full lg:w-main px-[30px] pt-5'>
            <div className=' w-full h-full  sm:flex flex-col grid grid-cols-2 gap-3'>
                <div className='flex gap-3 z-10'>
                    <div className=' flex-none sm:hidden w-[80px] flex flex-col gap-3 overflow-y-auto max-h-[700px]'>
                        {selectProduct?.product?.images?.map(el => (
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
                        <h3 className=' font-bold text-3xl'>{selectProduct?.product?.title}</h3>
                        <div className=' flex gap-3 text-sm'>
                            <span className=' border-r border-black pr-2'>Thương hiệu: {selectProduct?.product?.brand?.title}</span>
                            <span>Loại: {selectProduct?.product?.category?.title}</span>
                        </div>
                        <div className=' flex items-start gap-2'>
                            <div>
                                <RatingStar value={selectProduct?.product?.totalRatings} />
                            </div>
                            <div className=' text-sm'>{selectProduct?.product?.ratings?.length} đánh giá</div>
                        </div>
                    </div>
                    <div className=' py-2 border-black border-y text-3xl font-bold text-main'><CurrencyFormat value={selectProduct?.product?.rentalPrice} displayType={'text'} thousandSeparator={true} suffix={' đ'} renderText={value => <div>{value}</div>} /></div>
                    <div className=' flex gap-3' >Giá hãng:  <div className=' font-semibold text-main'><CurrencyFormat value={selectProduct?.product?.cost} displayType={'text'} thousandSeparator={true} suffix={' đ'} renderText={value => <div>{value}</div>} /> </div></div>
                    <div className=' flex flex-col gap-3'>
                        <span>Kích thước</span>
                        <div className=' flex gap-2'>
                            {selectProduct?.product?.type?.map(item =>
                                <div key={item._id}
                                    className={` rounded-full p-2 border border-main hover:bg-main flex items-center justify-center w-10 cursor-pointer ${selectProduct?.size === item.size ? 'bg-main' : ''}`}
                                    onClick={() => handleSelectSize(item.size)}
                                >
                                    {item.size}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='flex justify-between'>
                        <div className='flex flex-col'>
                            <span>Ngày bắt đầu thuê:</span>
                            {selectProduct?.startAt &&
                                <DatePicker
                                    format={dateFormat}
                                    value={dayjs(selectProduct?.startAt, dateFormat)}
                                    minDate={addDate(new Date(), 2, 'date')}
                                    onChange={handleChangeStartDate}
                                />

                            }
                        </div>
                        <div className='flex flex-col'>
                            <span>Ngày kết thúc thuê:</span>
                            {selectProduct?.endAt &&
                                <DatePicker
                                    format={dateFormat}
                                    value={dayjs(selectProduct?.endAt, dateFormat)}
                                    minDate={getDateFormat(selectProduct?.startAt)}
                                    maxDate={addDate(selectProduct?.startAt, 2, 'date')}
                                    onChange={handleChangeEndDate}
                                />
                            }
                        </div>
                    </div>
                    <div className=' flex flex-col'>
                        <span className='flex'>Hotline hỗ trợ: <span className=' font-semibold'>0984762214</span> </span>
                    </div>
                    <div className=' flex justify-between'>
                        <div className='flex flex-col'>
                            <span>Số lượng</span>
                            <InputQuantity defaultValue={selectProduct?.quantity} handleChangeQuantity={handleChangeQuantity} />
                        </div>
                        <div className=' flex gap-3'>
                            <Button
                                iconsAfter={<FaHeart />}
                            />
                            <ButtonAddToCart productData={selectProduct} />
                        </div>
                    </div>
                </div>
            </div>
            {!isQuickView &&
                <div>
                    <div className=' py-4'>
                        <ProductInformation totalRatings={selectProduct.product.totalRatings} totalCount={selectProduct?.product?.ratings?.length} ratings={selectProduct?.product?.ratings} />
                    </div>
                    <div className=' w-full m-auto py-6' >
                        <h3 className=' text-xl font-semibold border-b-2 border-sub mb-2'>CÓ THỂ BẠN QUAN TÂM</h3>
                        <SliderHotProducts />
                    </div>
                </div>
            }
        </div >
    )
}

export default DetailProduct
