import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddWallet from "./pages/AddWallet";

const WalletRoutes = () => {
  return (
    <Routes>
      <>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/add-wallet" element={<AddWallet />} />
      </>
    </Routes>
  );
};

export default WalletRoutes;