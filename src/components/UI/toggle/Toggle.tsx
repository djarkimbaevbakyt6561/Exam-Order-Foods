import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../store";
import { lightModeActions } from "../../../store/light.mode";
const Toggle = () => {
  const { checked } = useSelector((state: RootState) => state.lightMode);
  const dispatch = useDispatch();
  const handleChange = () => {
    dispatch(lightModeActions.toggleMode());
  };

  return (
    <StyledToggle
      id="toggle"
      className="toggle"
      type="checkbox"
      checked={checked}
      onClick={handleChange}
    />
  );
};

export default Toggle;

const StyledToggle = styled.input`
  --size: 2rem;
  appearance: none;
  outline: none;
  cursor: pointer;

  width: var(--size);
  height: var(--size);
  box-shadow: inset calc(var(--size) * 0.33) calc(var(--size) * -0.25) 0;
  border-radius: 999px;
  color: hsl(240, 100%, 95%);

  transition: all 500ms;

  &:checked {
    --ray-size: calc(var(--size) * -0.4);
    --offset-orthogonal: calc(var(--size) * 0.67);
    --offset-diagonal: calc(var(--size) * 0.47);

    transform: scale(0.75);
    color: hsl(40, 100%, 50%);
    box-shadow: inset 0 0 0 var(--size),
      calc(var(--offset-orthogonal) * -1) 0 0 var(--ray-size),
      var(--offset-orthogonal) 0 0 var(--ray-size),
      0 calc(var(--offset-orthogonal) * -1) 0 var(--ray-size),
      0 var(--offset-orthogonal) 0 var(--ray-size),
      calc(var(--offset-diagonal) * -1) calc(var(--offset-diagonal) * -1) 0
        var(--ray-size),
      var(--offset-diagonal) var(--offset-diagonal) 0 var(--ray-size),
      calc(var(--offset-diagonal) * -1) var(--offset-diagonal) 0 var(--ray-size),
      var(--offset-diagonal) calc(var(--offset-diagonal) * -1) 0 var(--ray-size);
  }
`;
