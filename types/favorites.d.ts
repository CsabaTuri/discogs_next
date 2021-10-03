
  
  export interface FavoritesData {
    getFavoritesArtist: GetFavoritesArtist[];
    getFavoritesMaster: GetFavoritesMaster[];
    getFavoritesLabel: GetFavoritesLabel[];
    getFavoritesRelease: GetFavoritesRelease[];
  }
  

  
  export interface FavoritesObject {
    errorCode: boolean;
    data: FavoritesData;
    _nextI18Next: NextI18Next;
  }