import React, { useState, useEffect } from "react";
import { Typography, Row, Col } from "antd";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { apiGetBlogById } from "../../apis";
import { format } from "date-fns";

const { Title, Text, Paragraph } = Typography;

const BlogDetail = () => {
    const { id } = useParams();
    const [blogDetailData, setBlogDetailData] = useState();
    useEffect(() => {
        const fetchBlogDataById = async () => {
            const data = await apiGetBlogById(id);
            setBlogDetailData(data.Blogs);
        };
        fetchBlogDataById();
    }, [id]);
    return (
        blogDetailData && (
            <div className="container mx-auto px-4 py-8">
                <Title level={2} className="text-center mb-8">
                    {blogDetailData.title}
                </Title>
                <div className="flex justify-center mb-4">
                    <Text type="secondary">
                        <CalendarOutlined />{" "}
                        {format(blogDetailData.createdAt, "dd/MM/yyyy")} |{" "}
                        <UserOutlined /> {blogDetailData.author}
                    </Text>
                </div>
                <div className="mb-4">
                    <img
                        src={blogDetailData.image}
                        alt={blogDetailData.title}
                        className="w-full h-auto"
                    />
                </div>
                {/* <div className="bg-gray-100 p-4 mb-4">
                    <Paragraph>{blogDetailData.content}</Paragraph>
                </div> */}
                <Paragraph>{blogDetailData.description}</Paragraph>
            </div>
        )
    );
};

export default BlogDetail;
