import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBasket } from "../../store/basket/basket.thunk";
import { snackBarActions } from "../../store/snack.bar";
import { Loading } from "../UI/loading/Loading";
import ModalItem from "./ModalItem";
import { Container, List, styled } from "@mui/material";
import { Modal as MuiModal } from "@mui/material";
import {} from "@mui/material";
import { AppDispatch, RootState } from "../../store";
import { basketActions } from "../../store/basket/basket.slice";
import { Button } from "../UI/button/Button";

const TOTAL_PRICE = "TOTAL_PRICE";
const MODAL_TRUE = "MODAL_TRUE";
const MODAL_FALSE = "MODAL_FALSE";

interface IModalReducer {
  totalPrice: number;
  modalSize: boolean;
}

type Action =
  | { type: "TOTAL_PRICE"; payload: number }
  | { type: "MODAL_TRUE" }
  | { type: "MODAL_FALSE" };

const stateReducer = (state: IModalReducer, action: Action): IModalReducer => {
  if (action.type === "TOTAL_PRICE") {
    return {
      ...state,
      totalPrice: action.payload,
    };
  }
  if (action.type === "MODAL_TRUE") {
    return {
      ...state,
      modalSize: true,
    };
  }
  if (action.type === "MODAL_FALSE") {
    return {
      ...state,
      modalSize: false,
    };
  }
  return state;
};

const Modal = () => {
  const { items, isLoading, open } = useSelector(
    (state: RootState) => state.basket
  );
  const { lightMode } = useSelector((state: RootState) => state.lightMode);
  const [state, dispatchState] = useReducer(stateReducer, {
    totalPrice: 0,
    modalSize: false,
  });
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getBasket())
      .unwrap()
      .then(() => {
        dispatch(
          snackBarActions.successHandler("Successfully received basket")
        );
      })
      .catch((error: any) => {
        dispatch(snackBarActions.errorHandler(error));
      });
  }, []);

  useEffect(() => {
    if (items?.length > 0) {
      dispatchState({ type: MODAL_TRUE });
    }

    let priceSum = 0;
    items.forEach((el) => {
      const price = el.price * el.amount;
      priceSum += price;
    });

    if (priceSum === 0) {
      dispatchState({ type: MODAL_FALSE });
    }

    dispatchState({ type: TOTAL_PRICE, payload: Math.floor(priceSum) });
  }, [items]);

  return (
    <MuiModal
      open={open}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StyledContainer
        sx={{
          padding: "0 !important",
          height: (() => {
            switch (items.length) {
              case 0:
                return "165px";
              case 1:
                return "300px";
              case 2:
                return "431px";
              default:
                return "431px";
            }
          })(),
        }}
      >
        {isLoading ? null : <Loading />}
        {state.modalSize && (
          <UnorderedList
            sx={{
              overflowY: (() => {
                switch (items.length) {
                  case 0:
                    return "none";
                  case 1:
                    return "none";
                  case 2:
                    return "none";
                  default:
                    return "scroll";
                }
              })(),
              height: (() => {
                switch (items.length) {
                  case 0:
                    return "none";
                  case 1:
                    return "166px";
                  case 2:
                    return "266px";
                  default:
                    return "266px";
                }
              })(),
              display: items.length === 0 ? "none" : "block",
            }}
          >
            {items?.map((el) => {
              return (
                <ModalItem
                  key={el._id}
                  id={el._id}
                  title={el.title}
                  price={el.price}
                  amount={el.amount}
                />
              );
            })}
          </UnorderedList>
        )}
        <div style={{ marginTop: "20px", marginRight: "20px" }}>
          <TotalPrice lightMode={lightMode}>
            <h3>Total Price</h3>
            <p>${state.totalPrice}</p>
          </TotalPrice>
          <ButtonContainer>
            <Button
              onClick={() => dispatch(basketActions.toggleModalHandler())}
              secondButton={true}
            >
              Close
            </Button>
            {state.modalSize && <Button thirdButton={true}>Order</Button>}
          </ButtonContainer>
        </div>
      </StyledContainer>
    </MuiModal>
  );
};

export default Modal;

const UnorderedList = styled(List)(() => ({
  padding: "0",
  margin: "0",
}));

const StyledContainer = styled(Container)(() => ({
  padding: "32px",
  width: "671px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "#ffffff",
  borderRadius: "20px",
}));

const TotalPrice = styled(Container)((props: { lightMode: boolean }) => ({
  padding: " 0 !important",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "24px",
  width: "607px",
  h3: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    lineHeight: "30px",
    margin: "0",
    color: "#222222",
  },
  p: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "22px",
    lineHeight: "33px",
    color: props.lightMode ? "#8a2b06" : "#75d4f9",
    margin: "0",
  },
}));

const ButtonContainer = styled(Container)(() => ({
  gap: "20px",
  padding: " 0 !important",
  display: "flex",
  justifyContent: "flex-end",
}));
