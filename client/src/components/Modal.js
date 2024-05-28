import React from 'react'
import withBaseComponent from '../hocs/withBaseComponent'
import { showModal } from '../store/app/appSlice'

const Modal = ({ children, dispatch }) => {
    return (
        <div
            onClick={() => dispatch(showModal({ isShowModal: false, modalChildren: null }))}
            className=' fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center'
        >
            {children}
        </div>
    )
}

export default withBaseComponent(Modal)
