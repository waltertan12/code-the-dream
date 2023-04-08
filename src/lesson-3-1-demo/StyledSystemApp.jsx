import styled from "styled-components";
import {
  space,
  fontSize,
  color,
  borderRadius,
  fontFamily,
} from "styled-system";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

const Button = styled.button`
  ${fontFamily}
  ${fontSize}
  ${space}
  ${color}
  ${borderRadius}
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

Button.defaultProps = {
  px: 4,
  py: 2,
  fontSize: 2,
  borderRadius: "default",
  fontFamily: "body",
};

const StyledSystemApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <Button>Click me</Button>
    </ThemeProvider>
  );
};

export default StyledSystemApp;
