import React from "react";
import Head from "next/head";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import createClient from "../../services/client/client";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useUserContext } from "../context/user/context";
import { useNotificationContext } from "../context/notification/context";
import LoginLayout from "./loginLayout";
import { LOGIN } from "../../services/client/queries";

export default function SignIn() {
  const { dispatch: userDispatch } = useUserContext();
  const [_cookies, setCookie] = useCookies<any>(["auth"]);
  const [isLoad, setIsLoad] = React.useState<boolean>(false);
  const [loginData, setLoginData] = React.useState({
    user_name: "",
    password: "",
  });
  const router = useRouter();
  const { dispatch }: any = useNotificationContext();
  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoad(true)
    const client = createClient();
    const { data, errors } = await client.query({
      query: LOGIN,
      variables: {
        user_name: loginData.user_name,
        password: loginData.password,
      },
    });
    if (errors) {
      dispatch({ type: "notification", payload: { text: errors[0].message, type: "danger" } })
      setIsLoad(false)
    } else {
      const token = data.login.token;
      const userData = data.login.userData;
      userDispatch({ type: "user", payload: userData });
      setCookie("token", token);
      setIsLoad(false)
      router.push("/");
    }
  }
  function handleChange(e: any) {
    const { name, value } = e.target;
    setLoginData((inputs) => ({ ...inputs, [name]: value }));
  }

  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <LoginLayout>
        <Col sm={12} md={6} lg={4}>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <h1 className="h3 mb-3 font-weight-normal">{isLoad ? "Log in..." : "Please sign in"}</h1>

            <Form.Group controlId="artist">
              <Form.Label>User name</Form.Label>
              <Form.Control
                type="text"
                name="user_name"
                onChange={handleChange}
                placeholder="User name or email"
              />
            </Form.Group>
            <Form.Group controlId="artist">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="*************"
              />
            </Form.Group>
            <Button type="submit" variant="outline-info">
              Sign In
            </Button>
          </Form>
        </Col>
      </LoginLayout>
    </>
  );
}
