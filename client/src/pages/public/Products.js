import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../../apis";
import {
    Pagination,
    ProductCard,
    ProductFilter,
    ProductSort,
} from "../../components";
import { useParams, useSearchParams } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState(null);
    const [params] = useSearchParams();
    const [sortedProducts, setSortedProducts] = useState(null);
    const { type, optionid } = useParams();
    const [selected, setSelected] = useState({
        color: [],
        price: [],
        brand: [],
        type: [],
        styles: [],
    });

    const fetchProducts = async (queries) => {
        const response = await apiGetProducts(queries);
        if (response.success) {
            setProducts(response.products);
            setFilteredProducts(response.products);
            setSortedProducts(response.products);
        } else {
            setProducts([]);
            setFilteredProducts([]);
            setSortedProducts([]);
        }
    };

    const applyFilters = () => {
        let filtered = products;
        if (filtered) {
            if (selected.color.length > 0) {
                filtered = filtered.filter((product) =>
                    selected.color.includes(product.color)
                );
            }

            if (selected.price.length > 0) {
                filtered = filtered.filter((product) =>
                    selected.price.some((price) => {
                        if (price.to) {
                            return (
                                product.rentalPrice >= price.from &&
                                product.rentalPrice <= price.to
                            );
                        }
                        return product.rentalPrice >= price.from;
                    })
                );
            }

            if (selected.brand.length > 0) {
                filtered = filtered.filter((product) =>
                    selected.brand.includes(product.brand?.title)
                );
            }

            if (selected.type.length > 0) {
                filtered = filtered.filter((product) =>
                    selected.type.includes(product.category?.title)
                );
            }

            if (selected.styles.length > 0) {
                filtered = filtered.filter((product) =>
                    selected.styles.includes(product.style)
                );
            }
            setFilteredProducts(filtered);
            setSortedProducts(filtered);
        }
    };

    useEffect(() => {
        const queries = {};
        for (let entry of params.entries()) {
            queries[entry[0]] = entry[1];
        }
        if (type && optionid) {
            queries[type] = optionid;
        }
        queries["sort"] = "-createdAt";
        fetchProducts(queries);
    }, [params, type, optionid]);

    useEffect(() => {
        applyFilters();
    }, [selected, products]);

    const sortProductsLowToHigh = () => {
        const sorted = [...products].sort(
            (a, b) => a.rentalPrice - b.rentalPrice
        );
        setSortedProducts(sorted);
    };

    const sortProductsHighToLow = () => {
        const sorted = [...products].sort(
            (a, b) => b.rentalPrice - a.rentalPrice
        );
        setSortedProducts(sorted);
    };

    return (
        <div className="w-full lg:w-main px-[30px]">
            <div className="w-full flex sm:flex-col gap-3 py-4">
                <div className="flex-none">
                    <ProductFilter
                        setSelected={setSelected}
                        selected={selected}
                    />
                </div>
                {filteredProducts && filteredProducts.length > 0 ? (
                    <div className="flex-1 flex-col">
                        <div className="flex sm:flex-col justify-between">
                            <div className="text-2xl font-semibold">
                                Tất cả sản phẩm
                            </div>
                            <ProductSort
                                sortLowToHigh={sortProductsLowToHigh}
                                sortHighToLow={sortProductsHighToLow}
                            />
                        </div>
                        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3">
                            {sortedProducts?.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    productData={product}
                                />
                            ))}
                        </div>
                        <div className="italic">
                            <Pagination totalCount={products?.length} />
                        </div>
                    </div>
                ) : (
                    <span className="text-2xl font-semibold">
                        Không có sản phẩm nào phù hợp
                    </span>
                )}
            </div>
        </div>
    );
};

export default Products;
