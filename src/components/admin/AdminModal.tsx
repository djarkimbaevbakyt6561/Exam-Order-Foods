import { useDispatch, useSelector } from "react-redux";
import { Box, Container, styled, TextField } from "@mui/material";
import { Modal as MuiModal } from "@mui/material";
import {} from "@mui/material";
import { Loading } from "../UI/loading/Loading";
import { AppDispatch, RootState } from "../../store";
import { adminModalActions } from "../../store/admin-modal/admin.modal.slice";
import { snackBarActions } from "../../store/snack.bar";
import { Button } from "../UI/button/Button";
import { addFood } from "../../store/admin-modal/admin.modal.thunk";
import { IError, IStructureItem } from "../../types/interfaces";
const AdminModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { open, title, description, price, isLoading } = useSelector(
    (state: RootState) => state.adminModal
  );

  function getTitleValue(e: React.ChangeEvent<HTMLInputElement>): void {
    dispatch(adminModalActions.getTitleValue(e.target.value));
  }
  function getDescriptionValue(e: React.ChangeEvent<HTMLInputElement>): void {
    dispatch(adminModalActions.getDescriptionValue(e.target.value));
  }
  function getPriceValue(e: React.ChangeEvent<HTMLInputElement>): void {
    dispatch(adminModalActions.getPriceValue(e.target.value));
  }
  function closeModal() {
    dispatch(adminModalActions.toggleModalHandler());
  }
  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const data: IStructureItem = {
        title,
        description,
        price: +price,
      };
      await dispatch(addFood(data)).unwrap();
      dispatch(adminModalActions.toggleModalHandler());
      dispatch(adminModalActions.resetHandler());
      dispatch(snackBarActions.successHandler("Successfully added"));
    } catch (error: any) {
      dispatch(snackBarActions.errorHandler(error.message));
    }
  }
  return (
    <MuiModal
      open={open}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{
          padding: "20px 20px 0px 20px",
          gap: "20px",
          width: "671px",
          height: "317px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#ffffff",
          borderRadius: "10px",
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            sx={{
              width: "100%",
              marginBottom: "20px",
            }}
            id="outlined-basic"
            label="Title"
            value={title}
            onChange={getTitleValue}
            variant="outlined"
            type="text"
          />
          <TextField
            sx={{
              width: "100%",
              marginBottom: "20px",
            }}
            id="outlined-basic"
            label="Description"
            value={description}
            onChange={getDescriptionValue}
            variant="outlined"
            type="text"
          />
          <TextField
            sx={{
              width: "100%",
            }}
            id="outlined-basic"
            label="Price"
            value={price}
            onChange={getPriceValue}
            variant="outlined"
            type="number"
          />
        </div>
        <ButtonContainer>
          <Button secondButton={true} onClick={closeModal}>
            Close
          </Button>
          <Button thirdButton={true} type="submit">
            Add
          </Button>
        </ButtonContainer>
        {isLoading ? null : <Loading />}
      </Box>
    </MuiModal>
  );
};
export default AdminModal;

const ButtonContainer = styled(Container)(() => ({
  gap: "16px",
  padding: " 0 !important",
  display: "flex",
  justifyContent: "flex-end",
}));
