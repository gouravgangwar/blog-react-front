import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./layout/footer";
import Header from "./layout/header";
import Createpost from "./pages/Createpost";
import Seepost from "./pages/Seepost";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Listpost from "./pages/ListPost";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Forget from "./pages/Auth/Forget";
import AddRole from "./pages/Roles/AddRole";
import RoleList from "./pages/Roles/RoleList";


function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <Header  />
        <section style={{ margin: "10px 0 10px 0" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/role" element={<RoleList/>} />
            <Route path="/addrole" element={<AddRole />} />
            <Route path="/editrole/:id" element={<AddRole />} />
            <Route path="/forget" element={<Forget />} />
            <Route path="/createpost" element={<Createpost />} />
            <Route path="/editpost/:id" element={<Createpost />} />
            <Route path="/seepost/:id" element={<Seepost />} />
            <Route path="/listpost" element={<Listpost />} />
          </Routes>
        </section>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
