
  
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
  
  export interface Label {
    __typename: string;
    name: string;
    id: number;
  }
  

  
  export interface ReleaseReleases {
    __typename: string;
    id: number;
    artists: Artist[];
    year: number;
    title: string;
    tracklist: Tracklist[];
    styles: string[];
    genres: string[];
    labels: Label[];
    images: Image[];
    videos: Video[];
  }
  
  export interface ReleaseData {
    getFavoritesRelease: GetFavoritesRelease[];
    releases: ReleaseReleases;
  }
  

  
  export interface ReleaseObject {
    errorCode: boolean;
    data: ReleaseData;
    _nextI18Next: NextI18Next;
  }
  