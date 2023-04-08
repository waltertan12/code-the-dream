import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

const Button = styled.button`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes[2]}px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.radii.default}px;
  padding: ${({ theme }) => theme.space[2]}px ${({ theme }) => theme.space[4]}px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const StyledComponentApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <Button>Click me</Button>
    </ThemeProvider>
  );
};

export default StyledComponentApp;
