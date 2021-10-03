import React from "react";
import { Provider as DarkProvider } from "../src/context/dark/provider";
import { Provider as DataProvider } from "../src/context/data/provider";
import { Provider as SearchProvider } from "../src/context/search/provider";
import { Provider as UserProvider } from "../src/context/user/provider";
import "bootstrap/dist/css/bootstrap.min.css";
import { I18nextProvider } from "react-i18next";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import i18n from "../i18next";
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  i18n,
  locale: "hu",
  locales: {
    en: "English",
    hu: "Magyar",
  },
};
export const decorators = [
  (Story) => (
    <UserProvider>
      <DarkProvider>
        <div style={{ height: "300vh" }}>
          <React.Suspense fallback={"Loading i18n..."}>
            <I18nextProvider i18n={i18n}>
              <Story />
            </I18nextProvider>
          </React.Suspense>
        </div>
      </DarkProvider>
    </UserProvider>
  ),
];
