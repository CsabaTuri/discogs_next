import React from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import { FaTrash } from "react-icons/fa";
import { useCookies } from "react-cookie";
import createClient from "../../../services/client/client";
import { useNotificationContext } from "../../context/notification/context";

export interface Datum {
  __typename: string;
  release_name: string;
  release_id: string;
}

export interface Name {
  kind: string;
  value: string;
}

export interface Name2 {
  kind: string;
  value: string;
}

export interface Variable {
  kind: string;
  name: Name2;
}

export interface Name3 {
  kind: string;
  value: string;
}

export interface Type2 {
  kind: string;
  name: Name3;
}

export interface Type {
  kind: string;
  type: Type2;
}

export interface VariableDefinition {
  kind: string;
  variable: Variable;
  type: Type;
  directives: any[];
}

export interface Name4 {
  kind: string;
  value: string;
}

export interface Name5 {
  kind: string;
  value: string;
}

export interface Name6 {
  kind: string;
  value: string;
}

export interface Value {
  kind: string;
  name: Name6;
}

export interface Argument {
  kind: string;
  name: Name5;
  value: Value;
}

export interface Selection {
  kind: string;
  name: Name4;
  arguments: Argument[];
  directives: any[];
}

export interface SelectionSet {
  kind: string;
  selections: Selection[];
}

export interface Definition {
  kind: string;
  operation: string;
  name: Name;
  variableDefinitions: VariableDefinition[];
  directives: any[];
  selectionSet: SelectionSet;
}

export interface Loc {
  start: number;
  end: number;
}

export interface Mutation {
  kind: string;
  definitions: Definition[];
  loc: Loc;
}

export interface RootObject {
  title: string;
  data: Datum[];
  mutation: Mutation;
  type: string;
}

const FavoriteList = (props: RootObject) => {
  const { data, type, mutation } = props;
  const [array, setArray] = React.useState<any>(data);
  const [cookies] = useCookies<any>(["auth"]);
  const { dispatch }: any = useNotificationContext();
  const token = cookies.token;
  async function removeElemFromFavorites(mutation: any, variables: any) {
    const client = createClient(token);
    const { errors } = await client.mutate({
      mutation: mutation,
      variables: variables,
    });
    if (errors) {
      dispatch({ type: "notification", payload: { text: errors[0].message, type: "danger" } })
    } else {
      const res = array.filter(
        (d: any) => parseInt(d[`${type}_id`]) !== variables.id
      );
      setArray(res);
      dispatch({ type: "notification", payload: { text: "success", type: "success" } })
    }
  }

  return (
    <>
      {array.map((item: any, i: number) => {
        return (
          <>
            <Link key={`${type}${i}link`} href={`/${type}/${item[`${type}_id`]}`}>
              {`${item[`${type}_name`]}`}
            </Link>

            <Button
              key={`${type}${i}button`}
              variant="danger"
              onClick={() =>
                removeElemFromFavorites(mutation, {
                  id: parseInt(item[`${type}_id`]),
                })
              }
            >
              <FaTrash key={`${type}${i}icon`} />
            </Button>
            <br />
          </>
        );
      })}
    </>
  );
};

export default FavoriteList;
