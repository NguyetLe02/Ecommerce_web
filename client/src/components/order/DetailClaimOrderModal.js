import { Image } from 'antd'
import React, { useEffect, useRef } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent';
import { showModal } from '../../store/app/appSlice'

const DetailClaimOrderModal = ({ orderClaimData, orderData, dispatch }) => {
    const modalRef = useRef()
    useEffect(() => {
        modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }, [])
    return (
        <div ref={modalRef} onClick={(e) => e.stopPropagation()} className=' w-[600px] h-fit bg-white rounded-lg pb-8'>
            <div className='px-6 py-4'>
                <div className=' w-full text-2xl font-semibold border-b p-4 pl-0'>
                    {orderClaimData.type === 'ProductIssue' ?
                        <div>CHI TIẾT KHIẾU NẠI</div> :
                        <div>CHI TIẾT SỰ CỐ</div>}
                </div>
                <div className=' flex flex-col pt-4 gap-4'>
                    <div className=' flex justify-between items-start'>
                        <div className=' flex flex-col'>
                            <span className=' font-semibold text-main text-xl'>{orderData?.product?.title}</span>
                            <span className='lg:text-base text-xs pb-2 font-normal'>{`${orderData?.product?.color} | ${orderData?.size}`}</span>
                        </div>
                        <div className=' flex col-span-2 text-main text-xl justify-end font-semibold'>
                            {orderClaimData.status === 'Pending' ? 'ĐANG XỬ LÝ' : 'ĐÃ XỬ LÝ'}
                        </div>
                    </div>
                    <div className=' flex gap-4 '>
                        <div className=' font-semibold'>Vấn đề:</div>
                        <div>{orderClaimData.description}</div>
                    </div>
                    <div className=' flex flex-col gap-4'>
                        <div className=' font-semibold'>Hình ảnh:</div>
                        <div className=' grid grid-cols-3 grid-flow-row gap-4'>
                            {orderClaimData.images.map(el =>
                                <Image
                                    width={150}
                                    height={150}
                                    style={{ borderRadius: '8px' }}
                                    src={el}
                                />
                            )}
                        </div>
                    </div>
                    {orderClaimData.status === 'Resolved' &&
                        <div className=' flex  flex-col gap-4 bg-main rounded'>
                            <div className=' font-semibold flex-1 flex'>Phản hồi của shop:</div>
                            {orderClaimData.response.decision === 'None' ?
                                <div>Không sao bạn nhé !</div>
                                : orderClaimData.response.decision === 'Compensation' ?
                                    <div>Phí hư tổn được tính bằng <span className=' font-semibold text-main text-xl'>{` ${orderClaimData.response.amount}% `}</span>giá thuê.</div>
                                    : <div>Shop rất xin lỗi vì trải nghiệm không tốt này. Shop gửi bạn voucher giảm <span className=' font-semibold text-main text-xl'>{` ${orderClaimData.response.amount}% `}</span>giá thuê.</div>
                            }
                        </div>
                    }



                </div>
            </div>
        </div>
    )
}

export default withBaseComponent(DetailClaimOrderModal)
