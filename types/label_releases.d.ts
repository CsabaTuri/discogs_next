
  
  export interface Release {
    __typename: string;
    title: string;
    year: number;
    type?: string;
    id: number;
    main_release?: string;
    role?: string;
    resource_url: string;
    thumb: string;
    artist: string;
  }
 
  
  export interface LabelReleases {
    __typename: string;
    releases: Release[];
    pagination: Paginations;
  }
  
  export interface LabelReleasesData {
    getFavoritesArtist: GetFavoritesArtist[];
    getFavoritesMaster: GetFavoritesMaster[];
    getFavoritesRelease: GetFavoritesRelease[];
    getFavoritesLabel: GetFavoritesLabel[];
    labelReleases: LabelReleases;
  }
  

  
  export interface LabelReleasesObject {
    errorCode: boolean;
    data: LabelReleasesData;
    slug: string;
    _nextI18Next: NextI18Next;
  }