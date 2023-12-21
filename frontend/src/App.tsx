import React from "react";
import "./styles/reset.css";
import "./styles/global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoute from "@routes/PublicRoute";
import Dashboard from "@pages/Dashboard/Dashboard";
import Overview from "@pages/Overview/Overview";
import PrivateRoute from "@routes/PrivateRoute";
import Login from "@pages/Login/Login";
import Layout from "@layout/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Overview />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
