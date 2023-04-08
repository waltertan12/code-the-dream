import { Button as RebassButton } from "rebass/styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

const Button = (props) => (
  <RebassButton
    {...props}
    sx={{
      fontFamily: "body",
      backgroundColor: "primary",
      color: "white",
      borderRadius: "default",
      cursor: "pointer",
      py: 2,
      px: 4,
      "&:hover": {
        backgroundColor: "secondary",
      },
    }}
  />
);

const RebassApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <Button>Click me</Button>
    </ThemeProvider>
  );
};

export default RebassApp;
