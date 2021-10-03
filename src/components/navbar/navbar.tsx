import React from "react";
import Link from "next/link";
import { Nav, Navbar } from "react-bootstrap";
import Button from "react-bootstrap/Button"
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import {
  StyledNavbar,
  Settings,
  StyledThemeSwitcher,
  StyledLinkDiv,
  StyledLink,
  StyledLangSwitcher,
} from "./styledComponents";
import { useDarkContext } from "../../context/dark/context";
import { useUserContext } from "../../context/user/context";
import { useCookies } from "react-cookie";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import Chat from "../chat"

const NavBarTemplate = () => {
  const [scrollpos, setScrollpos] = React.useState(0);
  const [open, setOpen] = React.useState<boolean>(false);
  const [_cookie, _setCookie, removeCookie] = useCookies<any>(["auth"]);
  const { t } = useTranslation("common");
  const { state, dispatch }: any = useDarkContext();
  const { isDark } = state;
  const { dispatch: userDispatch }: any = useUserContext();
  const router = useRouter();
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setScrollpos(window.pageYOffset);
    });
  }
  function backNav() {
    router.back();
  }
  function logOut() {
    removeCookie("token");
    userDispatch({ type: "user", payload: {} });
    router.push("/login");
  }
  function handleclick() {
    dispatch({ type: "isDark" });
  }
  return (
    <>
      <StyledNavbar
        collapseOnSelect
        expand="lg"
        className={scrollpos > 300 ? "display" : "transparent"}
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/user">
              <StyledLink>
                {t("profile")}
              </StyledLink>
            </Link>
            <Link href="/">
              <StyledLink onClick={backNav}>{t("back")}</StyledLink>
            </Link>
            <Link href="/">
              <StyledLink>{t("home")}</StyledLink>
            </Link>
            <Link href="/favorites">
              <StyledLink>{t("favorites")}</StyledLink>
            </Link>
            <Link href="/users">
              <StyledLink>{t("users")}</StyledLink>
            </Link>
            <StyledLink onClick={logOut}>{t("logout")}</StyledLink>
          </Nav>
        </Navbar.Collapse>
        <Settings>
          <StyledLinkDiv>
            <StyledThemeSwitcher onClick={handleclick}>
              {isDark ? <FaMoon /> : <FaSun />}
            </StyledThemeSwitcher>
          </StyledLinkDiv>
          {router.locale === "hu" ? (
            <StyledLinkDiv>
              <StyledLangSwitcher href={router.asPath} locale="en">
                <a>en</a>
              </StyledLangSwitcher>
            </StyledLinkDiv>
          ) : (
            <StyledLinkDiv>
              <StyledLangSwitcher href={router.asPath} locale="hu">
                <a>hu</a>
              </StyledLangSwitcher>
            </StyledLinkDiv>
          )}
          <Button
            onClick={() => setOpen(true)}
            aria-controls="form-collapse"
            variant="outline-info"
            aria-expanded={open}
          >
            Chat
          </Button>
        </Settings>

      </StyledNavbar>
      <Chat open={open} setOpen={setOpen} />
    </>
  );
};

export default NavBarTemplate;
