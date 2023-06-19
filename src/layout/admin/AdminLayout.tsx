import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import AdminModal from "../../components/admin/AdminModal";
import FoodsModal from "../../components/foods/FoodsModal";
import { Loading } from "../../components/UI/loading/Loading";
import { RootState } from "../../store";
import { AdminHeader } from "./AdminHeader";

export const AdminLayout = () => {
  const adminModal = useSelector((state: RootState) => state.adminModal);
  const foods = useSelector((state: RootState) => state.foods);
  return (
    <>
      {adminModal.isLoading ? null : <Loading />}
      {foods.open && <FoodsModal />}

      <AdminHeader />
      <Container>
        <Outlet />
        <AdminModal />
      </Container>
    </>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8.5rem;
`;
