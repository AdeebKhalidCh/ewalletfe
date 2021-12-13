import React, { useState } from "react";
import { Form, Input, InputNumber, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { addNewWallet } from "../services/eWalletService";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const initialValues = {
    name: "",
    amount: 0,
  };

const AddWallet = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values) => {
    try {
      setIsLoading(true);
      const addNewWalletResponse = addNewWallet(values).then((resp) => {
        notification.success({
          message: "Added New E-Wallet",
          placement: "topRight",
          style: { backgroundColor: "#f6ffed" },
          duration: 5,
        });
        setIsLoading(false);
        navigate("/");
      });
    } catch (error) {
      notification.error({
        message: "Adding New E-Wallet Failed",
        placement: "topRight",
        duration: 5,
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Form {...layout} form={form} name="Add E-Wallet" onFinish={onFinish}
        initialValues={initialValues}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Initial Amount"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <InputNumber
              defaultValue={0}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "5px" }}
            >
              Submit
            </Button>
            <Button
              htmlType="button"
              onClick={() => {
                navigate("/");
              }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default AddWallet;
