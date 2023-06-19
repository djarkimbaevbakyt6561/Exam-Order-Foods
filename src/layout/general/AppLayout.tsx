import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Loading } from "../../components/UI/loading/Loading";
import { RootState } from "../../store";
import { AppHeader } from "./AppHeader";

export const AppLayout = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <>
      {auth.isLoading ? null : <Loading />}

      <AppHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};
