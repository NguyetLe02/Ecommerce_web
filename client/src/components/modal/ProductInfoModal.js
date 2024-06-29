import { Form, Image, InputNumber, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import withBaseComponent from "../../hocs/withBaseComponent";

const ProductInfoModal = ({ product, dispatch }) => {
  const modalRef = useRef();

  return (
    <div
      ref={modalRef}
      onClick={(e) => e.stopPropagation()}
      className=" w-[600px] h-fit bg-white rounded-lg"
    >
      <div className="px-6 py-4">
        <div className=" flex flex-col pt-4 gap-4">
          <Form className="max-h-96 overflow-y-auto pr-4" layout="vertical">
            <Form.Item name="title" label="Title:">
              <div>{product.title}</div>
            </Form.Item>
            <Form.Item name="description" label="Description:">
              <div>{product.description}</div>
            </Form.Item>
            <div className="grid grid-row-3 grid-flow-col gap-4">
              <Form.Item name="brand" label="Brand:">
                <div>{product.brand?.title}</div>
              </Form.Item>
              <Form.Item name="style" label="Style:">
                <div>{product.style?.title}</div>
              </Form.Item>
              <Form.Item name="color" label="Color:">
                <div>{product.color}</div>
              </Form.Item>
            </div>
            <div className="grid grid-flow-col grid-row-2 gap-4">
              <Form.Item name="rentalPrice" label="Rental price:">
                <div>{product.rentalPrice}</div>
              </Form.Item>
              <Form.Item name="cost" label="Cost:">
                <div>{product.cost}</div>
              </Form.Item>
            </div>
            <Form.Item label="Hình ảnh:" name="images">
              <div className="flex gap-4">
                {product.images.map((img, index) => (
                  <Image
                    key={index}
                    width={100}
                    src={img}
                    preview={{ visible: false }}
                  />
                ))}
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default withBaseComponent(ProductInfoModal);
