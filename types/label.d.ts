
  
  export interface Label {
    __typename: string;
    id: number;
    name: string;
    profile: string;
    contact_info: string;
    urls: string[];
    images: Image[];
  }
  
  export interface LabelData {
    getFavoritesArtist: GetFavoritesArtist[];
    getFavoritesMaster: GetFavoritesMaster[];
    getFavoritesRelease: GetFavoritesRelease[];
    getFavoritesLabel: GetFavoritesLabel[];
    label: Label;
  }
  
  
  
  export interface LabelObject {
    errorCode: boolean;
    data: LabelData;
    _nextI18Next: NextI18Next;
  }