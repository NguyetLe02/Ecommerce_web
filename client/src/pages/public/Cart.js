import React, { useState, useEffect } from 'react'
import { apiGetProducts } from '../../apis/product'

const Cart = () => {
    const [products, setProducts] = useState(null)
    const fetchProductData = async () => {
        const response = await apiGetProducts()
        if (response.success) {
            setProducts(response?.products)
        }
    }
    useEffect(() => {
        fetchProductData()
    }, [])
    return (
        <div className=' w-full lg:w-main px-[30px] pt-5'>
            <div>
                <h3 className=' text-2xl font-semibold'>Giỏ hàng</h3>
            </div>
            <table className=' w-full table-auto text-left pt-2'>
                <thead className=' m-2'>
                    <tr>
                        <th className=' py-2 px-4 w-1/6'> </th>
                        <th className=' py-2 px-4'>Thông tin chi tiết sản phẩm</th>
                        <th className=' py-2 px-4 w-1/6'>Đơn giá</th >
                        <th className=' py-2 px-4 w-1/6'>Số lượng</th >
                        <th className=' py-2 px-4 w-1/6'>Tổng giá</th >
                    </tr>
                </thead>
                <tbody>
                    {products?.map((el) => (
                        <tr key={el._id} className=' border-t border-primary-1'>
                            <td className=' py-2 px-4'>
                                <img src={el.images[0]} className='w-full' />
                            </td>
                            {/* <td className=' py-2 px-4'>
                                {editEl?._id === el._id
                                    ? <InputForm
                                        register={register}
                                        errors={errors}
                                        id={'email'}
                                        validate={{
                                            required: 'Require fill',
                                            pattern: {
                                                value: validateRegex.emailValidate.value,
                                                message: validateRegex.emailValidate.message
                                            }
                                        }}
                                        defaultValue={editEl?.email}
                                        fullWidth
                                    />
                                    : <span>{el.email}</span>}
                            </td>
                            <td className=' py-2 px-4'>{
                                editEl?._id === el._id
                                    ? <InputForm
                                        register={register}
                                        errors={errors}
                                        id={'firstname'}
                                        validate={{ required: 'Require fill' }}
                                        defaultValue={editEl?.firstname}
                                        fullWidth
                                    />
                                    : <span>{el.firstname}</span>
                            }</td>
                            <td className=' py-2 px-4'>{
                                editEl?._id === el._id
                                    ? <InputForm
                                        register={register}
                                        errors={errors}
                                        id={'lastname'}
                                        validate={{ required: 'Require fill' }}
                                        defaultValue={editEl?.lastname}
                                        fullWidth
                                    />
                                    : <span>{el.lastname}</span>
                            }</td>
                            <td className=' py-2 px-4'>{
                                editEl?._id === el._id
                                    ? <Select
                                        register={register}
                                        errors={errors}
                                        id={'role'}
                                        validate={{ required: 'Require fill' }}
                                        defaultValue={roles.find(role => +role.code === +editEl.role)?.value}
                                        options={roles}
                                        fullWidth
                                    />
                                    : <span>{roles.find(role => +role.code === +el.role)?.value}</span>
                            }</td>
                            <td className=' py-2 px-4'>{
                                editEl?._id === el._id
                                    ? <InputForm
                                        register={register}
                                        errors={errors}
                                        id={'mobile'}
                                        validate={{
                                            required: 'Require fill',
                                            pattern: {
                                                value: validateRegex.phoneValidate.value,
                                                message: validateRegex.phoneValidate.message
                                            }
                                        }}
                                        defaultValue={editEl?.mobile}
                                        fullWidth
                                    />
                                    : <span>{el.mobile}</span>
                            }</td>
                            <td className=' py-2 px-4'>{
                                editEl?._id === el._id
                                    ? <Select
                                        register={register}
                                        errors={errors}
                                        id={'isBlocked'}
                                        validate={{ required: 'Require fill' }}
                                        defaultValue={editEl?.isBlocked}
                                        options={blockStatus}
                                        fullWidth
                                    />
                                    : <span>{el.isBlocked ? 'Blocked' : 'Active'}</span>
                            }</td>
                            <td className=' py-2 px-4'>{moment(el.createdAt).format('l')}</td>
                            <td className=' py-2 px-4'>
                                <div className=' flex gap-3 justify-center'>
                                    {editEl?._id === el._id ? <div onClick={() => {
                                        setEditEl(null)
                                    }} className=' hover:cursor-pointer text-primary-1 hover:underline'>Back</div>
                                        : <div onClick={() => {
                                            setEditEl(el)
                                        }} className=' hover:cursor-pointer text-primary-1 hover:underline'>Edit</div>
                                    }
                                    <div onClick={() => handleDeleteUser(el._id)} className=' hover:cursor-pointer text-red-400 hover:underline'>Delete</div>
                                </div>

                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Cart
