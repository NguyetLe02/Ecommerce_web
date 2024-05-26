import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Flex, message, Tooltip, Upload } from 'antd';
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
const AvatarUpload = ({ image, handleImageChange }) => {
    // const [loading, setLoading] = useState(false);
    // const [imageUrl, setImageUrl] = useState();
    // const handleChange = (info) => {
    //     if (info.file.status === 'uploading') {
    //         setLoading(true);
    //         return;
    //     }
    //     if (info.file.status === 'done') {
    //         // Get this url from response in real world.
    //         getBase64(info.file.originFileObj, (url) => {
    //             setLoading(false);
    //             setImageUrl(url);
    //         });
    //     }
    // };
    // const uploadButton = (
    //     <button
    //         style={{
    //             border: 0,
    //             background: 'none',
    //         }}
    //         type="button"
    //     >
    //         {loading ? <LoadingOutlined /> : <PlusOutlined />}
    //         <div
    //             style={{
    //                 marginTop: 8,
    //             }}
    //         >
    //             Upload
    //         </div>
    //     </button>
    // );
    return (
        <Upload
            onChange={handleImageChange}
            name="avatar"
            className="avatar-uploader"
            listType="picture-circle"
            showUploadList={false}
            multiple={true}
        >
            {image ? (
                <Tooltip title="change">
                    <Avatar src={image} style={{ width: '100%', height: '100%' }} />
                </Tooltip>
            ) : (
                <button style={{ border: 0, background: 'none' }} type="button">
                    <div style={{ marginTop: '8rem' }}>Upload</div>
                </button>
            )}
        </Upload>
    );
};
export default AvatarUpload;