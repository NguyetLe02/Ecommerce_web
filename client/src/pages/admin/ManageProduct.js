import {
  Table,
} from "antd";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Button } from "../../components";
import { useEffect, useState } from "react";
import { apiGetProducts, apiGetProduct, apiRemoveProduct } from "../../apis/product";
import { showModal } from "../../store/app/appSlice";
import CreateProductModal from "../../components/modal/CreateProductModal";
import { useDispatch } from "react-redux";
import ProductInfoModal from "../../components/modal/ProductInfoModal";
import Swal from "sweetalert2";

const ManageProduct = () => {
  const handleClickEdit = async (id) => {
    const response = await apiGetProduct(id);
    dispatch(
      showModal({
        isShowModal: true,
        modalChildren: <CreateProductModal product={response.productData} />,
      })
    );
  };
  const handleWatchDetail = async (id) => {
    const response = await apiGetProduct(id);
    dispatch(
      showModal({
        isShowModal: true,
        modalChildren: <ProductInfoModal product={response.productData} />,
      })
    );
  };
  const handleClickRemove = async (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa sản phẩm này?",
      showCancelButton: true,
      confirmButtonText: `Xóa`,
      cancelButtonText: `Hủy`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiRemoveProduct(id);
        if (response.success) {
          Swal.fire("Xóa thành công", "", "success");
          window.location.reload();
        }
      }
    });
  };
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      key: "title",
      width: "20%",
    },
    {
      title: "Hãng",
      dataIndex: "brand",
      key: "brand",
      width: "15%",
      render: (_, record) => <div>{record.title}</div>,
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      width: "15%",
      render: (_, record) => <div>{record.title}</div>,
    },
    {
      title: "Rental price",
      key: "rentalPrice",
      dataIndex: "rentalPrice",
      width: "12%",
    },
    {
      title: "Cost",
      key: "cost",
      dataIndex: "cost",
      width: "10%",
    },
    {
      title: "Style",
      key: "style",
      dataIndex: "style",
      width: "15%",
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "_id",
      width: "15%",
      render: (record) => (
        <div style={{ padding: "0.5rem 0" }} className="flex gap-2">
          <FaEdit style={{ cursor: "pointer" }} color="yellow" onClick={() => handleClickEdit(record)} />
          <FaEye style={{ cursor: "pointer" }} color="#00b1ff" onClick={() => handleWatchDetail(record)} />
          <FaTrashAlt style={{ cursor: "pointer" }} color="red" onClick={() => handleClickRemove(record)} />
        </div>
      ),
    },
  ];
  const dispatch = useDispatch();
  const [listProducts, setListProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGetProducts({ sort: "-createdAt", limit: 8 });
      if (response.success) {
        setListProducts(response.products ?? []);
      }
    };

    fetchData();
  }, []);
  return (
    <div id="ManageProduct">
      <div className='h-screen w-full px-8'>
        <h1 className=' h-[75px] flex justify-between items-center text-3xl font-bold border-b text-primary-1'>
          <span>Quản lý sản phẩm</span>
        </h1>
        <Button
          name={"Thêm sản phẩm"}
          handleOnclick={() =>
            dispatch(
              showModal({
                isShowModal: true,
                modalChildren: <CreateProductModal />,
              })
            )
          }
        />
        <Table
          className="mt-4"
          columns={columns}
          dataSource={listProducts}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default ManageProduct;
