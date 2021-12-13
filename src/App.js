import { BrowserRouter as Router, Link } from "react-router-dom";
import React, { Suspense } from "react";
import WalletRoutes from "./routes";
import "antd/dist/antd.css";
import "./App.css"
import { Typography } from "antd";

const { Title } = Typography;

function App() {
  return (
    <Router>
      <>
        <Title style={{ textAlign: "center" }}>E-Wallet</Title>
        <Suspense fallback={<div>Loading...</div>}>
          <WalletRoutes />
        </Suspense>
      </>
    </Router>
  );
}

export default App;
