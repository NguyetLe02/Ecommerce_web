import React, { useEffect, useState } from "react";
import { Card, Typography, Row, Col } from "antd";
import {
    CalendarOutlined,
    UserOutlined,
    MessageOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";
import { apiGetBlog } from "../../apis";
import { BlogFilter } from "../../components";

const { Title, Text } = Typography;

const NewsCard = ({ title, date, author, content, imageSrc, link }) => {
    return (
        <a
            href={link}
            className="group block mb-5 no-underline"
            style={{ width: "40%" }}
        >
            <Card
                style={{ maxWidth: '300px' }}
                cover={<img alt="example" src={imageSrc} className="w-full h-auto object-cover" />}
            >
                <Row justify="space-between" align="middle" gutter={[16, 16]}>
                    <Col>
                        <Title
                            level={4}
                            ellipsis={{ tooltips: title }}
                            className="group-hover:text-blue-500"
                        >
                            {title}
                        </Title>
                        <Text type="secondary">
                            <CalendarOutlined /> {date} | <UserOutlined />{" "}
                            {author}
                        </Text>
                    </Col>
                </Row>
                <Text ellipsis={{ rows: 3, expandable: false }}>{content}</Text>
            </Card>
        </a>
    );
};

const Blogs = () => {
    const [blogData, setBlogData] = useState();
    useEffect(() => {
        const fetchBlogData = async () => {
            const data = await apiGetBlog();
            setBlogData(data.Blogs);
        };
        fetchBlogData();
    }, []);
    return (
        <div className="w-full lg:w-main px-[30px]">
            <div className="w-full flex sm:flex-col gap-3 py-4">
                <div className="flex-none">
                    <BlogFilter />
                </div>
                <div className=" flex flex-col container px-4 gap-6">
                    <div className=" text-2xl font-semibold ">
                        Blog của tôi
                    </div>
                    <div className="flex flex-wrap justify-start">
                        {blogData?.map((blog) => {
                            return (
                                <NewsCard
                                    title={blog.title}
                                    date={format(blog.createdAt, "dd/MM/yyyy")}
                                    author={blog.author}
                                    content={blog.description}
                                    imageSrc={blog.image}
                                    link={`/blogs/${blog.id}`}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Blogs;
