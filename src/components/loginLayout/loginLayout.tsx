import React from "react"
import Container from "react-bootstrap/Container"
import {StyledRow} from "./styledComponents";
import { ThemeProvider } from "styled-components"
import { darkTheme } from "../../../themes/theme"
import GlobalStyle from "../../../styles/globasstyle"
const LoginLayout = (props:any) => {
    const { children } = props
    
    return (
      <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <Container>
        <StyledRow className="justify-content-md-center">
        {children}
        </StyledRow>
      </Container>
      </ThemeProvider>
    )
  }
  
  
  export default LoginLayout