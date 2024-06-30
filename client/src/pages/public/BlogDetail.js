import React, { useState, useEffect } from "react";
import { Typography, Row, Col, message } from "antd";
import { CalendarOutlined, UserOutlined, LikeFilled, DislikeFilled } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { apiGetBlogById, apiLikeBlog, apiDislikeBlog } from "../../apis";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { BlogFilter } from "../../components";

const { Text, Paragraph } = Typography;

const BlogDetail = () => {
    const { currentUser } = useSelector(state => state.user);
    const { bid } = useParams();
    const [blogDetailData, setBlogDetailData] = useState();
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    useEffect(() => {
        const fetchBlogDataById = async () => {
            const data = await apiGetBlogById(bid);
            setBlogDetailData(data.Blogs);
            if (data.Blogs.likes.find(user => user._id === currentUser?._id)) {
                setLiked(true);
            }
            if (data.Blogs.dislikes.find(user => user._id === currentUser?._id)) {
                setDisliked(true);
            }
        };
        fetchBlogDataById();
    }, [bid]);

    const handleLike = async () => {
        try {
            await apiLikeBlog(bid);
            setLiked(!liked);
            if (disliked) setDisliked(false);
            message.success('Bạn đã thích bài viết này');
        } catch (error) {
            message.error('Lỗi');
        }
    };

    const handleDislike = async () => {
        try {
            await apiDislikeBlog(bid);
            setDisliked(!disliked);
            if (liked) setLiked(false);
            message.success('Bạn đã dislike bài viết');
        } catch (error) {
            message.error('Failed to dislike the blog');
        }
    };

    return (
        blogDetailData && (
            <div className="w-full lg:w-main px-[30px]">
                <div className="w-full flex sm:flex-col gap-3 py-4">
                    <div className="flex-none">
                        <BlogFilter />
                    </div>
                    <div className="flex-1 flex-col container px-4 gap-8">
                        <div className="text-2xl font-semibold mb-4">
                            {blogDetailData.title}
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <Text type="secondary">
                                <CalendarOutlined />{" "}
                                {format(new Date(blogDetailData.createdAt), "dd/MM/yyyy")} |{" "}
                                <UserOutlined /> {blogDetailData.author}
                            </Text>
                            <div className="flex justify-center items-center mt-4">
                                <LikeFilled
                                    onClick={handleLike}
                                    className={` ${liked ? 'text-main' : 'text-gray-400'} text-3xl mr-2`}
                                />
                                <DislikeFilled
                                    onClick={handleDislike}
                                    className={` ${disliked ? 'text-red-400' : 'text-gray-400'} text-3xl`}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <img
                                src={blogDetailData.image}
                                alt={blogDetailData.title}
                                className="w-full h-auto lg:w-1/2 mx-auto block"
                            />
                        </div>
                        <Paragraph>{blogDetailData.description}</Paragraph>
                    </div>
                </div>
            </div>
        )
    );
};

export default BlogDetail;
