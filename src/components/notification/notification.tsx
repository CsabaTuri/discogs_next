import React from "react";
import { StyledNotification } from "./styledComponents";
import { useNotificationContext } from "../../context/notification/context";
const Notification = () => {
  const { state } = useNotificationContext();
  const { text, type } = state;
  console.log(state)
  const [show, setShow] = React.useState(false);
  const [mount, setMount] = React.useState(false);
  React.useEffect(() => {
    if (mount) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
    setMount(true);
  }, [state]);
  return (
    <StyledNotification style={{ display: show ? "block" : "none" }}>
      <StyledNotification.Body className={type}>{text}</StyledNotification.Body>
    </StyledNotification>
  );
};
export default Notification;
