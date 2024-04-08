import React from 'react'
import { Card, List } from 'antd';
import { Link } from 'react-router-dom'
import { createSlug } from '../../ultils/helpers'
const { Meta } = Card;

const SliderIcon = ({ data, column, isTitle }) => {
    return (
        <List
            grid={{
                gutter: 16,
                column: column,
            }}
            dataSource={data}
            renderItem={(item) => (
                <div>
                    {item.icon &&
                        <List.Item>
                            <Link
                                key={createSlug(item.title)}
                                to={createSlug(item.title)}
                            >
                                <Card
                                    hoverable
                                    cover={<img src={item.icon} alt="style icon" />}
                                >
                                    {isTitle &&
                                        <Meta title={item.title} />
                                    }
                                </Card>
                            </Link>
                        </List.Item>
                    }
                </div>
            )}
        />
    )
}

export default SliderIcon
