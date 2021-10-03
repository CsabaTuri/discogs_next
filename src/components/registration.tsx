import React from "react";
import Head from "next/head";
import createClient from "../../services/client/client";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import LoginLayout from "./loginLayout";
import { REGISTRATION } from "../../services/client/queries";
import { useNotificationContext } from "../context/notification/context";
export default function Registration() {
  const [registrationData, setRegistrationata] = React.useState({
    user_name: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [isLoad, setIsLoad] = React.useState<boolean>(false);
  const { dispatch }: any = useNotificationContext();
  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoad(true)
    const client = createClient();
    const { errors } = await client.query({
      query: REGISTRATION,
      variables: {
        user_name: registrationData.user_name,
        email: registrationData.email,
        password: registrationData.password,
        first_name: registrationData.first_name,
        last_name: registrationData.last_name,
      },
    });
    if (errors) {
      dispatch({ type: "notification", payload: { text: errors[0].message, type: "danger" } })
      setIsLoad(false)
    } else {
      setIsLoad(false)
    }
  }
  function handleChange(e: any) {
    const { name, value } = e.target;
    setRegistrationata((inputs) => ({ ...inputs, [name]: value }));
  }
  return (
    <>
      <Head>
        <title>Registration Page</title>
      </Head>
      <LoginLayout>
        <Col sm={12} md={6} lg={4}>
          <Form className="form-signin" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="h3 mb-3 font-weight-normal">{isLoad ? "Send data..." : "Registration"}</h1>
            <Form.Group controlId="artist">
              <Form.Label>User name</Form.Label>
              <Form.Control
                type="text"
                name="user_name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="artist">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="artist">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="artist">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="artist">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" variant="outline-info">
              Registration
            </Button>
          </Form>
        </Col>
      </LoginLayout>
    </>
  );
}
