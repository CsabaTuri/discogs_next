import React from "react";
import { FaYoutube } from "react-icons/fa";
import { FaSpotify } from "react-icons/fa";

export interface RootObject {
    data: string;
}

const Youtube = (props: RootObject) => {
    const { data } = props;
    console.log(data)
    return (
        <>
            <a target="_blank" href={`https://www.youtube.com/results?search_query=${data}`}><FaYoutube /></a>
            <a target="_blank" href={`https://open.spotify.com/search/${data}`}><FaSpotify /></a>
        </>
    );
};
export default Youtube;
