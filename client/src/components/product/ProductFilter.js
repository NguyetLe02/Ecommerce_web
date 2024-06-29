import React, { memo } from "react";
import ProductFilterSelection from "./ProductFilterSelection";
import { productFilter } from "../../ultils/contants";

const ProductFilter = ({ selected, setSelected }) => {
    return (
        <div className=" w-full flex flex-col sm:grid grid-cols-2 gap-2">
            <ProductFilterSelection
                label="Khoảng giá"
                items={productFilter.price}
                selected={selected}
                setSelected={setSelected}
            />
            <ProductFilterSelection
                label="Thương hiệu"
                items={productFilter.brand}
                selected={selected}
                setSelected={setSelected}
            />
            <ProductFilterSelection
                label="Loại trang phục"
                items={productFilter.category}
                selected={selected}
                setSelected={setSelected}
            />
            <ProductFilterSelection
                label="Màu sắc"
                items={productFilter.color}
                selected={selected}
                setSelected={setSelected}
            />
            <ProductFilterSelection
                label="Phong cách"
                items={productFilter.style}
                selected={selected}
                setSelected={setSelected}
            />
        </div>
    );
};

export default memo(ProductFilter);
