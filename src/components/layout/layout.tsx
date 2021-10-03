import React from "react";
import Notification from "../notification"
import Container from "react-bootstrap/Container";
import { ThemeProvider } from "styled-components"
import { StyledRow } from "./styledComponents";
import Navs from "../navbar";
import { useDarkContext } from "../../context/dark/context"
import { darkTheme, lightTheme } from "../../../themes/theme"
import GlobalStyle from "../../../styles/globasstyle"
const Layout = (props: any) => {
  const { children } = props;
  const { state } = useDarkContext()
  const { isDark } = state


  return (

    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Navs />
      <Notification />
      <Container>
        <StyledRow className="justify-content-md-center">{children}</StyledRow>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
