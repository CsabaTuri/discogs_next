import React from "react";
import Head from "next/head";
import createClient from "../services/client/client";
import Col from "react-bootstrap/Col";
import Layout from "../src/components/layout";
import MyTabs from "../src/components/tabs";
import { FAVORITES } from "../services/client/queries";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { requireAuthentication } from "../services/auth/requireAuthentication";
import useRouterRefresh from "../services/client/routerRefresh";
import { FavoritesObject, CTX } from "../types"


export default function Home(props: FavoritesObject) {
  const { data } = props;
  useRouterRefresh();
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Col md={8}>
        <MyTabs data={data} />
      </Col>
    </Layout>
  );
}

export const getServerSideProps = requireAuthentication(async (context: CTX) => {
  const token = JSON.parse(JSON.stringify(context.req.cookies)).token || "";

  const locale = context.locale;

  const client = createClient(token);
  const { data, errors } = await client.query({
    query: FAVORITES,
  });
  let errorCode = errors ? errors : false;
  if (errorCode) {
    context.res.statusCode = 404;
  }

  return {
    props: {
      errorCode,
      data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
});
