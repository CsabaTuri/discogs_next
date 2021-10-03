

export interface Artist {
    __typename: string;
    name: string;
    id: number;
}

export interface Tracklist {
    __typename: string;
    title: string;
    duration: string;
}

export interface Master {
    __typename: string;
    title: string;
    id: number;
    artists: Artist[];
    year: number;
    tracklist: Tracklist[];
    styles: string[];
    genres: string[];
    images: Image[];
    videos: Video[];
}

export interface MasterData {
    getFavoritesArtist: GetFavoritesArtist[];
    getFavoritesMaster: GetFavoritesMaster[];
    getFavoritesRelease: GetFavoritesRelease[];
    getFavoritesLabel: GetFavoritesLabel[];
    master: Master;
}



export interface MasterObject {
    errorCode: boolean;
    data: MasterData;
    _nextI18Next: NextI18Next;
}