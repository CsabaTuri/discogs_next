import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";

export const StyledNavbar = styled(Navbar)`
  background-color: ${(props) => props.theme.bg};
  transition: all 500ms;
  position: relative;
  width: 100%;
  top: 0;
  z-index: 3;
  padding: 0.5em 0;
  .show.navbar-collapse {
    width: 50%;
  }
  @media only screen and (min-width: 900px) {
    padding: 0.5em 0;
    &.transparent {
      background-color: transparent;
      padding: 2em 0;
      transition: all 500ms;
    }
  }
`;
export const Settings = styled(Navbar)`
  justify-content: end;
`;
export const StyledThemeSwitcher = styled("a")`
  padding: 0.4em 1em;
  margin-left: 1em;
  text-decoration: none;
  cursor: pointer;
  background-color: ${(props) => props.theme.bg};
  @media only screen and (min-width: 900px) {
    background-color: transparent;
  }
  border-radius: 3px;
  display: inline-flex;
  color: ${(props) => props.theme.fg};
  & ~ svg {
    margin: 1.4em;
  }
  &:hover {
    text-decoration: none;
    background: linear-gradient(
      120deg,
      transparent,
      ${(props) => props.theme.fg},
      transparent
    );
    transition: all 650ms;
    color: ${(props) => props.theme.fg};
  }
  &.active {
    color: ${(props) => props.theme.bg};
    background-color: ${(props) => props.theme.bg};
  }
`;
export const StyledLangSwitcher = styled(Link)`
  a {
    padding: 0.4em 1em;
    margin-left: 1em;
    text-decoration: none;
    cursor: pointer;
    background-color: ${(props) => props.theme.bg};
    @media only screen and (min-width: 900px) {
      background-color: transparent;
    }
    border-radius: 3px;
    display: inline-flex;
    color: ${(props) => props.theme.fg};
    & ~ svg {
      margin: 1.4em;
    }
    &:hover {
      text-decoration: none;
      background: linear-gradient(
        120deg,
        transparent,
        ${(props) => props.theme.fg},
        transparent
      );
      transition: all 650ms;
      color: ${(props) => props.theme.fg};
    }
    &.active {
      color: ${(props) => props.theme.bg};
      background-color: ${(props) => props.theme.bg};
    }
  }
`;

export const StyledLink = styled("a")`
  padding: 0.3em 1em;
  margin: 0 1em;
  border-bottom-width: 0;
  text-decoration: none;
  cursor: pointer;
  color: ${(props) => props.theme.fg};
  background-color: transparent;
  &:hover {
    color: ${(props) => props.theme.bg};
    background: linear-gradient(
      120deg,
      transparent,
      ${(props) => props.theme.fg},
      transparent
    );
    transition: all 650ms;
  }
`;
export const StyledLinkButton = styled("p")`
  padding: 0.3em 1em;
  margin: 0 1em;
  border-bottom-width: 0;
  text-decoration: none;
  color: ${(props) => props.theme.fg};
  background-color: transparent;
  &:hover {
    color: ${(props) => props.theme.bg};
    background: linear-gradient(
      120deg,
      transparent,
      ${(props) => props.theme.fg},
      transparent
    );
    transition: all 650ms;
  }
`;
export const StyledLinkDiv = styled("div")`
  @media only screen and (max-width: 900px) {
    text-align: center;
  }
`;
StyledNavbar.defaultProps = {
  theme: {
    bg: "var(--dark-bg)",
    fg: "var(--dark-fg)",
  },
};

StyledThemeSwitcher.defaultProps = {
  theme: {
    bg: "var(--dark-bg)",
    fg: "var(--dark-fg)",
  },
};
StyledLink.defaultProps = {
  theme: {
    bg: "var(--dark-bg)",
    fg: "var(--dark-fg)",
  },
};
StyledLangSwitcher.defaultProps = {
  theme: {
    bg: "var(--dark-bg)",
    fg: "var(--dark-fg)",
  },
};
