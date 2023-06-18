import styled from "@emotion/styled";
import { MealsItem } from "./MealsItem";
const data = [
  {
    title: "Beshbarmak",
    description: "So tasty",
    price: 200,
  },
  {
    title: "Beshbarmak",
    description: "So tasty",
    price: 200,
  },
  {
    title: "Beshbarmak",
    description: "So tasty",
    price: 200,
  },
];
export const Meals = () => {
  return (
    <Container>
      {data?.map((el, i) => (
        <main key={i}>
          <MealsItem el={el} />
        </main>
      ))}
    </Container>
  );
};

const Container = styled("div")`
  background-color: #fff;
  margin: 135px 20%;
  padding: 40px;
  border-radius: 16px;
  main {
    border-bottom: 1px solid #d6d6d6;
    &:last-child {
      border-bottom: none;
    }
  }
`;
