
import { NextPageContext, NextApiRequest, NextApiResponse } from "next"

export interface GetFavoritesArtist {
    __typename: string;
    artist_name: string;
    artist_id: number;
}
export interface GetFavoritesMaster {
    __typename: string;
    master_name: string;
    master_id: number;
}
export interface GetFavoritesRelease {
    __typename: string;
    release_name: string;
    release_id: number;
}
export interface GetFavoritesLabel {
    __typename: string;
    label_name: string;
    label_id: number;
}
export interface Urls {
    __typename: string;
    last: string;
    next: string;
}
export interface Paginations {
    __typename: string;
    page: number;
    pages: number;
    per_page: number;
    items: number;
    urls: Urls;
}
export interface Common {
    home: string;
    back: string;
    favorites: string;
    logout: string;
    artist: string;
    label: string;
    master: string;
    release: string;
}
export interface Hu {
    common: Common;
}
export interface InitialI18nStore {
    hu: Hu;
}
export interface I18n {
    defaultLocale: string;
    locales: string[];
}
export interface I18n2 {
    defaultLocale: string;
    locales: string[];
}
export interface Default {
    i18n: I18n2;
    localePath: string;
}
export interface UserConfig {
    i18n: I18n;
    localePath: string;
    default: Default;
}
export interface NextI18Next {
    initialI18nStore: InitialI18nStore;
    initialLocale: string;
    userConfig: UserConfig;
}
export interface Image {
    __typename: string;
    uri: string;
    resource_url: string;
}
export interface Video {
    __typename: string;
    uri: string;
    title: string;
    embed: boolean;
    description: string;
}
export interface SearchDataType {
    query: string;
    artist: string;
    label: string;
    year: string;
    style: string;
    genre: string;
    country: string;
    type: string;
    page?: string,
    per_page : string
}
export interface InitialSearchDataType {
    search: SearchDataType,
    dispatch: (payload:any) => void
}
export interface Result {
    __typename: string;
    title: string;
    artist?: string;
    cover_image: string;
    type: string;
    country?: string;
    year?: number;
    label?: string;
    genre?: string[];
    style?: string[];
    thumb: string;
    id: number;
}

export interface IndexData {
    __typename: string;
    results: Result[];
    pagination: Pagination;
}
export interface Query extends NextPageContext {
    slug: string
    artist: string
    label: string
    year: string
    country: string
    style: string
    genre: string
    type: string
    page: string
    per_page: string
}
export interface CTX {
    query: Query,
    locale: string,
    req: NextApiRequest,
    res: NextApiResponse
}
export interface ThemeObject {
    name: string;
    fg: string;
    bg: string;
    btn_fg: string;
    btn_bg: string;
    btn_border: string;
    success: string;
    warning: string;
    danger: string;
}