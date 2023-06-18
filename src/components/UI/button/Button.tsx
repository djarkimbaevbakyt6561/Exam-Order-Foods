import { Button as MuiButton, ButtonProps, styled } from "@mui/material";

export const Button = ({ children, onClick, ...props }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(MuiButton)(() => ({
  backgroundColor: "#5c1a01",
  color: "#ffffff",
  padding: "10px 32px",
  borderRadius: "20px",
  fontSize: "0.875rem",
  "&:hover": {
    backgroundColor: "#5c1a01",
  },
}));
