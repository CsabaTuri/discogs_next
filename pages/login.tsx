import React from "react";
import Button from "react-bootstrap/Button";
import SignIn from "../src/components/signin";
import Registration from "../src/components/registration";
import Notification from "../src/components/notification"
import { ThemeProvider } from "styled-components"
import { useDarkContext } from "../src/context/dark/context"
import { darkTheme, lightTheme } from "../themes/theme"
import GlobalStyle from "../styles/globasstyle"
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { CTX } from "../types";

export default function Login() {
  const [registration, setRegistration] = React.useState(false);
  const { state } = useDarkContext()
  const { isDark } = state
  if (registration) {
    return (<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle /> <Notification /><Button onClick={() => setRegistration(false)} >Login</Button><Registration /></ThemeProvider>);
  }
  return (<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
    <GlobalStyle /><Notification /> <Button onClick={() => setRegistration(true)} >Registration</Button><SignIn /></ThemeProvider>);
}

export const getServerSideProps: any = (
  async (context: CTX) => {
    const locale: string = context.locale;
    return { props: { ...await serverSideTranslations(locale, ['common']) } };
  }
);
