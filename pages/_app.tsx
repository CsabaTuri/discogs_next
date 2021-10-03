import React from "react";
import type { AppProps } from 'next/app'
import "bootstrap/dist/css/bootstrap.min.css";
import { appWithTranslation } from "next-i18next";
import * as nextI18NextConfig from "../next-i18next.config.js";
import "../styles/colors.scss";
import Error from "./_error";
import Router from "next/router";
import { CookiesProvider } from "react-cookie";
import { Provider as DarkProvider } from "../src/context/dark/provider";
import { Provider as DataProvider } from "../src/context/data/provider";
import { Provider as SearchProvider } from "../src/context/search/provider";
import { Provider as UserProvider } from "../src/context/user/provider";
import { Provider as NotificationProvider } from "../src/context/notification/provider";
import Spinner from "react-bootstrap/Spinner";
import NextNProgress from "nextjs-progressbar";
function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  function show() {
    setIsLoading(true);
  }
  function hide() {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  Router.events.on("routeChangeStart", () => show());
  Router.events.on("routeChangeComplete", () => hide());
  Router.events.on("routeChangeError", () => hide());

  return (
    <CookiesProvider>
      <DarkProvider>
        <DataProvider>
          <SearchProvider>
            <UserProvider>
              <NotificationProvider>
                <>
                  <div
                    style={{
                      position: "fixed",
                      backgroundColor: "grey",
                      opacity: ".9",
                      zIndex: 10,
                      border: "thin solid lightgreey",
                      borderRadius: "1em",
                      top: "50%",
                      left: "50%",
                      padding: "2em 5em",
                      transform: "translate(-50%,-50%)",
                      display: isLoading ? "none" : "none",
                    }}
                  >
                    <Spinner
                      animation="border"
                      style={{
                        position: "relative",
                        color: "white",
                        width: "3em",
                        height: "3em",
                      }}
                    />
                    <span
                      className="sr-only"
                      style={{
                        color: "white",
                        margin: "2em",
                      }}
                    >
                      Loading...
                    </span>
                  </div>
                  {pageProps.errorCode ? (
                    <Error
                      statusCode={pageProps.errorCode[0].extensions.code}
                      title={pageProps.errorCode[0].message}
                    />
                  ) : (
                    <>
                      <NextNProgress
                        color="#29D"
                        startPosition={0.3}
                        stopDelayMs={200}
                        height={6}
                        showOnShallow={false}
                        options={{ easing: 'ease', speed: 1000, showSpinner: false }}
                      />
                      <Component {...pageProps} />
                    </>
                  )}
                </>
              </NotificationProvider>
            </UserProvider>
          </SearchProvider>
        </DataProvider>
      </DarkProvider>
    </CookiesProvider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
