import React from "react";
import { render, screen, mount } from "@testing-library/react";
import renderer from "react-test-renderer";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Navbar from "../navbar";
import * as DarkContext from "../../../context/dark/context";
import "jest-styled-components";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "/",
      query: "",
      asPath: "/",
    };
  },
}));
jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));
describe("Navbar", () => {
  test("snapshot test", async () => {
    await new Promise((resolve) => {
      window.setTimeout(resolve, 0);
    });

    const contextValues = { state: { isDark: false } };
    jest
      .spyOn(DarkContext, "useDarkContext")
      .mockImplementation(() => contextValues);
    const wrapper = Enzyme.mount(<Navbar />);
    expect(wrapper).toMatchSnapshot();
  });
});
