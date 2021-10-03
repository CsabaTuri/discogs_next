import  styled from "styled-components";
import Row from "react-bootstrap/Row";

export const StyledRow = styled(Row)`
  background-color: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.fg};
`;
