import React from 'react'

const SelectOption = ({ icon }) => {
    return (
        <div className=' h-12 w-12 bg-sub rounded-3xl shadow-lg flex items-center justify-center text-white font-medium hover:cursor-pointer'>
            <div className=' w-full px-1 flex items-center justify-center'>{icon}</div>
        </div>
    )
}

export default SelectOption
