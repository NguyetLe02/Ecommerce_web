import React from 'react'
import { Banner } from '../../components'
import { useSelector } from 'react-redux'

const Home = () => {
    const { isLoggedIn, currentUser } = useSelector(state => state.user)
    // console.log(isLoggedIn, currentUser);
    return (
        <div className=' w-main px-[30px] flex flex-col gap-5'>
            <Banner />
            <div>
                Best seller
            </div>
        </div>
    )
}

export default Home
