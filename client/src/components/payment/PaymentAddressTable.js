import React, { useEffect } from 'react'
import InputForm from '../input/InputForm'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

const PaymentAddressTable = ({ setAddress }) => {
    const { register, formState: { errors }, watch, setValue } = useForm()
    const { currentUser } = useSelector(state => state.user)
    const address = watch('address')
    useEffect(() => {
        setValue('address', currentUser?.address)
    }, [currentUser])
    setAddress(address)
    return (
        <div className=' w-full '>
            <InputForm
                label={'Địa chỉ giao hàng:'}
                register={register}
                errors={errors}
                id={'address'}
                validate={{
                    required: 'Bạn cần điền địa chỉ'
                }}
                placeholder={'Hãy nhập địa chỉ của bạn'}
            />
        </div>
    )
}

export default PaymentAddressTable
