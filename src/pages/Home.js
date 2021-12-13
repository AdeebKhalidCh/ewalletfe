import React, { useEffect, useState } from "react";
import { Table, Popover, Button, Popconfirm, Form, notification } from "antd";
import { useNavigate } from "react-router-dom";
import {
  TransactionOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  WalletTwoTone,
} from "@ant-design/icons";
import { getAllEWallet, deleteWallet } from "../services/eWalletService";
import Spinner from "../components/Spinner";
import TransactionModal from "../components/TransactionModal";

const Home = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [recordToUpdate, setrecordToUpdate] = useState(false);

  useEffect(() => {
    getAllEWalletRecord();
  }, []);

  const getAllEWalletRecord = () => {
    getAllEWallet()
      .then((res) => {
        setData(res);
      })
      .catch((error) => {});
  };

  const deleteWalletRecord = (id) => {
    setIsLoading(true);
    deleteWallet(id)
      .then((res) => {
        notification.success({
          message: "Successfully Deleted E-Wallet",
          placement: "topRight",
          style: { backgroundColor: "#f6ffed" },
          duration: 5,
        });
        getAllEWallet()
          .then((res) => {
            setData(res);
          })
          .catch((error) => {});
        setIsLoading(false);
      })
      .catch((err) => {
        notification.error({
          message: "Deleting E-Wallet Failed",
          placement: "topRight",
          duration: 5,
        });
        setIsLoading(false);
      });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "50%",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: "40%",
    },
    {
      title: "",
      key: "dots",
      width: "10%",
      render: (text, record, index) => (
        <span key={index} className="three-dots" size="middle">
          <Popover
            placement="leftTop"
            trigger="hover"
            overlayClassName="edit-del-popup"
            content={() => (
              <>
                <Button
                  className="popup-btn"
                  type="link"
                  icon={<TransactionOutlined />}
                  onClick={() => {
                    setrecordToUpdate(record);
                    setModalVisible(true);
                  }}
                >
                  Make a Transaction
                </Button>
                <br />
                <Popconfirm
                  title="Are you sure, you want to delete this E-Wallet?"
                  placement="left"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => {
                    deleteWalletRecord(record.id);
                  }}
                  icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                >
                  <Button
                    className="popup-btn"
                    type="link"
                    icon={<DeleteOutlined />}
                  >
                    Remove
                  </Button>
                </Popconfirm>
              </>
            )}
          >
            <div style={{ cursor: "pointer" }}>...</div>
          </Popover>
        </span>
      ),
    },
  ];

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div style={{ padding: "20px" }}>
          <Button
            shape="round"
            icon={<WalletTwoTone />}
            size="large"
            style={{ marginBottom: "20px" }}
            onClick={() => {
              navigate("/add-wallet");
            }}
          >
            Add E-Wallet
          </Button>
          <Form form={form} component={false}>
            <Table
              bordered
              dataSource={data}
              columns={columns}
              rowClassName="editable-row"
              pagination={{}}
            />
          </Form>
          <TransactionModal
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
            setIsLoading={setIsLoading}
            record={recordToUpdate}
            getAllEWalletRecord={getAllEWalletRecord}
          />
        </div>
      )}
    </>
  );
};

export default Home;
