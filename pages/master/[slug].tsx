import React from "react"
import Head from "next/head";
import Link from "next/link";
import createClient from "../../services/client/client";
import { useCookies } from "react-cookie";
import Button from "react-bootstrap/Button";
import { MASTERS, ADD_MASTER_TO_FAVORITES, REMOVE_MASTER_FROM_FAVORITES } from "../../services/client/queries";
import Col from "react-bootstrap/Col";
import Layout from "../../src/components/layout";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { requireAuthentication } from "../../services/auth/requireAuthentication";
import { FaStar } from "react-icons/fa";
import { MasterObject, CTX } from "../../types"
import { useNotificationContext } from "../../src/context/notification/context";
import { FaTrash } from "react-icons/fa";
import Youtube from "../../src/components/youtube"

export default function Home(props: MasterObject) {
  const { data } = props;
  const [cookies] = useCookies<any>(["auth"]);
  const { dispatch }: any = useNotificationContext();
  const [isFavorite, setIsFavorite] = React.useState(true);

  React.useEffect(() => {
    setFavoriteState()
  }, [])

  async function setFavoriteState(): Promise<void> {
    let Ids: number[] = [];
    await data.getFavoritesMaster.map((id: any) => {
      Ids.push(parseInt(id.master_id))
    });
    setIsFavorite(Ids.includes(id));
  }


  async function addToFavorites(id: number, name: string) {
    const token = cookies.token;
    const client = createClient(token);
    const { errors } = await client.mutate({
      mutation: ADD_MASTER_TO_FAVORITES,
      variables: {
        master_id: id,
        master_name: name,
      },
    });
    if (errors) {
      dispatch({ type: "notification", payload: { text: errors[0].message, type: "danger" } })
    } else {
      setIsFavorite(true);
      dispatch({ type: "notification", payload: { text: "success", type: "success" } })
    }
  }
  async function removeElemFromFavorites(data: any) {
    const token = cookies.token;
    const client = createClient(token);
    const { errors } = await client.mutate({
      mutation: REMOVE_MASTER_FROM_FAVORITES,
      variables: data,
    });
    if (errors) {
      dispatch({ type: "notification", payload: { text: errors[0].message, type: "danger" } })
    } else {
      setIsFavorite(false);
      dispatch({ type: "notification", payload: { text: "success", type: "success" } })
    }
  }
  const {
    title,
    tracklist,
    videos,
    artists,
    styles,
    genres,
    year,
    id,
  } = data.master;

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Col md={8}>
        {!!artists
          ? artists.map((artist: any) => (
            <>
              <h1>
                <Link href={`/artist/${artist.id}`}>{artist.name}</Link>
              </h1>
              <Youtube data={artist.name} />
            </>
          ))
          : null}
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
            onClick={() => removeElemFromFavorites(data.master)}
          >
            <FaTrash />
          </Button>
        )}
        <h2>{!!title ? title : null}</h2>
        <p>{year}</p>
        {!!styles
          ? styles.map((style: any) => (
            <>
              <Link href={`/styles/${style}`}>{style}</Link>
              <br />
            </>
          ))
          : null}
        {!!genres
          ? genres.map((genre: any) => (
            <>
              {" "}
              <Link href={`/genres/${genre}`}>{genre}</Link>
              <br />
            </>
          ))
          : null}

        <ul>
          {!!tracklist
            ? tracklist.map((track: any) => (
              <li>
                {track.title}:{track.duration}
                <Youtube data={track.title} />
              </li>
            ))
            : null}
        </ul>
        <ul>
          {!!videos
            ? videos.map((video: any) => (
              <li>
                <div className="video-responsive">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.uri.split("=")[1]
                      }`}
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
}

export const getServerSideProps = requireAuthentication(async (context: CTX) => {
  const slug = context.query.slug;
  const locale = context.locale
  const token = JSON.parse(JSON.stringify(context.req.cookies)).token || "";

  const client = createClient(token);
  const { data, errors } = await client.query({
    query: MASTERS,
    variables: {
      slug: slug,
    },
  });
  let errorCode = errors ? errors : false;
  if (errorCode) {
    context.res.statusCode = 404;
  }

  return { props: { errorCode, data, ...await serverSideTranslations(locale, ['common']) } };

})
