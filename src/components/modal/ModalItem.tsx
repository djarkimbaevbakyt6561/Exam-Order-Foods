import styled from "styled-components";
import {
  decrementAmount,
  incrementAmount,
} from "../../store/basket/basket.thunk";
import { useDispatch, useSelector } from "react-redux";
import { snackBarActions } from "../../store/snack.bar";
import { AppDispatch, RootState } from "../../store";
import { Button } from "../UI/button/Button";
interface IModalItem {
  title: string;
  price: number;
  amount: number;
  id: string;
  key: string;
}
const ModalItem = ({ title, price, amount, id, key }: IModalItem) => {
  const { lightMode } = useSelector((state: RootState) => state.lightMode);
  const dispatch = useDispatch<AppDispatch>();
  function decrementItem() {
    dispatch(decrementAmount({ id, amount }))
      .unwrap()
      .then(() => {
        dispatch(snackBarActions.successHandler("Successfully one removed "));
      })
      .catch((error) => {
        dispatch(snackBarActions.errorHandler(error));
      });
  }
  function incrementItem() {
    dispatch(incrementAmount({ id, amount }))
      .unwrap()
      .then(() => {
        dispatch(snackBarActions.successHandler("Successfully one added"));
      })
      .catch((error) => {
        dispatch(snackBarActions.errorHandler(error));
      });
  }
  return (
    <ListItem key={key}>
      <TitleOfProduct>
        <h3>{title}</h3>
        <PriceAndCount>
          <Price lightMode={lightMode}>${price}</Price>
          <CountP>x {amount}</CountP>
        </PriceAndCount>
      </TitleOfProduct>
      <ButtonContainerTwo>
        <Button fourthButton={true} onClick={decrementItem}>
          -
        </Button>
        <Button fourthButton={true} onClick={incrementItem}>
          +
        </Button>
      </ButtonContainerTwo>
    </ListItem>
  );
};
export default ModalItem;
const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 4px;
  border-bottom: 1px solid #d6d6d6;
  width: 607px;
`;
const TitleOfProduct = styled.div`
  h3 {
    font-family: "Poppins";
    font-style: normal;
    line-height: 30px;
    color: #222222;
    margin: 0;
  }
`;
const PriceAndCount = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 24px;
`;
const Price = styled.p<{ lightMode: boolean }>`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 27px;
  color: ${(props) => (props.lightMode ? "#ad5502" : "#52aafd")};
  margin: 0;
`;
const CountP = styled.p`
  padding: 5px 14px;
  border: 1px solid #d6d6d6;
  border-radius: 6px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  color: #222222;
  margin: 0;
  margin-left: 47px;
`;
const ButtonContainerTwo = styled.div`
  gap: 14px;
  display: flex;
  margin-bottom: 26px;
`;
