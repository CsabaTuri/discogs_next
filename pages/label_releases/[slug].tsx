import React from "react";
import Head from "next/head";
import createClient from "../../services/client/client";
import Pagination from "react-bootstrap/Pagination";
import { useCookies } from "react-cookie";
import { LABEL_RELEASE } from "../../services/client/queries";
import Col from "react-bootstrap/Col";
import Layout from "../../src/components/layout";
import Release from "../../src/components/results/release";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { requireAuthentication } from "../../services/auth/requireAuthentication";
import { LabelReleasesObject, GetFavoritesRelease, CTX  } from "../../types"


export default function LabelReleases(props: LabelReleasesObject) {
  const { data, slug } = props;

  const [array, setArray] = React.useState(data);
  const [page, setPage] = React.useState(1);
  const [favoriteReleaseId, setFavoriteReleaseId] = React.useState<number[]>([]);
  const [cookies] = useCookies<any>(["auth"]);
  React.useEffect(() => {
    search();
  }, [page]);

  function next() {
    if (page < array.labelReleases.pagination.pages) {
      setPage(page + 1);
    }
  }
  function prev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }
  function first() {
    setPage(1);
  }
  function last() {
    setPage(array.labelReleases.pagination.pages);
  }

  async function search() {
    const token = cookies.token || "";

    const client = createClient(token);
    const { data, errors } = await client.query({
      query: LABEL_RELEASE,
      variables: {
        slug: slug,
        page: page,
      },
    });
    if (errors) {
      console.log(errors);
      alert(errors[0].message);
    } else {
      setArray(data);
      let ReleaseIds: number[] = [];
      await data.getFavoritesRelease.map((elem: GetFavoritesRelease) => {
        ReleaseIds.push(elem.release_id);
      });
      await setFavoriteReleaseId(ReleaseIds);
    }

  }
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Col md={8}>
        {`${page}/${array.labelReleases.pagination.pages}`}
        <Pagination>
          <Pagination.First onClick={first} />
          <Pagination.Prev onClick={prev} />
          <Pagination.Next onClick={next} />
          <Pagination.Last onClick={last} />
        </Pagination>

        {array === null
          ? "Loading..."
          : array.labelReleases.releases.map((result: any) => {
            return <Release data={result} ids={favoriteReleaseId} />;
          })}
      </Col>
    </Layout>
  );
}

export const getServerSideProps = requireAuthentication(async (context: CTX) => {
  const slug = context.query.slug;
  const locale = context.locale
  const token = JSON.parse(JSON.stringify(context.req.cookies)).token || "";

  const client = createClient(token);
  const { data, errors } = await client.query({
    query: LABEL_RELEASE,
    variables: {
      slug: slug,
      page: 1,
    },
  });
  let errorCode = errors ? errors : false;
  if (errorCode) {
    context.res.statusCode = 404;
  }

  return { props: { errorCode, data, slug: slug, ...await serverSideTranslations(locale, ['common']) } };

}
)