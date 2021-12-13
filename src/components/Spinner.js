import React from "react";
import { Spin, Space } from "antd";
import Proptypes from "prop-types";

const Spinner = ({ loadingText = "Loading..." }) => {
  return (
    <Space
      style={{
        height: "60vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
      size="large"
    >
      <Spin size="large" tip={loadingText} />
    </Space>
  );
};

Spinner.propTypes = {
  loadingText: Proptypes.string,
};

export default Spinner;