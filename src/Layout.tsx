import React from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import { HashRouter, Routes, Route, Link, Navigate } from "react-router-dom";

const Layout = () => {
  return (
    <HashRouter>
      <SidebarLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<div>Home page</div>} />
          <Route path="/users" element={<div>Users page</div>} />
          <Route path="/settings" element={<div>Settings page</div>} />
        </Routes>
      </SidebarLayout>
    </HashRouter>
  );
};

export default Layout;
