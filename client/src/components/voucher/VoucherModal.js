import React, { useEffect, useRef, useState } from 'react'
import { Radio } from 'antd'
import Button from '../Button';
import { apiGetUsableVouchers } from '../../apis';
import Swal from 'sweetalert2';
import withBaseComponent from '../../hocs/withBaseComponent';
import { showModal } from '../../store/app/appSlice'
import VoucherItem from './VoucherItem';
import { useSelector } from 'react-redux';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';

const VoucherModal = ({ data, dispatch, onVoucherSelect }) => {
    const [vouchers, setVouchers] = useState([]);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const modalRef = useRef();
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
        fetchVouchers();
    }, []);

    const fetchVouchers = async () => {
        const response = await apiGetUsableVouchers();
        if (response.success) setVouchers(response.Vouchers);
    }

    const handleSelectVoucher = (e) => {
        setSelectedVoucher(vouchers.find(voucher => voucher._id === e.target.value));
    }

    const handleConfirm = () => {
        if (selectedVoucher) {
            onVoucherSelect(selectedVoucher);
            dispatch(showModal({ isShowModal: false }));
        } else {
            Swal.fire('Vui lòng chọn một voucher', '', 'warning');
        }
    }

    return (
        <div ref={modalRef} onClick={(e) => e.stopPropagation()} className='w-[600px] h-[700px] bg-white rounded-lg'>
            <div className='px-6 py-4'>
                <div className=' flex justify-between'>
                    <div className=' w-2/3 text-2xl font-semibold border-b p-4 pl-0'>Chọn Voucher</div>
                    <div className=' flex items-center gap-2'>
                        <div>Xu của bạn: </div>
                        <div className=' flex justify-center items-center gap-2 font-semibold'>
                            <div>{currentUser?.point}</div>
                            <RiMoneyDollarCircleFill className=' text-yellow-500' />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col py-4 gap-4 overflow-auto'>
                    <Radio.Group onChange={handleSelectVoucher} value={selectedVoucher?._id} className='w-full h-[500px] overflow-y-auto'>
                        {vouchers?.map(voucher =>
                            <VoucherItem key={voucher._id} data={voucher} />
                        )}
                    </Radio.Group>
                </div>
                <div className='flex gap-4'>
                    <Button
                        name={'Chọn'}
                        handleOnclick={handleConfirm}
                    />
                    <Button
                        name={'Thoát'}
                        style={'px-4 py-2 rounded-md bg-gray-200 font-semibold'}
                        handleOnclick={() => dispatch(showModal({ isShowModal: false }))}
                    />
                </div>
            </div>
        </div>
    )
}

export default withBaseComponent(VoucherModal);
