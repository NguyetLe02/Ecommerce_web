import React from 'react'
import ReactImageMagnify from 'react-image-magnify';

const ZoomImage = ({ image }) => {
    return (
        <ReactImageMagnify {...{
            smallImage: {
                isFluidWidth: true,
                src: image,
            },
            largeImage: {
                src: image,
                width: 1200,
                height: 1400
            }
        }} />
    )
}

export default ZoomImage
