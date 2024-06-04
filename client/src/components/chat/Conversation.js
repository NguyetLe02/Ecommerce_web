import React from 'react'

const Conversation = ({ isOwn }) => {
    return (
        <div>
            {!isOwn ?
                <div className=' flex flex-col'>
                    <div className=' flex gap-2'>
                        <img
                            src='https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/447286482_861742515988041_1791913826048366731_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeF7Wz2G5wsLDLafBuzh8v28r5iQn6fBUuGvmJCfp8FS4dlsm9Uk52CXaszO6MQtXqHj82Uq6alLwAcr6i-ZirWj&_nc_ohc=b7VgmwVNL2wQ7kNvgEUoXeA&_nc_ht=scontent.fhan15-1.fna&oh=00_AYDV5nPqc0YUgtkO6dix0PIB92UUJErpc_RTP3dpBS1H-A&oe=6664E405'
                            className=' rounded-full w-[50px] h-[50px]' />
                        <div className=' flex flex-col gap-2 items-end'>
                            <p className=' bg-gray-200 rounded-3xl p-2'>Theo tâm lý học,</p>
                            <div>1 hour ago</div>
                        </div>
                    </div>
                </div>
                :
                <div className=' flex flex-col items-end'>
                    <div className=' flex flex-col gap-2 items-end'>
                        <p className=' bg-sub text-white rounded-3xl p-2'>Theo tâm lý học,</p>
                        <div>1 hour ago</div>
                    </div>
                </div >
            }
        </div>
    )
}

export default Conversation
