


    export interface GenresResult {
        __typename: string;
        title: string;
        cover_image: string;
        type: string;
        country: string;
        year: string;
        label: string[];
        genre: string[];
        style: string[];
        thumb: string;
        id: number;
    }

 

    export interface Genres {
        __typename: string;
        results: GenresResult[];
        pagination: Paginations;
    }

    export interface GenreData {
        getFavoritesArtist: GetFavoritesArtist[];
        getFavoritesMaster: GetFavoritesMaster[];
        getFavoritesRelease: GetFavoritesRelease[];
        getFavoritesLabel: GetFavoritesLabel[];
        genres: Genres;
    }



    export interface GenresObject {
        errorCode: boolean;
        data: GenreData;
        title: string;
        _nextI18Next: NextI18Next;
    }
