import React from "react";
import Link from "next/link";
import Image from "next/image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useCookies } from "react-cookie";
import { ADD_ARTIST_TO_FAVORITES, REMOVE_ARTIST_FROM_FAVORITES } from "../../../../services/client/queries";
import createClient from "../../../../services/client/client";
import { FaStar } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useNotificationContext } from "../../../context/notification/context";



export interface Data {
  __typename: string;
  title: string;
  cover_image?: string;
  type: string;
  country?: string;
  year?: number;
  label?: string;
  genre?: string[];
  style?: string[];
  thumb: string;
  id: number;
}

export interface RootObject {
  data: Data;
  ids: number[];
}




const Artist = (props: RootObject) => {
  const { data, ids } = props;
  const [isFavorite, setIsFavorite] = React.useState(true);
  const [isLoad, setIsLoad] = React.useState(true);
  const [cookies] = useCookies<any>(["auth"]);
  const { dispatch }: any = useNotificationContext();
  React.useEffect(() => {
    setIsLoad(true);
    setIsFavorite(ids.includes(data.id));
    setIsLoad(false);
  }, [ids]);
  async function addToFavorites(id: number, name: string) {
    const token = cookies.token;

    const client = createClient(token);
    const { errors } = await client.mutate({
      mutation: ADD_ARTIST_TO_FAVORITES,
      variables: {
        artist_id: id,
        artist_name: name,
      },
    });
    if (errors) {
      dispatch({ type: "notification", payload: { text: "danger", type: "danger" } })
    } else {
      dispatch({ type: "notification", payload: { text: "success", type: "success" } })
      setIsFavorite(true);
    }
  }

  async function removeElemFromFavorites(data: Data) {
    const token = cookies.token;
    const client = createClient(token);
    const { errors } = await client.mutate({
      mutation: REMOVE_ARTIST_FROM_FAVORITES,
      variables: data,
    });
    if (errors) {
      dispatch({ type: "notification", payload: { text: "danger", type: "danger" } })
    } else {
      dispatch({ type: "notification", payload: { text: "success", type: "success" } })
      setIsFavorite(false);
    }
  }

  return (
    <Row>
      {!!data.cover_image && !isLoad ? (
        <>
          <Col md={5}>
            <Link href={`/artist/${data.id}`}>
              <Image
                src={data.cover_image}
                layout="responsive"
                width="500px"
                height="500px"
                objectFit="cover"
              />
            </Link>
          </Col>
          <Col md={7}>
            <Link href={`/artist/${data.id}`}>
              <a>{data.title}</a>
            </Link>
            {!isFavorite ? (
              <Button
                variant="warning"
                onClick={() => addToFavorites(data.id, data.title)}
              >
                <FaStar />
              </Button>
            ) : (
              <Button
                variant="danger"
                onClick={() => removeElemFromFavorites(data)}
              >
                <FaTrash />
              </Button>
            )}
          </Col>
        </>
      ) : null}
      <hr />
    </Row>
  );
};
export default Artist;
