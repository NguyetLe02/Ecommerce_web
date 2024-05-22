import { Table } from 'antd'
import moment from 'moment';
import React, { memo } from 'react'
import CurrencyFormat from 'react-currency-format';

const columns = [
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Ngày thuê',
        dataIndex: 'startAt',
        key: 'startAt',
    },
    {
        title: 'Ngày trả',
        dataIndex: 'endAt',
        key: 'endAt',
    },
    {
        title: 'Tiền cọc',
        dataIndex: 'cost',
        key: 'cost',
    }
];

const PaymentTable = ({ data }) => {
    const modifiedData = data.map(item => ({
        ...item,
        name: item.product.title,
        startAt: moment(item.startAt).format('YYYY/MM/DD'),
        endAt: moment(item.endAt).format('YYYY/MM/DD'),
        cost: <CurrencyFormat value={item.product.cost * item.quantity} displayType={'text'} thousandSeparator={true} suffix={' đ'} renderText={value => <div>{value}</div>} />
    }));

    return (
        <div className=' w-full'>
            <Table columns={columns} dataSource={modifiedData} />
        </div>
    )
}

export default memo(PaymentTable)
