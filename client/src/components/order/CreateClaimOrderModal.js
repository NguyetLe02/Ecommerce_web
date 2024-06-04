import { Form, Image } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent';
import { showModal } from '../../store/app/appSlice'
import TextArea from 'antd/es/input/TextArea';
import { UploadClaimImage, Button } from '../../components'
import { apiCreateOrderClaim } from '../../apis';
import Swal from 'sweetalert2';

const CreateClaimOrderModal = ({ orderData, dispatch }) => {
    const modalRef = useRef()
    const [form] = Form.useForm()
    const [uploadedImages, setUploadedImages] = useState([]);
    const handleImageUpload = (images) => {
        setUploadedImages(images);
    };
    useEffect(() => {
        modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }, [])

    useEffect(() => {
        form.setFieldsValue({
            images: uploadedImages
        });
    }, [uploadedImages])

    const handleCreateClaim = async (value) => {
        const type = orderData.status === 'Sent' ? 'ProductIssue' : 'Damage'
        const updatedValue = {
            ...value, type: type
        }
        const formData = new FormData()
        for (const [key, value] of Object.entries(updatedValue)) {
            if (key === 'images') for (let i = 0; i < value.length; i++) {
                const file = value[i]
                formData.append('images', file)
            } else { formData.append(key, value) }
        }
        const response = await apiCreateOrderClaim(formData, orderData._id)
        if (response.success) {
            dispatch(showModal({ isShowModal: false }))
            Swal.fire('Gửi báo cáo thành công', '', 'success')
            window.location.reload()
        }
    }
    return (
        <div ref={modalRef} onClick={(e) => e.stopPropagation()} className=' w-[600px] h-fit bg-white rounded-lg'>
            <div className='px-6 py-4'>
                <div className=' w-full text-2xl font-semibold border-b p-4 pl-0'>
                    {orderData.status === 'Sent' ?
                        <div>KHIẾU NẠI</div> :
                        <div>SỰ CỐ</div>}
                </div>
                <div className=' flex flex-col pt-4 gap-4'>
                    <div className=' flex justify-between items-start'>
                        <div className=' flex flex-col'>
                            <span className=' font-semibold text-main text-xl'>{orderData?.product?.title}</span>
                            <span className='lg:text-base text-xs pb-2 font-normal'>{`${orderData?.product?.color} | ${orderData?.size}`}</span>
                        </div>
                    </div>
                    <Form
                        form={form}
                        onFinish={handleCreateClaim}
                        layout="vertical"
                    >
                        <Form.Item name='description' label='Vấn đề'>
                            <TextArea name='description' required />
                        </Form.Item>
                        <Form.Item label='Hình ảnh' name='images'>
                            <UploadClaimImage onImageUpload={handleImageUpload} />
                        </Form.Item>
                        <Form.Item>
                            <div className=' flex gap-4'>
                                <Button
                                    name={'Gửi báo cáo'}
                                    type='submit'
                                />
                                <Button
                                    name={'Thoát'}
                                    style={'px-4 py-2 rounded-md bg-gray-200 font-semibold'}
                                    handleOnclick={() => dispatch(showModal({ isShowModal: false }))}
                                />
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default withBaseComponent(CreateClaimOrderModal)
