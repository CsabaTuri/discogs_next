import styled from "styled-components";
import Tabs from "react-bootstrap/Tabs";

export const StyledTabs = styled(Tabs)`
  a {
    padding: 0.4em 1em;
    margin-left: 1em;
    text-decoration: none;
    cursor: pointer;
    background-color: ${(props) => props.theme.bg};
    border: none;
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
      border: none;
    }
    &.active {
      text-decoration: none;
      background: linear-gradient(
        120deg,
        transparent,
        ${(props) => props.theme.fg},
        transparent
      );
      transition: all 650ms;
      color: ${(props) => props.theme.fg};
      border: none;
    }
  }
`;

StyledTabs.defaultProps = {
  theme: {
    bg: "var(--dark-bg)",
    fg: "var(--dark-fg)",
  },
};
