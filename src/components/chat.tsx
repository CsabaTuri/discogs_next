import React, { useState, useEffect, useRef } from "react"
import Button from "react-bootstrap/Button"
import { useUserContext } from "../context/user/context";
import { MESSAGE } from "../../services/client/queries";
import { useCookies } from "react-cookie";
import createClient from "../../services/client/client";
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Collapse from "react-bootstrap/Collapse";
const SocketIOClient = require("socket.io-client");
interface IMsg {
  user: string;
  msg: string;
}
// create random user
const user = "User_" + String(new Date().getTime()).substr(-3);
// component

export default function Chat(props: any) {
  const inputRef = useRef<any>(null);
  const { state: userState }: any = useUserContext();
  const { user_name } = userState.user;
  const [messages, setMessages] = React.useState<any[]>([]);
  const [perPage, setperPage] = React.useState<number>(10);
  // connected flag
  const [connected, setConnected] = useState<boolean>(false);
  // init chat and message
  const [chat, setChat] = useState<IMsg[]>([]);
  const [msg, setMsg] = useState<string>("");
  const [cookies] = useCookies<string>(["auth"]);

  useEffect((): any => {
    getMessage()
  }, [perPage])

  useEffect((): any => {
    getMessage()
    // connect to socket server
    const socket = SocketIOClient.connect(process.env.BASE_URL, {
      path: "/api/socketio",
    });
    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });
    // update chat on new message dispatched
    socket.on("message", (message: IMsg) => {
      chat.push(message);
      setChat([...chat]);
    });
    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);
  function dateFormat(date: any): String {
    var formatedDate = null
    if (Date.now() - (date * 1) < 864000) {
      formatedDate = new Date(date * 1).toLocaleTimeString("hu-HU");
    }
    else {
      formatedDate = new Date(date * 1).toLocaleString("hu-HU");
    }
    return formatedDate
  }
  async function getMessage(): Promise<void> {
    const token = cookies.token || "";
    const client = createClient(token);
    let { data } = await client.query({
      query: MESSAGE, variables: {
        per_page: perPage,
      },
    });
    let { message } = data
    let sortedMessage = [...message].sort((a: any, b: any) => a.date - b.date)
    setMessages(sortedMessage)
  }
  const sendMessage = async () => {
    if (msg) {
      // build message obj
      const message: IMsg = {
        user: user_name,
        msg,
      };
      // dispatch message to other users
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      // reset field if OK
      if (resp.ok) setMsg("");
    }
    // focus after click
    inputRef?.current?.focus();
  };
  return (
    <Row className="justify-content-md-center" >
      <Col >

        <Collapse in={props.open}>
          <Row>
            <Col
              md={{ span: 3, offset: 9 }} id="chat-div">
              <Button
                onClick={() => setperPage(perPage + 10)}
                variant="outline-info"
              >
                more...
              </Button>
              <Button
                onClick={() => props.setOpen(false)}
                aria-controls="form-collapse"
                variant="outline-danger"
                aria-expanded={props.open}
              >
                Close
              </Button>
              <div id="chat" style={{ maxHeight: "300px", overflowY: "scroll" }}>
                {
                  messages.map((m: any, i: number) => {
                    return (
                      <div key={"msg_" + i} >
                        <span
                        >
                          {dateFormat(m.date)} -
                          {m.user}
                        </span>
                        : {m.msg}
                      </div>
                    )
                  })
                }
                {
                  chat.map((chat, i) => (
                    <div key={"msg_" + i} >
                      <span
                      >
                        now -
                        {chat.user === user ? user_name : chat.user}
                      </span>
                      : {chat.msg}
                    </div>
                  ))
                }
              </div>
              <div >
                <div >
                  <Form.Group controlId="type">
                    <Form.Control
                      type="text"
                      ref={inputRef}
                      value={msg}
                      placeholder={connected ? "Type a message..." : "Connecting..."}
                      disabled={!connected}
                      onChange={(e) => {
                        setMsg(e.target.value);
                      }}
                      onKeyPress={(e: any) => {
                        if (e.key === "Enter") {
                          sendMessage();
                        }
                      }}
                    />
                  </Form.Group>
                </div>
                <div >
                  <Button
                    onClick={sendMessage}
                    disabled={!connected}
                    variant="outline-info"
                  >
                    SEND
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Collapse>
      </Col>
    </Row>
  );
};
