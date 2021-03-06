import React from "react";
import type { NextPage } from 'next'
import Head from "next/head";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useCookies } from "react-cookie";
import createClient from "../../../services/client/client";
import { ARTIST_RELEASE } from "../../../services/client/queries";
import Col from "react-bootstrap/Col";
import Layout from "../../../src/components/layout";
import Artist from "../../../src/components/results/artist";
import Label from "../../../src/components/results/label";
import Master from "../../../src/components/results/master";
import Release from "../../../src/components/results/release";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { requireAuthentication } from "../../../services/auth/requireAuthentication";
import { ArtistReleaseObject, ArtistReleaseData, Releases, GetFavoritesArtist, GetFavoritesLabel, GetFavoritesMaster, GetFavoritesRelease, CTX } from "../../../types"
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router'


const ArtistRelease: NextPage<ArtistReleaseObject> = (props: ArtistReleaseObject) => {
  const { data, slug } = props;
  const [array, setArray] = React.useState<ArtistReleaseData>(data);
  const [page, setPage] = React.useState<string>("1");
  const [per_page, setPer_page] = React.useState<string>("10");
  const [favoriteArtistId, setFavoriteArtistId] = React.useState<number[]>([]);
  const [favoriteMasterId, setFavoriteMasterId] = React.useState<number[]>([]);
  const [favoriteReleaseId, setFavoriteReleaseId] = React.useState<number[]>([]);
  const [favoriteLabelId, setFavoriteLabelId] = React.useState<number[]>([]);
  const { t } = useTranslation("common");
  const router = useRouter()


  React.useEffect(() => {
    search();
  }, [props, per_page]);

  function next(): void {
    if (page < array.artistReleases.pagination.pages) {
      router.push({ pathname: slug, query: { page: (parseInt(page) + 1).toString(), per_page: per_page } })
    }
  }
  function prev(): void {
    if (parseInt(page) > 1) {
      router.push({ pathname: slug, query: { page: (parseInt(page) - 1).toString(), per_page: per_page } })
    }
  }
  function first(): void {
    router.push({ pathname: slug, query: { page: "1", per_page: per_page } })
  }
  function last(): void {
    router.push({ pathname: slug, query: { page: array.artistReleases.pagination.pages.toString(), per_page: per_page } })
  }
  function perPageChange(e: any): void {
    router.push({ pathname: slug, query: { page: "1", per_page: e.target.value } })
  }
  async function search(): Promise<void> {
    setArray(props.data);
    setPage(array.artistReleases.pagination.page)
    setPer_page(array.artistReleases.pagination.per_page)
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

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Col md={8}>
        {`${page}/${array.artistReleases.pagination.pages}`}
        <p>{t("item")}:{array.artistReleases.pagination.items}</p>
        <p >{t("page")}:{`${page}/${array.artistReleases.pagination.pages}`}</p>
        <div style={{ display: "inline" }}>
          <Form.Label>{`${t("item")}/${t("page")}`}:</Form.Label>
          <Form.Control
            as="select"
            name="per_page"
            onChange={perPageChange}
            value={per_page}
            style={{ maxWidth: "60px", display: "inline" }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </Form.Control>
        </div>
        <Button variant="outline-info" onClick={first}>
          {t("first")}
        </Button>
        <Button variant="outline-info" onClick={prev}>
          {t("prev")}
        </Button>
        <Button variant="outline-info" onClick={next}>
          {t("next")}
        </Button>
        <Button variant="outline-info" onClick={last}>
          {t("last")}
        </Button>
        <ul>
          {array.artistReleases.releases.map((result: Releases) => {
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
        </ul>
      </Col>
    </Layout>
  );
}
export default ArtistRelease

export const getServerSideProps = requireAuthentication(async (context: CTX) => {
  const slug = context.query.slug;
  const locale = context.locale;
  const token = JSON.parse(JSON.stringify(context.req.cookies)).token || "";
  const { page, per_page } = context.query
  const client = createClient(token);
  const { data, errors } = await client.query({
    query: ARTIST_RELEASE,
    variables: {
      slug: slug,
      page: page || "1",
      per_page: per_page || "10"
    },
  });
  let errorCode = errors ? errors : false;
  if (errorCode) {
    context.res.statusCode = 404;
  }

  return {
    props: {
      errorCode,
      data,
      slug: slug,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
});
