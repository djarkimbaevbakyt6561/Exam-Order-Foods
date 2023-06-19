import { useDispatch, useSelector } from "react-redux";
import { Box, Container, styled, TextField } from "@mui/material";
import { Modal as MuiModal } from "@mui/material";
import { Button } from "../UI/button/Button";
import { Loading } from "../UI/loading/Loading";
import { snackBarActions } from "../../store/snack.bar";
import { foodsActions } from "../../store/foods/foods.slice";
import { updateFood } from "../../store/foods/foods.thunk";
import { AppDispatch, RootState } from "../../store";

const FoodsModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { open, title, description, price, isLoading, id } = useSelector(
    (state: RootState) => state.foods
  );
  function getTitleValue(e: React.ChangeEvent<HTMLInputElement>): void {
    dispatch(foodsActions.getTitleValue(e.target.value));
  }
  function getDescriptionValue(e: React.ChangeEvent<HTMLInputElement>): void {
    dispatch(foodsActions.getDescriptionValue(e.target.value));
  }
  function getPriceValue(e: React.ChangeEvent<HTMLInputElement>): void {
    dispatch(foodsActions.getPriceValue(e.target.value));
  }
  function closeModal() {
    dispatch(foodsActions.toggleModalHandler());
  }
  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const data = {
        title,
        description,
        price: +price,
      };
      await dispatch(updateFood({ data, id })).unwrap();
      dispatch(foodsActions.toggleModalHandler());
      dispatch(snackBarActions.successHandler("Successfully updated"));
    } catch (error) {
      console.log(error);
      dispatch(snackBarActions.errorHandler(error));
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
            Update
          </Button>
        </ButtonContainer>
        {isLoading ? null : <Loading />}
      </Box>
    </MuiModal>
  );
};
export default FoodsModal;

const ButtonContainer = styled(Container)(() => ({
  padding: " 0 !important",
  display: "flex",
  gap: "20px",
  justifyContent: "flex-end",
}));
