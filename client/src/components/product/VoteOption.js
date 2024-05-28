import { Flex, Form, Rate } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button';
import TextArea from 'antd/es/input/TextArea';
import { apiGetProduct, apiRating } from '../../apis';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withBaseComponent from '../../hocs/withBaseComponent';
import { showModal } from '../../store/app/appSlice'

const VoteOption = ({ data, dispatch }) => {
    const modalRef = useRef()
    const [form] = Form.useForm();
    const [value, setValue] = useState(4);
    const desc = ['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];
    useEffect(() => {
        modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }, [])
    useEffect(() => {
        form.setFieldsValue({
            star: value,
        });
    }, [value]);

    const handleFinish = async (ratingData) => {
        try {
            const response = await apiRating(ratingData, data.product._id)
            if (response.success) {
                dispatch(showModal({ isShowModal: false }))
                Swal.fire('Đánh giá thành công', '', 'success')
            }
        } catch (err) {
            throw new Error(err)
        }
    }
    return (
        <div ref={modalRef} onClick={(e) => e.stopPropagation()} className=' w-[600px] h-[400px] bg-white rounded-lg'>
            <div className='px-6 py-4'>
                <div className=' w-full text-2xl font-semibold border-b p-4 pl-0'>Đánh giá sản phẩm</div>
                <div className=' flex pt-4 gap-4'>
                    <div className='col-span-4 w-full flex flex-col gap-4  '>
                        <div className=' flex flex-col'>
                            <span className=' font-semibold text-main text-xl'>{data?.product?.title}</span>
                            <span className='lg:text-base text-xs pb-2 font-normal'>{`${data?.product?.color} | ${data?.size}`}</span>
                        </div>
                        <div>
                            <Form
                                form={form}
                                onFinish={handleFinish}
                                style={{
                                    maxWidth: 400,
                                }}
                            >
                                <Form.Item name='star'>
                                    <Flex gap="middle" >
                                        <Rate tooltips={desc} onChange={setValue} value={value} />
                                    </Flex>
                                </Form.Item>
                                <Form.Item name='comment'>
                                    <TextArea rows={4} />
                                </Form.Item>
                                <Form.Item>
                                    <Button type='submit' name={'Đánh giá'} />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    <img alt='Ảnh' src={data?.product.images[0]} className='lg:col-span-2 col-span-1 w-[150px] h-[150px] text-center object-cover rounded-lg mx-auto lg:w-2/3' />
                </div>
            </div>
        </div>
    )
}

export default withBaseComponent(VoteOption)
