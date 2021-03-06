import React from "react";
import Head from "next/head";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Layout from "../src/components/layout";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { requireAuthentication } from "../services/auth/requireAuthentication";
import createClient from "../services/client/client";
import { USER, DELETE_ACC } from "../services/client/queries";
import { CTX } from "../types"
import { useTranslation } from "next-i18next";
import { FaTrash } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { useNotificationContext } from "../src/context/notification/context";
import { useUserContext } from "../src/context/user/context";
import { useRouter } from 'next/router'
const User: any = (props: any) => {
  const { data } = props
  const { userData } = data.user
  const { user_name, email, first_name, last_name } = userData
  const [show, setShow] = React.useState(false);
  const { t } = useTranslation("common");
  const [cookies, _setCookie, removeCookie] = useCookies<any>(["auth"]);
  const { dispatch }: any = useNotificationContext();
  const { dispatch: userDispatch }: any = useUserContext();
  const router = useRouter()

  async function deleteAcc() {
    const token = cookies.token;
    const client = createClient(token);
    const { errors } = await client.mutate({
      mutation: DELETE_ACC,
    });
    if (errors) {
      dispatch({ type: "notification", payload: { text: errors[0].message, type: "danger" } })
    } else {
      removeCookie("token");
      userDispatch({ type: "user", payload: {} });
      router.push("/login");
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Layout>
      <Head>
        <title>User</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>{t("user_name")}</th>
            <th>{t("first_name")}</th>
            <th>{t("last_name")}</th>
            <th>Email</th>
            <th>{t("delete")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td >{user_name}</td>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{email}</td>
            <td><Button
              variant="danger"
              onClick={handleShow}
            >
              <FaTrash />
            </Button></td>
          </tr>
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>{t("delete_acc_header")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t("delete_acc_text")}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("close")}
          </Button>
          <Button variant="primary" onClick={deleteAcc}>
            {t("delete")}
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}


export default User
export const getServerSideProps = requireAuthentication(async (context: CTX) => {
  const locale = context.locale
  const token = JSON.parse(JSON.stringify(context.req.cookies)).token || "";

  const client = createClient(token);
  const { data, errors } = await client.query({
    query: USER
  });
  let errorCode = errors ? errors : false;
  if (errorCode) {
    context.res.statusCode = 404;
  }

  return { props: { errorCode, data, ...await serverSideTranslations(locale, ['common']) } };

})
