import { Button } from "../UI/button/Button";

interface ItemType {
  title: string;
  description: string;
  price: number;
}
type Props = {
  el: ItemType;
};
export const MealsItem = ({ el }: Props) => {
  return (
    <div>
      <h3>{el.title}</h3>
      <div>{el.description}</div>
      <div>{el.price}</div>
      <Button>Add </Button>
    </div>
  );
};
