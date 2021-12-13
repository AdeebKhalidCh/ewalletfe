import React, { useEffect, useState } from "react";
import {
  Col,
  Modal,
  Form,
  InputNumber,
  Radio,
  Row,
  notification,
  Button,
} from "antd";
import { updateWallet } from "../services/eWalletService";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const TransactionModal = (props) => {
  const { isModalVisible, setModalVisible, setIsLoading, getAllEWalletRecord, record } = props;
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setModalVisible(false);
    setIsLoading(true);
    try {
      const { amount, transactiontype } = values;
      let updatedRecord = {};
      updatedRecord.id = record.id;
      updatedRecord.name = record.name;
      updatedRecord.amount = record.amount;
      if (transactiontype === "add") {
        updatedRecord.amount += amount;
      } else if (amount > record.amount) {
        return;
      } else {
        updatedRecord.amount -= amount;
      }
      updateWallet(updatedRecord).then((resp) => {
        notification.success({
          message: "Updated E-Wallet",
          placement: "topRight",
          style: { backgroundColor: "#f6ffed" },
          duration: 5,
        });
        getAllEWalletRecord();
        setIsLoading(false);
      });
    } catch (error) {
      notification.error({
        message: "Updating E-Wallet Failed",
        placement: "topRight",
        duration: 5,
      });
      setIsLoading(false);
    }
    form.resetFields();
  };
  return (
    <Modal
      maskClosable={false}
      destroyOnClose={true}
      visible={isModalVisible}
      title="Make a Transaction"
      footer={null}
      onCancel={() => {
        setModalVisible(false);
      }}
    >
      <Form
        form={form}
        name="transaction_form"
        initialValues={{
          transactiontype: "add",
          amount: 0,
        }}
        onFinish={onFinish}
        {...layout}
      >
        <Row>
          <Col span={8}>Total Amount:</Col>
          <Col span={16}>
            {record &&
              record.amount &&
              `$ ${record.amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Col>
        </Row>
        <Form.Item
          className="alignLeft"
          name="amount"
          label="Transaction Amount"
          rules={[
            {
              validator(_, value) {
                if (form.getFieldValue("transactiontype") === "withdraw") {
                  if (record && value > record.amount) {
                    return Promise.reject("Withdraw limit exceeds");
                  }
                }
                return Promise.resolve();
              },
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
        <Form.Item name="transactiontype">
          <Radio.Group>
            <Radio value="add">Add Amount</Radio>
            <Radio value="withdraw">Withdraw Amount</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "5px" }}
          >
            Submit
          </Button>

          <Button
            onClick={() => {
              form.resetFields();
              setModalVisible(false);
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TransactionModal;
