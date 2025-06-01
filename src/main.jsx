import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LoginPage from "./pages/Login.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TransactionsPage from "./pages/Transactions.jsx";
// import TransactionDetails from "./pages/TransactionDetails.jsx";
import Edit from "./pages/Edit.jsx";
// import Edit from "./pages/Edit.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
