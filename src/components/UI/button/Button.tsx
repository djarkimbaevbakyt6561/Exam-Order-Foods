import { Button as MuiButton, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
interface ButtonProps {
  children: string;
  onClick?: () => void;
  type?: "button" | "reset" | "submit" | undefined;
  firstButton?: boolean;
  secondButton?: boolean;
  thirdButton?: boolean;
  fourthButton?: boolean;
}
export const Button = ({
  children,
  onClick,
  type,
  firstButton,
  secondButton,
  thirdButton,
  fourthButton,
  ...props
}: ButtonProps) => {
  const { lightMode } = useSelector((state: RootState) => state.lightMode);
  return (
    <>
      {firstButton && (
        <FirstButton
          lightMode={lightMode}
          type={type}
          onClick={onClick}
          {...props}
        >
          <Span>+</Span> {children}
        </FirstButton>
      )}
      {secondButton && (
        <SecondButton
          lightMode={lightMode}
          type={type}
          onClick={onClick}
          {...props}
        >
          {children}
        </SecondButton>
      )}
      {thirdButton && (
        <ThirdButton lightMode={lightMode} type={type} {...props}>
          {children}
        </ThirdButton>
      )}
      {fourthButton && (
        <FourthButton lightMode={lightMode} onClick={onClick} {...props}>
          {children}
        </FourthButton>
      )}
    </>
  );
};

const FirstButton = styled(MuiButton)((props: { lightMode: boolean }) => ({
  backgroundColor: props.lightMode ? "#8A2B06" : "#75D4F9",
  color: props.lightMode ? "white" : "black",
  padding: "10px 32px",
  borderRadius: "20px",
  width: "99px",
  textTransform: "none",
  fontFamily: "Poppins",
  fontStyle: "normal",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "41px",
  fontWeight: "700",
  letterSpacing: "0.03em",
  fontSize: "0.875rem",
  "&:hover": {
    backgroundColor: props.lightMode ? "#5c1a01" : "#a3e5fe",
  },
  "&:active": {
    background: props.lightMode ? "#993108" : "#66CEF7",
  },
  "&:disabled": {
    background: "white",
    border: "1px solid #CAC6C4",
    color: "white",
  },
}));
const SecondButton = styled(MuiButton)((props: { lightMode: boolean }) => ({
  background: "white",
  borderRadius: "20px",
  width: "110px",
  height: "44px",
  border: props.lightMode ? "1px solid #8A2B06" : "1px solid #75D4F9",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "16px",
  letterSpacing: "0.03em",
  textTransform: "capitalize",
  color: props.lightMode ? "#8A2B06" : "#75D4F9",
  "&:active": {
    background: props.lightMode ? "#993108" : "#66CEF7",
    color: "white",
    border: "none",
  },
  "&:hover": {
    background: props.lightMode ? "#7E2A0A" : "#81D5F5",
    color: "white",
  },
  "&:disabled": {
    background: "#CAC6C4",
    border: "none",
    color: "white",
  },
}));
const ThirdButton = styled(MuiButton)((props: { lightMode: boolean }) => ({
  background: props.lightMode ? "#8A2B06" : "#75D4F9",
  borderRadius: "20px",
  width: "110px",
  height: "44px",
  border: "none",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "16px",
  letterSpacing: "0.03em",
  textTransform: "capitalize",
  color: "white",
  "&:active": {
    background: props.lightMode ? "#993108" : "#66CEF7",
    color: "white",
    border: "none",
  },
  "&:hover": {
    background: props.lightMode ? "#7E2A0A" : "#81D5F5",
    color: "white",
  },
  "&:disabled": {
    background: "#CAC6C4",
    border: "none",
    color: "white",
  },
}));
const FourthButton = styled("button")<{ lightMode: boolean }>`
  background: white;
  border-radius: 6px;
  width: 48px;
  height: 36px;
  border: ${(props) =>
    props.lightMode ? "1px solid #8a2b06" : "1px solid #75d4f9"};
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  letter-spacing: 0.03em;
  text-transform: capitalize;
  color: ${(props) => (props.lightMode ? "#8a2b06" : "#75d4f9")};
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${(props) => (props.lightMode ? "#8a2b06" : "#75d4f9")};
    color: white;
  }
  &:active {
    background: ${(props) => (props.lightMode ? "#993108" : "#66cef7")};
    color: white;
  }
  &:disabled {
    background: white;
    border: 1px solid #cac6c4;
    color: #cac6c4;
  }
`;
const Span = styled("span")`
  margin-right: 13px;
  margin-top: 3px;
  font-family: "Poppins";
  font-size: 25px;
  font-weight: 400;
`;
