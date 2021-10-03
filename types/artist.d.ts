

export interface Group {
    __typename: string;
    name: string;
    id: number;
    active: boolean;
}
export interface Member {
    __typename: string;
    name: string;
    id: number;
    active: boolean;
}


export interface ArtistArtist {
    __typename: string;
    name: string;
    id: number;
    resource_url: string;
    uri: string;
    releases_url: string;
    profile: string;
    groups: Group[];
    member: Member;
    data_quality: string;
    members?: Member[];
    urls: string[];
    images: Image[];
}

export interface ArtistData {
    artist: ArtistArtist;
    getFavoritesArtist: GetFavoritesArtist[];
}


export interface ArtistObject {
    errorCode: boolean;
    data: ArtistData;
    _nextI18Next: NextI18Next;
}
