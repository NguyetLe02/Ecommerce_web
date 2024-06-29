import React, { memo, useEffect, useState } from 'react'
import { Checkbox } from "antd";
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import clsx from 'clsx'
import { createSearchParams, useNavigate } from 'react-router-dom';

const ProductFilterSelection = ({ label, items, selected, setSelected }) => {
    const [isShow, setIsShow] = useState(true)
    // const navigate = useNavigate()
    const handleSeleted = (e) => {
        const value = e.target.value;
        if (label === 'Màu sắc') {
            setSelected(prev => {
                const colorCopy = [...prev.color];
                const alreadyElIndex = colorCopy.findIndex(el => el === value);
                if (alreadyElIndex !== -1) {
                    colorCopy.splice(alreadyElIndex, 1);
                } else {
                    colorCopy.push(value);
                }
                return { ...prev, color: colorCopy };
            })
        }
        else if (label === 'Khoảng giá') {
            setSelected(prev => {
                const priceCopy = [...prev.price];
                const alreadyElIndex = priceCopy.findIndex(el => (el.value === value))
                if (alreadyElIndex !== -1) {
                    priceCopy.splice(alreadyElIndex, 1);
                } else {
                    if (value === 'Từ 0đ - 300,000đ') priceCopy.push({ value, from: 0, to: 300000 });
                    if (value === 'Từ 300,000đ - 600,000đ') priceCopy.push({ value, from: 300000, to: 600000 });
                    if (value === 'Từ 600,000đ - 1,000,000đ') priceCopy.push({ value, from: 600000, to: 1000000 });
                    if (value === 'Trên 1,000,000đ') priceCopy.push({ value, from: 1000000 });
                }
                return { ...prev, price: priceCopy };
            })
        } else if (label === 'Thương hiệu') {
            setSelected(prev => {
                const brandCopy = [...prev.brand];
                const alreadyElIndex = brandCopy.findIndex(el => el === value);
                if (alreadyElIndex !== -1) {
                    brandCopy.splice(alreadyElIndex, 1);
                } else {
                    brandCopy.push(value);
                }
                return { ...prev, brand: brandCopy };
            })
        } else if (label === 'Loại trang phục') {
            setSelected(prev => {
                const typeCopy = [...prev.type];
                const alreadyElIndex = typeCopy.findIndex(el => el === value);
                if (alreadyElIndex !== -1) {
                    typeCopy.splice(alreadyElIndex, 1);
                } else {
                    typeCopy.push(value);
                }
                return { ...prev, type: typeCopy };
            })
        } else if (label === 'Phong cách') {
            setSelected(prev => {
                const styleCopy = [...prev.styles];
                const alreadyElIndex = styleCopy.findIndex(el => el === value);
                if (alreadyElIndex !== -1) {
                    styleCopy.splice(alreadyElIndex, 1);
                } else {
                    styleCopy.push(value);
                }
                return { ...prev, styles: styleCopy };
            })
        }
    }
    // useEffect(() => {
    //     if (selected.color.length > 0) {
    //         navigate({
    //             search: createSearchParams(
    //                 { color: selected.color.join(',') }
    //             ).toString()
    //         })
    //     } else if (selected.price.length > 0) {
    //         navigate({
    //             search: createSearchParams(
    //                 { price: selected.price.join(',') }
    //             ).toString()
    //         })
    //     } else {
    //         navigate('/products')
    //     }
    // }, [selected])

    return (
        <div className=' w-full h-full flex flex-col'>
            <div className={clsx(` flex bg-sub text-white text-xl font-semibold justify-between p-2 rounded-t-lg`, !isShow && ` rounded-lg`)}>
                <span>{label}</span>
                <div onClick={() => setIsShow(!isShow)}>
                    {isShow ? <DownOutlined /> : <UpOutlined />}
                </div>
            </div>
            {isShow &&
                <div className={`flex flex-col border rounded-b-lg p-2`}>
                    {Object.values(items).map(item => (
                        <div className=' flex gap-2 '>
                            <Checkbox
                                onClick={handleSeleted}
                                value={item}
                            />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default memo(ProductFilterSelection)
