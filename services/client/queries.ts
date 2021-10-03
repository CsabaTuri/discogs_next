import { gql } from "@apollo/client";

export const LOGIN = gql`
  query login($user_name: String!, $password: String!) {
    login(user_name: $user_name, password: $password) {
      token
      userData {
        user_name
        email
        first_name
        last_name
        user_id
      }
    }
  }
`;

export const REGISTRATION = gql`
  query registration(
    $user_name: String!
    $email: String!
    $password: String!
    $first_name: String!
    $last_name: String!
  ) {
    registration(
      user_name: $user_name
      email: $email
      password: $password
      first_name: $first_name
      last_name: $last_name
    ) {
      user_name
      email
      first_name
      last_name
    }
  }
`;

export const DELETE_ACC = gql`
  mutation delete_acc {
    delete_acc
  }
`;
export const SEARCH = gql`
  query getSearched(
    $page: String!
    $per_page: String!
    $label: String
    $query: String
    $artist: String
    $year: String
    $style: String
    $genre: String
    $country: String
    $type: String
  ) {
    getFavoritesArtist {
      artist_name
      artist_id
    }
    getFavoritesMaster {
      master_name
      master_id
    }
    getFavoritesRelease {
      release_name
      release_id
    }
    getFavoritesLabel {
      label_name
      label_id
    }
    search(
      page: $page
      per_page: $per_page
      label: $label
      query: $query
      artist: $artist
      year: $year
      style: $style
      genre: $genre
      country: $country
      type: $type
    ) {
      results {
        title
        cover_image
        type
        country
        year
        label
        type
        genre
        style
        thumb
        id
      }
      pagination {
        page
        pages
        per_page
        items
        urls {
          last
          next
        }
      }
    }
  }
`;
export const FAVORITES = gql`
  query getFavoritesArtist {
    getFavoritesArtist {
      artist_name
      artist_id
    }
    getFavoritesMaster {
      master_name
      master_id
    }
    getFavoritesLabel {
      label_name
      label_id
    }
    getFavoritesRelease {
      release_name
      release_id
    }
  }
`;
export const ADD_ARTIST_TO_FAVORITES = gql`
  mutation addToFacorites($artist_id: ID!, $artist_name: String!) {
    add_artist_to_favorites(artist_id: $artist_id, artist_name: $artist_name)
  }
`;
export const REMOVE_ARTIST_FROM_FAVORITES = gql`
  mutation removeArtistFromFavorites($id: ID!) {
    remove_artist_from_favorites(artist_id: $id)
  }
`;
export const ADD_MASTER_TO_FAVORITES = gql`
  mutation addToFavorites($master_id: ID!, $master_name: String!) {
    add_master_to_favorites(master_id: $master_id, master_name: $master_name)
  }
`;
export const REMOVE_MASTER_FROM_FAVORITES = gql`
  mutation removeMasterFromFavorites($id: ID!) {
    remove_master_from_favorites(master_id: $id)
  }
`;
export const ADD_RELEASE_TO_FAVORITES = gql`
  mutation addToFavorites($release_id: ID!, $release_name: String!) {
    add_release_to_favorites(
      release_id: $release_id
      release_name: $release_name
    )
  }
`;
export const REMOVE_RELEASE_FROM_FAVORITES = gql`
  mutation removeReleaseFromFavorites($id: ID!) {
    remove_release_from_favorites(release_id: $id)
  }
`;
export const ADD_LABEL_TO_FAVORITES = gql`
  mutation addToFavorites($label_id: ID!, $label_name: String!) {
    add_label_to_favorites(label_id: $label_id, label_name: $label_name)
  }
`;
export const REMOVE_LABEL_FROM_FAVORITES = gql`
  mutation removeLabelFromFavorites($id: ID!) {
    remove_label_from_favorites(label_id: $id)
  }
`;
export const RELEASES = gql`
  query getRelease($slug: ID!) {
    getFavoritesRelease {
      release_name
      release_id
    }
    releases(id: $slug) {
      id
      artists {
        name
        id
      }
      year
      title
      tracklist {
        title
        duration
      }
      styles
      genres
      labels {
        name
        id
      }
      images {
        uri
      }
      videos {
        uri
        title
        embed
        description
      }
    }
  }
`;

