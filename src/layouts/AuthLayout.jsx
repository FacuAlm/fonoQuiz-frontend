import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const token = localStorage.getItem("token");
  return (
    <>
 {!token ? <Navigate to="/" /> : null}
      <main className="bg-gradient-to-r from-pink-500 to-rose-500">
       
          <Outlet />
        
      </main>



    </>
  );
};

export default AuthLayout;
