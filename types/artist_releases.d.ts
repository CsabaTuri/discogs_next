

export interface Releases {
    __typename: string;
    title: string;
    year: number;
    type: string;
    id: number;
    main_release?: number;
    role: string;
    resource_url: string;
    thumb: string;
    artist: string;
}

export interface ArtistReleases {
    __typename: string;
    releases: Releases[];
    pagination: Paginations;
}

export interface ArtistReleaseData {
    getFavoritesArtist: GetFavoritesArtist[];
    getFavoritesMaster: GetFavoritesMaster[];
    getFavoritesRelease: GetFavoritesRelease[];
    getFavoritesLabel: GetFavoritesLabel[];
    artistReleases: ArtistReleases;
}


export interface ArtistReleaseObject {
    errorCode: boolean;
    data: Data;
    slug: string;
    _nextI18Next: NextI18Next;
}