export const MASTERS = gql`
  query getMaster($slug: ID!) {
    getFavoritesMaster {
      master_name
      master_id
    }
    master(id: $slug) {
      title
      id
      artists {
        name
        id
      }
      year
      title
      tracklist {
        title
        duration
      }
      styles
      genres
      images {
        uri
      }
      videos {
        uri
        title
        embed
        description
      }
    }
  }
`;
export const LABEL = gql`
  query getLabel($slug: ID!) {
    getFavoritesLabel {
      label_name
      label_id
    }
    label(id: $slug) {
      id
      name
      profile
      contact_info
      urls
      images {
        resource_url
      }
    }
  }
`;

export const ARTIST = gql`
  query getArtist($slug: ID!) {
    getFavoritesArtist {
      artist_name
      artist_id
    }
    artist(artist_id: $slug) {
      name
      id
      resource_url
      uri
      releases_url
      profile
      groups {
        name
        id
        active
      }
      data_quality
      members {
        name
        id
        active
      }
      urls
      images {
        uri
        resource_url
      }
    }
  }
`;
export const LABEL_RELEASE = gql`
  query getLabelReleases($slug: ID!, $page: Int!) {
    getFavoritesArtist {
      artist_name
      artist_id
    }
    getFavoritesMaster {
      master_name
      master_id
    }
    getFavoritesRelease {
      release_name
      release_id
    }
    getFavoritesLabel {
      label_name
      label_id
    }
    labelReleases(label_id: $slug, page: $page, per_page: 10) {
      releases {
        title
        year
        type
        id
        main_release
        role
        resource_url
        thumb
        artist
      }
      pagination {
        page
        pages
        per_page
        items
        urls {
          last
          next
        }
      }
    }
  }
`;
export const GENRES = gql`
  query getGenres($slug: String!, $page: Int!) {
    getFavoritesArtist {
      artist_name
      artist_id
    }
    getFavoritesMaster {
      master_name
      master_id
    }
    getFavoritesRelease {
      release_name
      release_id
    }
    getFavoritesLabel {
      label_name
      label_id
    }
    genres(genre: $slug, page: $page, per_page: 10) {
      results {
        title
        cover_image
        type
        country
        year
        label
        type
        genre
        style
        thumb
        id
      }
      pagination {
        page
        pages
        per_page
        items
        urls {
          last
          next
        }
      }
    }
  }
`;
export const STYLES = gql`
  query getStyles($slug: String!, $page: Int!) {
    getFavoritesArtist {
      artist_name
      artist_id
    }
    getFavoritesMaster {
      master_name
      master_id
    }
    getFavoritesRelease {
      release_name
      release_id
    }
    getFavoritesLabel {
      label_name
      label_id
    }
    styles(style: $slug, page: $page, per_page: 10) {
      results {
        title
        cover_image
        type
        country
        year
        label
        type
        genre
        style
        thumb
        id
      }
      pagination {
        page
        pages
        per_page
        items
        urls {
          last
          next
        }
      }
    }
  }
`;
export const ARTIST_RELEASE = gql`
  query getArtistReleases($slug: ID!, $page: String!,$per_page:String!) {
    getFavoritesArtist {
      artist_name
      artist_id
    }
    getFavoritesMaster {
      master_name
      master_id
    }
    getFavoritesRelease {
      release_name
      release_id
    }
    getFavoritesLabel {
      label_name
      label_id
    }
    artistReleases(
      artist_id: $slug
      page: $page
      per_page: $per_page
      sort: "year"
      sort_order: "asc"
    ) {
      releases {
        title
        year
        type
        id
        main_release
        role
        resource_url
        thumb
        artist
      }
      pagination {
        page
        pages
        per_page
        items
        urls {
          last
          next
        }
      }
    }
  }
`;

export const USER = gql`
  query getUser {
    user {
      userData {
        user_name
        email
        first_name
        last_name
      }
    }
  }
`;
export const USERS = gql`
  query getUsers {
    users{
        user_name
        first_name
        last_name
        email
    }
}
`;
export const MESSAGE = gql`
  query getMessage($per_page:Int!) {
    message(per_page:$per_page) {
      user
      msg
      date
    }
  }
`;
