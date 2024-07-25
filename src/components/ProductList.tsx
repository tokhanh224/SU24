import React from "react";
import { Button, message, Popconfirm, Skeleton, Table } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "@/configs/axios";
import { Product } from "@/interface/Product";
type Props = {};

const ProductList = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        return await instance.get(`products`);
      } catch (error) {
        throw new Error("Call Api Fail");
      }
    },
  });
  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      try {
        return await instance.delete(`products/${id}`);
      } catch (error) {
        throw new Error("Call Api Fail");
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Done",
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error) => {
      messageApi.open({
        type: "success",
        content: error.message,
      });
      throw error;
    },
  });

  const dataSource = data?.data.map((product: Product) => ({
    key: product.id,
    ...product,
  }));
  const columns = [
    {
      key: "name",
      title: "Product Name",
      dataIndex: "name",
    },
    {
      key: "price",
      title: "Product price",
      dataIndex: "price",
    },
    {
      key: "description",
      title: "Product description",
      dataIndex: "description",
    },
    {
      key: "action",
      title: "Action",
      render: (_: any, product: Product) => {
        return (
          <div className="flex space-x-3">
            <Popconfirm
              title="Delete product"
              description="Are you sure to delete this product?"
              onConfirm={() => mutate(product.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
            <Button>
                <Link to={`/Edit/${product.id}`}>Edit</Link>
            </Button>
          </div>
        );
      },
    },
  ];
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  return (
    <div>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Button type="primary">
          <Link to={`/Add`}>
            <PlusCircleFilled />
            Add Product
          </Link>
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ProductList;
