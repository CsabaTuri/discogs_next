import Head from "next/head";
import type { NextPage } from 'next'
import { useCookies } from "react-cookie";
import createClient from "../../services/client/client";
import { GENRES } from "../../services/client/queries";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import React from "react";
import Layout from "../../src/components/layout";
import Artist from "../../src/components/results/artist";
import Label from "../../src/components/results/label";
import Master from "../../src/components/results/master";
import Release from "../../src/components/results/release";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { requireAuthentication } from "../../services/auth/requireAuthentication";
import { GenresObject, GenreData, GetFavoritesArtist, GetFavoritesLabel, GetFavoritesMaster, GetFavoritesRelease, CTX } from "../../types"


const Genre: NextPage<GenresObject> = (props: GenresObject) => {
  const { data, title } = props;
  const [array, setArray] = React.useState<GenreData>(data);
  const [page, setPage] = React.useState<number>(1);
  const [favoriteArtistId, setFavoriteArtistId] = React.useState<number[]>([]);
  const [favoriteMasterId, setFavoriteMasterId] = React.useState<number[]>([]);
  const [favoriteReleaseId, setFavoriteReleaseId] = React.useState<number[]>([]);
  const [favoriteLabelId, setFavoriteLabelId] = React.useState<number[]>([]);
  const [cookies] = useCookies<string>(["auth"]);
  React.useEffect(() => {
    search();
  }, [page]);

  function next():void {
    if (page < array.genres.pagination.pages) {
      setPage(page + 1);
    }
  }
  function prev():void  {
    if (page > 1) {
      setPage(page - 1);
    }
  }
  function first():void  {
    setPage(1);
  }
  function last():void  {
    setPage(array.genres.pagination.pages);
  }

  async function search():Promise<void> {
    const token = cookies.token || "";

    const client = createClient(token);
    const { data, errors } = await client.query({
      query: GENRES,
      variables: {
        slug: title,
        page: page,
      },
    });
    if (errors) {
      console.log(errors);
      alert(errors[0].message);
    } else {
      setArray(data);
      let ArtistIds: number[] = [];
      let MasterIds: number[] = [];
      let ReleaseIds: number[] = [];
      let LabelIds: number[] = [];
      await data.getFavoritesArtist.map((elem: GetFavoritesArtist) => {
        ArtistIds.push(elem.artist_id);
      });
      await data.getFavoritesMaster.map((elem: GetFavoritesMaster) => {
        MasterIds.push(elem.master_id);
      });
      await data.getFavoritesRelease.map((elem: GetFavoritesRelease) => {
        ReleaseIds.push(elem.release_id);
      });
      await data.getFavoritesLabel.map((elem: GetFavoritesLabel) => {
        LabelIds.push(elem.label_id);
      });
      await setFavoriteArtistId(ArtistIds);
      await setFavoriteMasterId(MasterIds);
      await setFavoriteReleaseId(ReleaseIds);
      await setFavoriteLabelId(LabelIds);
    }

  }
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Col>
        <h1>{title}</h1>
        {`${page}/${array.genres.pagination.pages}`}

        <Pagination>
          <Pagination.First onClick={first} />
          <Pagination.Prev onClick={prev} />
          <Pagination.Next onClick={next} />
          <Pagination.Last onClick={last} />
        </Pagination>
        {array === null
          ? "Loading..."
          : array.genres.results.map((result: any) => {
            if (result.type === "artist") {
              return <Artist data={result} ids={favoriteArtistId} />;
            }
            if (result.type === "master") {
              return <Master data={result} ids={favoriteMasterId} />;
            }
            if (result.type === "label") {
              return <Label data={result} ids={favoriteLabelId} />;
            }
            if (result.type === "release") {
              return <Release data={result} ids={favoriteReleaseId} />;
            }
          })}
      </Col>
    </Layout>
  );
}
export default Genre
export const getServerSideProps = requireAuthentication(async (context: CTX) => {
  const slug = context.query.slug;
  const locale = context.locale
  const token = JSON.parse(JSON.stringify(context.req.cookies)).token || "";

  const client = createClient(token);
  const { data, errors } = await client.query({
    query: GENRES,
    variables: {
      slug: slug,
      page: 1,
    },
  });
  let errorCode = errors ? errors : false;
  if (errorCode) {
    context.res.statusCode = 404;
  }

  return { props: { errorCode, data, title: slug, ...await serverSideTranslations(locale, ['common']) } };

})
