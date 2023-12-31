import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import { Loading } from "../../components/UI/loading/Loading";
import { RootState } from "../../store";
import { UserHeader } from "./UserHeader";

export const UserLayout = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const { open } = useSelector((state: RootState) => state.basket);

  return (
    <>
      {auth.isLoading ? null : <Loading />}
      {open && <Modal />}
      <UserHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};
