import { styled } from "styled-components";
import { Button } from "../../components/UI/button/Button";

export const AdminHeader = () => {
  return (
    <StyledHeder>
      <HeaderNavigation>
        <h1>Meals</h1>
        <Button>Log Out</Button>
      </HeaderNavigation>
    </StyledHeder>
  );
};

const StyledHeder = styled("header")`
  position: fixed;
  width: 100%;
  height: 101px;
  background-color: #8a2b06;
  padding: 22px 120px;
  color: #ffffff;
  top: 0;
  z-index: 998;
`;

const HeaderNavigation = styled("nav")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  font-size: 1.4rem;
`;
