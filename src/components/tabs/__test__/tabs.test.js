import React from "react";
import { render, screen, mount } from "@testing-library/react";
import renderer from "react-test-renderer";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Tabs from "../tabs";
import * as DarkContext from "../../../context/dark/context";
import "jest-styled-components";

Enzyme.configure({ adapter: new Adapter() });

const mockData = {
  getFavoritesArtist: [
    {
      __typename: "FavArtists",
      artist_name: "Martin Birch",
      artist_id: "251596",
    },
    {
      __typename: "FavArtists",
      artist_name: "John Golden",
      artist_id: "265502",
    },
    {
      __typename: "FavArtists",
      artist_name: "Nilesh Patel",
      artist_id: "386598",
    },
  ],
  getFavoritesMaster: [
    {
      __typename: "FavMasters",
      master_name: "Pet Shop Boys - It's Alright",
      master_id: "32710",
    },
    {
      __typename: "FavMasters",
      master_name: "Pixies - Indie Cindy",
      master_id: "677440",
    },
    {
      __typename: "FavMasters",
      master_name: "J. Cole - 2014 Forest Hills Drive",
      master_id: "767810",
    },
  ],
  getFavoritesLabel: [
    {
      __typename: "FavLabels",
      label_name: "The Mastering Lab",
      label_id: "186075",
    },
    {
      __typename: "FavLabels",
      label_name: "SST Brüggemann GmbH",
      label_id: "265113",
    },
    {
      __typename: "FavLabels",
      label_name: "Record Technology Incorporated",
      label_id: "66254",
    },
  ],
  getFavoritesRelease: [
    {
      __typename: "FavReleases",
      release_name: "Velvet Acid Christ - Fun With Knives",
      release_id: "10521",
    },
    {
      __typename: "FavReleases",
      release_name: "X-102 - Titan EP",
      release_id: "1393615",
    },
    {
      __typename: "FavReleases",
      release_name: "Caetano* E Chico* - Juntos E Ao Vivo",
      release_id: "2664677",
    },
  ],
};
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
describe("Tabs", () => {
  test("snapshot test", async () => {
    await new Promise((resolve) => {
      window.setTimeout(resolve, 0);
    });

    const contextValues = { state: { isDark: false } };
    jest
      .spyOn(DarkContext, "useDarkContext")
      .mockImplementation(() => contextValues);
    const wrapper = Enzyme.mount(<Tabs data={mockData} />);
    expect(wrapper).toMatchSnapshot();
  });
});
