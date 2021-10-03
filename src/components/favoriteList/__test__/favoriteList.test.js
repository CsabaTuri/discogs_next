import React from "react";
import { render, screen, mount } from "@testing-library/react";
import renderer from "react-test-renderer";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import FavoriteList from "../favoriteList";
import * as DarkContext from "../../../context/dark/context";
import "jest-styled-components";

Enzyme.configure({ adapter: new Adapter() });
const testFavoriteListData = {
  title: "Release",
  data: [
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
  mutation: {
    kind: "Document",
    definitions: [
      {
        kind: "OperationDefinition",
        operation: "mutation",
        name: { kind: "Name", value: "removeReleaseFromFavorites" },
        variableDefinitions: [
          {
            kind: "VariableDefinition",
            variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
            type: {
              kind: "NonNullType",
              type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
            },
            directives: [],
          },
        ],
        directives: [],
        selectionSet: {
          kind: "SelectionSet",
          selections: [
            {
              kind: "Field",
              name: { kind: "Name", value: "remove_release_from_favorites" },
              arguments: [
                {
                  kind: "Argument",
                  name: { kind: "Name", value: "release_id" },
                  value: {
                    kind: "Variable",
                    name: { kind: "Name", value: "id" },
                  },
                },
              ],
              directives: [],
            },
          ],
        },
      },
    ],
    loc: { start: 0, end: 106 },
  },
  type: "release",
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
describe("FavoriteList", () => {
  test("snapshot test", async () => {
    await new Promise((resolve) => {
      window.setTimeout(resolve, 0);
    });

    const contextValues = { state: { isDark: false } };
    jest
      .spyOn(DarkContext, "useDarkContext")
      .mockImplementation(() => contextValues);
    const wrapper = Enzyme.mount(
      <FavoriteList
        data={testFavoriteListData.data}
        mutation={testFavoriteListData.mutation}
        type={testFavoriteListData.type}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
