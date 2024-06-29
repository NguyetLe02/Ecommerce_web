import { Image, Input, Radio } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent';
import Button from '../Button';
import { Form } from 'antd';
import { apiUpdateOrderClaim } from '../../apis';
import { toast } from 'react-toastify';

const DetailClaimOrderModal = ({ orderClaimData, orderData, dispatch, isAdmin }) => {
    const [showResponseForm, setShowResponseForm] = useState(false);
    const [formData, setFormData] = useState({ decision: '', amount: 0 });
    const modalRef = useRef()
    useEffect(() => {
        modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }, [])

    const handleRespondClick = () => {
        setShowResponseForm(true);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, clid: orderClaimData._id, amount: e.target.value });
    };

    const handleRadioChange = (e) => {
        setFormData({ ...formData, decision: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await apiUpdateOrderClaim(formData, orderData._id)
            if (response.success) {
                toast.success('Bạn đã phản hồi thành công!')
                window.location.reload()
            }
        } catch (err) {
            toast.error('Phản hồi không thành công!')
        }
        setShowResponseForm(false);
    };
    return (
        <div ref={modalRef} onClick={(e) => e.stopPropagation()} className=' w-[600px] h-fit bg-white rounded-lg pb-8'>
            <div className='px-6 py-4'>
                <div className=' w-full text-2xl font-semibold border-b p-4 pl-0'>
                    {orderClaimData?.type === 'ProductIssue' ?
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
                            {orderClaimData?.status === 'Pending' ?
                                isAdmin ?
                                    <Button
                                        name='Phản hồi'
                                        type="primary"
                                        handleOnclick={handleRespondClick}
                                    />
                                    : 'ĐANG XỬ LÝ'
                                : 'ĐÃ XỬ LÝ'}
                        </div>
                    </div>
                    <div className=' flex gap-4 '>
                        <div className=' font-semibold'>Vấn đề:</div>
                        <div>{orderClaimData?.description}</div>
                    </div>
                    <div className=' flex flex-col gap-4'>
                        <div className=' font-semibold'>Hình ảnh:</div>
                        <div className=' grid grid-cols-3 grid-flow-row gap-4'>
                            {orderClaimData?.images.map(el =>
                                <Image
                                    width={150}
                                    height={150}
                                    style={{ borderRadius: '8px' }}
                                    src={el}
                                />
                            )}
                        </div>
                    </div>
                    {orderClaimData?.status === 'Resolved' &&
                        <div className=' flex  flex-col gap-4 bg-main rounded'>
                            <div className=' font-semibold flex-1 flex'>Phản hồi của shop:</div>
                            {orderClaimData?.response.decision === 'None' ?
                                <div>Không sao bạn nhé !</div>
                                : orderClaimData?.response.decision === 'Compensation' ?
                                    <div>Phí hư tổn được tính bằng <span className=' font-semibold text-main text-xl'>{` ${orderClaimData?.response.amount}% `}</span>giá thuê.</div>
                                    : <div>Shop rất xin lỗi vì trải nghiệm không tốt này. Shop gửi bạn voucher giảm <span className=' font-semibold text-main text-xl'>{` ${orderClaimData?.response.amount}% `}</span>giá thuê.</div>
                            }
                        </div>
                    }
                    {showResponseForm && (
                        <Form className='flex flex-col gap-4 bg-gray-100 p-4 rounded'>
                            <div className=' font-semibold'>Phản hồi:</div>
                            <Radio.Group onChange={handleRadioChange}>
                                <Radio value='None'>Từ chối yêu cầu</Radio>
                                {orderClaimData?.type !== 'ProductIssue' ?
                                    <Radio value='Compensation'>Bồi thường (%)</Radio> :
                                    <Radio value='Discount'>Giảm giá (%)</Radio>
                                }
                            </Radio.Group>
                            {(formData.decision === 'Compensation' || formData.decision === 'Discount') && (
                                <Input
                                    type='number'
                                    placeholder='Nhập phần trăm'
                                    onChange={handleInputChange}
                                    value={formData.amount}
                                />
                            )}
                            <Button
                                name='Xác nhận'
                                type="primary"
                                handleOnclick={handleSubmit}
                            />
                        </Form>
                    )}



                </div>
            </div>
        </div>
    )
}

export default withBaseComponent(DetailClaimOrderModal)
