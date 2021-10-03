
  
  export interface Result {
    __typename: string;
    title: string;
    cover_image: string;
    type: string;
    country: string;
    year: number;
    label: string;
    genre: string[];
    style: string[];
    thumb: string;
    id: number;
  }
 
  
  export interface Styles {
    __typename: string;
    results: Result[];
    pagination: Paginations;
  }
  
  export interface StylesData {
    getFavoritesArtist: GetFavoritesArtist[];
    getFavoritesMaster: GetFavoritesMaster[];
    getFavoritesRelease: GetFavoritesRelease[];
    getFavoritesLabel: GetFavoritesLabel[];
    styles: Styles;
  }
  

  
  export interface StylesObject {
    errorCode: boolean;
    data: StylesData;
    title: string;
    _nextI18Next: NextI18Next;
  }