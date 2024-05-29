import React, { memo, useState } from 'react'
import { productInforTabs } from '../../ultils/contants'
import { Votebar, RatingStar, Comment } from '../../components'

const ProductInformation = ({ totalRatings, totalCount, ratings }) => {
    const [activeTab, setActiveTab] = useState(1)
    return (
        <div>
            <div className=' flex items-center gap-2'>
                {productInforTabs.map(el => (
                    <span
                        key={el.id}
                        onClick={() => setActiveTab(el.id)}
                        className={` bg-main border-b-white  font-semibold p-2 cursor-pointer rounded-t-md ${activeTab === el.id && ' bg-sub text-white'}`}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className={`w-full h-full px-4 pt-4 pb-6 border border-sub rounded-lg ${activeTab === 1 && 'rounded-tl-none'}`}>
                {activeTab === 2 &&
                    <div className=' flex flex-col'>
                        <div className=' flex'>
                            <div className=' w-2/5 border-r-2 border-sub flex flex-col items-center justify-center'>
                                <span className=' text-4xl font-semibold'>{`${totalRatings}  / 5`}</span>
                                <RatingStar value={totalRatings} />
                                <div>{`${totalCount} đánh giá`}</div>
                            </div>
                            <div className=' w-3/5 pl-4 py-2 flex flex-col gap-1'>
                                {Array.from(Array(5).keys()).reverse().map(el => (
                                    <Votebar
                                        key={el}
                                        number={el + 1}

                                        ratingCount={ratings.reduce((ratingCount, rating) => {
                                            if (rating.star === el + 1) return ratingCount + 1;
                                            return ratingCount;
                                        }, 0)}
                                        ratingTotal={5}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className=' flex flex-col gap-6'>
                            {ratings && ratings?.map(rating => (
                                <Comment rating={rating} />
                            ))}
                        </div>
                    </div>
                }
                {activeTab === 1 &&
                    <div>{productInforTabs[0].content}</div>
                }
            </div>
        </div>
    )
}

export default memo(ProductInformation)
