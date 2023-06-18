import { Outlet } from "react-router-dom";
import { AdminHeader } from "./AdminHeader";

export const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <div style={{ marginTop: "8.5rem" }}>
        <h1>Hello</h1>
        <Outlet />
      </div>
    </>
  );
};
