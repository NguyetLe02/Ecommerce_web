import React, { useState, useEffect } from 'react'
import { apiGetStyle } from '../../apis'
import { SliderIcon } from '../../components'

const SliderStyle = () => {
    const [styles, setStyles] = useState([])
    const fetchStyles = async () => {
        const response = await apiGetStyle()
        if (response.success) setStyles(response.styles)
    }

    useEffect(() => {
        fetchStyles()
    }, [])

    return (
        <div>
            <SliderIcon
                data={styles}
                column={6}
                isTitle={true}
            />
        </div >
    )
}

export default SliderStyle
