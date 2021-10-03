import Tab from "react-bootstrap/Tab";
import { useTranslation } from "next-i18next";
import FavoriteList from "../favoriteList";
import {
  REMOVE_ARTIST_FROM_FAVORITES,
  REMOVE_MASTER_FROM_FAVORITES,
  REMOVE_RELEASE_FROM_FAVORITES,
  REMOVE_LABEL_FROM_FAVORITES,
} from "../../../services/client/queries";
import { StyledTabs } from "./styledComponents";
const MyTabs = (props) => {
  const { data } = props;
  const {
    getFavoritesArtist,
    getFavoritesMaster,
    getFavoritesRelease,
    getFavoritesLabel,
  } = data;

  const { t } = useTranslation("common");
  return (
    <StyledTabs defaultActiveKey="artist" id="uncontrolled-tab-example">
      <Tab eventKey="artist" title={t("artist")}>
        <FavoriteList
          title={t("artist")}
          data={getFavoritesArtist}
          mutation={REMOVE_ARTIST_FROM_FAVORITES}
          type="artist"
        />
      </Tab>
      <Tab eventKey="label" title={t("label")}>
        <FavoriteList
          title={t("label")}
          data={getFavoritesLabel}
          mutation={REMOVE_LABEL_FROM_FAVORITES}
          type="label"
        />
      </Tab>
      <Tab eventKey="master" title={t("master")}>
        <FavoriteList
          title={t("master")}
          data={getFavoritesMaster}
          mutation={REMOVE_MASTER_FROM_FAVORITES}
          type="master"
        />
      </Tab>

      <Tab eventKey="release" title={t("release")}>
        <FavoriteList
          title={t("release")}
          data={getFavoritesRelease}
          mutation={REMOVE_RELEASE_FROM_FAVORITES}
          type="release"
        />
      </Tab>
    </StyledTabs>
  );
};
export default MyTabs;
