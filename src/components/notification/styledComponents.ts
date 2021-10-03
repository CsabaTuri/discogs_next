import Card from "react-bootstrap/Card";
import styled from "styled-components";
export const StyledNotification = styled(Card)`
  position: fixed;
  top: 90%;
  width: 20%;
  right:5%;
  text-align: center;
  z-index: 10;
  opacity:.8;
  .danger {
    background-color: ${(props) => props.theme.danger};
    color: white;
  }
  .success {
    background-color: ${(props) => props.theme.success};
    color: white;
  }
  .warning {
    background-color: ${(props) => props.theme.warning};
    color: white;
  }
`;
