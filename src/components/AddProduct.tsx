import React from "react";
import { Button, Form, FormProps, Input, message } from "antd";
import { Link } from "react-router-dom";
import { BackwardOutlined, Loading3QuartersOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import instance from "@/configs/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
type FieldType = {
  name?: string;
  price?: number;
  description?: string;
};
const AddProduct = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate, isPending } = useMutation({
    mutationFn: async (product: FieldType) => {
      try {
        return await instance.post(`products`, product);
      } catch (error) {
        throw new Error("Call Api Fail");
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Done",
      });
      form.resetFields();
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message,
      });
      throw error;
    },
  });
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    mutate(values);
  };
  return (
    <div>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold"> Add Products</h1>
        <Button type="primary">
          <Link to={`/`}>
            <BackwardOutlined />
            Back
          </Link>
        </Button>
      </div>
      <div className="max-w-4xl mx-auto">
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          // initialValues={{ remember: true }}
          onFinish={onFinish}
          // // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="name"
            name="name"
            rules={[
              { required: true, message: "Please input product name!" },
              {
                type: "string",
                min: 6,
                message: "Product name must be greater 6 characters",
              },
              {
                type: "string",
                max: 25,
                message: "Product name can be at least 25 characters",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="price"
            name="price"
            rules={[
              { required: true, message: "Please input product price!" },
              {
                type: "number",
                min: 0,
                transform: (value) => Number(value),
                message: "Product price need > 0 and need to be a number",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="description"
            name="description"
            rules={[
              { required: true, message: "Please input product description!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" disabled={isPending}>
              {isPending ? (
                <>
                <Loading3QuartersOutlined className="animate-spin"/>
                </>
              ) : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
