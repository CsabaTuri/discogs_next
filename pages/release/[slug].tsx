import React from "react";
import Head from "next/head";
import Link from "next/link";
import createClient from "../../services/client/client";
import { useCookies } from "react-cookie";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Layout from "../../src/components/layout";
import {
  RELEASES,
  ADD_RELEASE_TO_FAVORITES,
  REMOVE_RELEASE_FROM_FAVORITES
} from "../../services/client/queries";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { requireAuthentication } from "../../services/auth/requireAuthentication";
import { useNotificationContext } from "../../src/context/notification/context";
import { FaStar } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { ReleaseObject, ReleaseReleases } from "../../types"
import Youtube from "../../src/components/youtube"


const Release = (props: ReleaseObject) => {
  const { data } = props;
  const [isFavorite, setIsFavorite] = React.useState(true);
  const [cookies] = useCookies<any>(["auth"]);
  const { dispatch }: any = useNotificationContext();

  React.useEffect(() => {
    setFavoriteState()
  }, [])


  async function setFavoriteState(): Promise<void> {
    let Ids: number[] = [];
    await data.getFavoritesRelease.map((id: any) => {
      Ids.push(parseInt(id.release_id))
    });
    setIsFavorite(Ids.includes(id));
  }

  async function addToFavorites(id: number, name: string) {
    const token = cookies.token;

    const client = createClient(token);
    const { errors } = await client.mutate({
      mutation: ADD_RELEASE_TO_FAVORITES,
      variables: {
        release_id: id,
        release_name: name,
      },
    });
    if (errors) {
      dispatch({ type: "notification", payload: { text: "danger", type: "danger" } })
    } else {
      dispatch({ type: "notification", payload: { text: "success", type: "success" } })
      setIsFavorite(true);
    }
  }

  async function removeElemFromFavorites(data: ReleaseReleases) {
    const token = cookies.token;
    const client = createClient(token);
    const { errors } = await client.mutate({
      mutation: REMOVE_RELEASE_FROM_FAVORITES,
      variables: data,
    });
    if (errors) {
      dispatch({ type: "notification", payload: { text: "danger", type: "danger" } })
    } else {
      dispatch({ type: "notification", payload: { text: "success", type: "success" } })
      setIsFavorite(false);
    }
  }

  const {
    artists,
    year,
    styles,
    genres,
    tracklist,
    videos,
    title,
    labels,
    id,
  } = data.releases;

  function getArtistsName() {
    return artists.map(artist => { return artist.name })
  }

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Col md={8}>
        {!!artists
          ? artists.map((artist) => (
            <>
              <h1>
                <Link href={`/artist/${artist.id}`}>{artist.name}</Link>
              </h1>
              <Youtube data={artist.name} />
            </>
          ))
          : null}
        <h2>{title}</h2>
        <Youtube data={title} />
        <p>{year}</p>
        {!isFavorite ? (
          <Button
            variant="warning"
            onClick={() => addToFavorites(id, title)}
          >
            <FaStar />
          </Button>
        ) : (
          <Button
            variant="danger"
            onClick={() => removeElemFromFavorites(data.releases)}
          >
            <FaTrash />
          </Button>
        )}
        <br />
        {!!labels
          ? labels.map((label) => (
            <>
              <Link href={`/label/${label.id}`}>{label.name}</Link>
              <br />
            </>
          ))
          : null}
        {!!styles
          ? styles.map((style) => (
            <>
              <Link href={`/styles/${style.replace(/[\W_]+/g, "-")}`}>{style.replace(/[\W_]+/g, "-")}</Link>
              <br />
            </>
          ))
          : null}
        {!!genres
          ? genres.map((genre) => (
            <>
              {" "}
              <Link href={`/genres/${genre.replace(/[\W_]+/g, "-")}`}>{genre.replace(/[\W_]+/g, "-")}</Link>
              <br />
            </>
          ))
          : null}
        <ul>
          {tracklist.map((track) => (
            <li>
              {track.title}:{track.duration}
              <Youtube data={getArtistsName().join() + " " + title + " " + track.title} />
            </li>
          ))}
        </ul>
        <ul>
          {!!videos
            ? videos.map((video) => (
              <li>
                <div className="video-container">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.uri.split("=")[1]
                      }`}
                    className="video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                  />
                </div>
                <p>{video.title}</p>
                <p>{video.description}</p>
              </li>
            ))
            : null}
        </ul>
      </Col>
    </Layout>
  );
};
export default Release;

export const getServerSideProps = requireAuthentication(async (context: any) => {
  const slug = context.query.slug;
  const locale = context.locale;
  const token = JSON.parse(JSON.stringify(context.req.cookies)).token || "";

  const client = createClient(token);
  const { data, errors } = await client.query({
    query: RELEASES,
    variables: {
      slug: slug,
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
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
});
