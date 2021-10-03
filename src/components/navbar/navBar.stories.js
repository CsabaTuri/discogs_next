import React from "react";
import Navbar from "./navbar";

export default {
  title: "Components/Navbar",
  component: Navbar,
};

const Template = (args) => <Navbar {...args} />;

export const Primary = Template.bind({});

Primary.story = {
  parameters: {
    nextRouter: {
      path: "/",
      asPath: "/",
      query: {
        id: "",
      },
    },
  },
};
