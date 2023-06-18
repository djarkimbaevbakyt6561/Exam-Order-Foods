import { useDispatch, useSelector } from "react-redux";
import { SnackBar } from "./components/UI/modal/SnackBar";
import { MainRoutes } from "./routes/MainRoutes";
import { AppDispatch, RootState } from "./store";
import { snackBarActions } from "./store/snackBar";

export function App() {
  const snackBar = useSelector((state: RootState) => state.snackBar);
  const dispatch = useDispatch<AppDispatch>();
  function closeHandler() {
    dispatch(snackBarActions.closeHandler());
  }
  return (
    <>
      <SnackBar
        open={snackBar.open}
        onClose={closeHandler}
        severity={snackBar.severity}
      >
        {snackBar.message}
      </SnackBar>
      <MainRoutes />
    </>
  );
}
