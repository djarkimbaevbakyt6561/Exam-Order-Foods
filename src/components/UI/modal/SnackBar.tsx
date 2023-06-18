import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { ISnackbarState } from "../../../types/interfaces";

export const SnackBar = ({
  open,
  onClose,
  severity,
  children,
}: ISnackbarState) => {
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
      >
        <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
          {children}
        </Alert>
      </Snackbar>
    </>
  );
};
