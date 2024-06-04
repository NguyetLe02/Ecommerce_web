import { Form, Image, InputNumber, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import withBaseComponent from "../../hocs/withBaseComponent";
import { showModal } from "../../store/app/appSlice";
import TextArea from "antd/es/input/TextArea";
import { UploadClaimImage, Button } from "../../components";
import { apiGetBrands } from "../../apis";
import { useDispatch } from "react-redux";
import { Input } from "antd";
import { productFilter } from "../../ultils/contants";
const CreateProductModal = ({ product, dispatch }) => {
  const modalRef = useRef();
  const [form] = Form.useForm();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [optionBrands, setOptionsBrand] = useState([{}]);
  const [optionStyles, setOptionsStyle] = useState([{}]);
  const [optionsColors, setOptionsColors] = useState([{}]);
  const handleImageUpload = (images) => {
    setUploadedImages(images);
  };

  const handleCreateProduct = async (value) => {
    const data = {
      ...value,
      images: uploadedImages,
    };

    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (key === "images")
        for (let i = 0; i < value.length; i++) {
          const file = value[i];
          formData.append("images", file);
        }
      else {
        formData.append(key, value);
      }
    }
    // if(product){ // update product } else { // create product }
  };
  useEffect(() => {
    const featchDataSelect = async () => {
      const brands = await apiGetBrands();
      const optionBrands = brands.Brands.map((brand) => ({
        value: brand.title,
        label: brand.title,
      }));
      const optionStyles = Object.values(productFilter.style).map((style) => ({
        value: style,
        label: style,
      }));
      const optionColors = Object.values(productFilter.color).map((color) => ({
        value: color,
        label: color,
      }));
      setOptionsColors(optionColors);
      setOptionsBrand(optionBrands);
      setOptionsStyle(optionStyles);
    };
    featchDataSelect();
  }, []);

  useEffect(() => {
    if(product){
      form.setFieldsValue({
        title: product.title,
        description: product.description,
        brand: product.brand,
        style: product.style,
        color: product.color,
        rentalPrice: product.rentalPrice,
        cost: product.cost,
      });
    }
  }, [product, form]);

  return (
    <div
      ref={modalRef}
      onClick={(e) => e.stopPropagation()}
      className=" w-[600px] h-fit bg-white rounded-lg"
    >
      <div className="px-6 py-4">
        <div className=" flex flex-col pt-4 gap-4">
          <Form
            form={form}
            className="max-h-96 overflow-y-auto pr-4"
            onFinish={handleCreateProduct}
            layout="vertical"
          >
            <Form.Item name="title" label="Title">
              <Input required />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <TextArea required />
            </Form.Item>
            <div className="grid grid-row-3 grid-flow-col gap-4">
              <Form.Item name="brand" label="Brand">
                <Select
                  required
                  options={optionBrands}
                  placement="bottomLeft"
                />
              </Form.Item>
              <Form.Item name="style" label="Style">
                <Select
                  required
                  options={optionStyles}
                  placement="bottomLeft"
                />
              </Form.Item>
              <Form.Item name="color" label="Color">
                <Select
                  required
                  options={optionsColors}
                  placement="bottomLeft"
                />
              </Form.Item>
            </div>
            <div className="grid grid-flow-col grid-row-2 gap-4">
              <Form.Item name="rentalPrice" label="Rental price">
                <InputNumber required style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="cost" label="Cost">
                <InputNumber required style={{ width: "100%" }} />
              </Form.Item>
            </div>
            <Form.Item label="Hình ảnh" name="images">
              <UploadClaimImage onImageUpload={handleImageUpload} />
            </Form.Item>
            <Form.Item>
              <div className=" flex gap-4">
                <Button name={"Thêm"} type="submit" />
                <Button
                  name={"Thoát"}
                  style={"px-4 py-2 rounded-md bg-gray-200 font-semibold"}
                  handleOnclick={() =>
                    dispatch(showModal({ isShowModal: false }))
                  }
                />
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default withBaseComponent(CreateProductModal);
