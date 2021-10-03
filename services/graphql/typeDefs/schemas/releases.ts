import { gql } from"apollo-server-micro";
const releases = gql`
  
  type Images {
    type: String
    uri: String
    resource_url: String
    uri150: String
    width: Int
    height: Int
  }

  type Extraartists {
    name: String
    anv: String
    join: String
    role: String
    tracks: String
    id: Int
    resource_url: String
  }

  type Tracklist {
    position: String
    type_: String
    title: String
    duration: String
    extraartists: [Extraartists]
  }

  type Videos {
    uri: String
    title: String
    description: String
    duration: Int
    embed: Boolean
  }

  type Identifiers {
    type: String
    value: String
  }

  type Contributors {
    username: String
    resource_url: String
  }

  type Submitter {
    username: String
    resource_url: String
  }

  type Rating {
    count: Int
    average: Float
  }

  type Community {
    have: Int
    want: Int
    data_quality: String
    status: String
    contributors: [Contributors]
    submitter: Submitter
    rating: Rating
    in_wantlist: Int
    in_collection: Int
  }

  type Formats {
    name: String
    qty: String
    descriptions: [String]
  }

  type Companies {
    name: String
    catno: String
    entity_type: String
    entity_type_name: String
    id: Int
    resource_url: String
  }

  type Labels {
    name: String
    catno: String
    entity_type: String
    entity_type_name: String
    id: Int
    resource_url: String
  }
  type FavLabels {
    label_id: String!
    label_name: String!
  }
  type Artists {
    name: String
    anv: String
    join: String
    role: String
    tracks: String
    id: Int
    resource_url: String
  }
  type FavArtists {
    artist_id: String!
    artist_name: String!
  }
  type Release {
    id: Int
    status: String
    year: Int
    resource_url: String
    uri: String
    artists_sort: String
    data_quality: String
    format_quantity: Int
    date_added: String
    date_changed: String
    num_for_sale: Int
    lowest_price: Float
    master_id: Int
    master_url: String
    title: String
    country: String
    released: String
    notes: String
    released_formatted: String
    thumb: String
    estimated_weight: Int
    blocked_from_sale: Boolean
    images: [Images]
    extraartists: [Extraartists]
    tracklist: [Tracklist]
    styles: [String]
    genres: [String]
    videos: [Videos]
    identifiers: [Identifiers]
    community: Community
    formats: [Formats]
    companies: [Companies]
    series: [String]
    labels: [Labels]
    artists: [Artists]
  }
  type FavReleases {
    release_id: String!
    release_name: String!
  }
  type Results {
    country: String
    year: String
    type: String
    id: Int
    master_id: Int
    master_url: String
    uri: String
    catno: String
    title: String
    thumb: String
    cover_image: String
    resource_url: String
    community: Community
    barcode: [String]
    style: [String]
    genre: [String]
    label: [String]
    format: [String]
  }

  type Urls {
    last: String
    next: String
  }

  type Pagination {
    page: Int
    pages: Int
    per_page: Int
    items: Int
    urls: Urls
  }

  type Search {
    results: [Results]
    pagination: Pagination
  }

  type Members {
    id: Int
    name: String
    resource_url: String
    active: Boolean
  }
  type Groups {
    id: Int
    name: String
    resource_url: String
    active: Boolean
  }

  type Artist {
    name: String
    id: Int
    resource_url: String
    uri: String
    releases_url: String
    profile: String
    data_quality: String
    members: [Members]
    groups: [Groups]
    namevariations: [String]
    urls: [String]
    images: [Images]
  }

  type Stats {
    community: Community
  }
  type Releases {
    id: Int
    title: String
    type: String
    main_release: Int
    artist: String
    role: String
    resource_url: String
    year: Int
    thumb: String
    stats: Stats
    status: String
    format: String
    catno: String
  }
  type ArtistReleases {
    releases: [Releases]
    pagination: Pagination
  }

  type Master {
    id: Int
    main_release: Int
    most_recent_release: Int
    resource_url: String
    uri: String
    versions_url: String
    main_release_url: String
    most_recent_release_url: String
    num_for_sale: Int
    lowest_price: Float
    year: Int
    title: String
    notes: String
    data_quality: String
    videos: [Videos]
    artists: [Artists]
    tracklist: [Tracklist]
    styles: [String]
    genres: [String]
    images: [Images]
  }
  type FavMasters {
    master_id: String!
    master_name: String!
  }
  type Label {
    id: Int
    name: String
    resource_url: String
    uri: String
    releases_url: String
    profile: String
    data_quality: String
    urls: [String]
    images: [Images]
    contact_info: String
    sublabels: [Sublabels]
    parent_label: ParentLabel
  }
  type Sublabels {
    id: Int
    name: String
    resource_url: String
  }
  type ParentLabel {
    id: Int
    name: String
    resource_url: String
  }
`;
module.exports = releases;
