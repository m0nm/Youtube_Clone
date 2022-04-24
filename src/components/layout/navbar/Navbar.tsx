import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import React, { SetStateAction, useRef, useState } from "react";

import { useTheme } from "next-themes";
import { useSession, signIn } from "next-auth/react";

import { BsThreeDotsVertical, BsSearch } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import Logo from "./../../../../public/youtube-logo.png";
import LogoDark from "./../../../../public/youtube-logo-dark.png";
import spinnerGif from "./../../../../public/spinner.gif";

import styles from "./Navbar.module.scss";

import ThemeModal from "./modal/ThemeModal";
import AvatarModal from "./modal/AvatarModal";

import { useDetectOutsideClick } from "../../../hooks/useDetectOutsideClick";
import { useMounted } from "../../../hooks/useMounted";
import { useMediaQuery } from "react-responsive";

// MobileForm and DesktopForm typing
type IForm = {
  search: string;
  setSearch: React.Dispatch<SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
};

// to conditionally render form for mobile only
const MobileForm = (props: IForm) => {
  return (
    <form onSubmit={props.handleSubmit} className={styles.formMobile}>
      <input
        value={props.search}
        onChange={(e) => props.setSearch(e.currentTarget.value)}
        name="search"
        placeholder="Search"
        type="text"
      />
    </form>
  );
};

// to conditionally render form for desktops only
const DesktopForm = (props: IForm) => {
  return (
    <form onSubmit={props.handleSubmit} className={styles.form}>
      <input
        value={props.search}
        onChange={(e) => props.setSearch(e.currentTarget.value)}
        name="search"
        placeholder="Search"
        type="text"
      />
      <button>
        <BsSearch />
      </button>
    </form>
  );
};

type INavbar = {
  handleSidebarExpand: () => void;
};

function Navbar({ handleSidebarExpand }: INavbar) {
  // google oauth
  const { data: session, status } = useSession();

  // change theme hook
  const { theme } = useTheme();

  // toggle theme modal
  const [themeModal, setThemeModal] = useState(false);

  // toggle sign-out avatar modal
  const [avatarModal, setAvatarModal] = useState(false);

  // close theme modal if mouse clicked outside the modal
  const themeRef = useRef<HTMLDivElement>(null);
  useDetectOutsideClick(themeRef, () => setThemeModal(false));

  // close avatar modal if mouse clicked outside the modal
  const avatarRef = useRef<HTMLDivElement>(null);
  useDetectOutsideClick(avatarRef, () => setAvatarModal(false));

  // check for device width to render either desktop form or mobile form
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  // toggle mobile search input
  const [mobileInput, setMobileInput] = useState(false);

  // search and form handle submit
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!search) return;

    Router.push({ pathname: "/search", query: { query: search } });

    // if searched from mobile
    isMobile && setMobileInput(false);
  };

  // wait for theme hook to be mounted (check ./hooks)
  const mounted = useMounted();

  return !mounted ? null : (
    <nav
      className={theme === "light" ? styles.container : styles.containerDark}
    >
      {/* menu */}
      <div onClick={handleSidebarExpand} className={styles.sidebarMenu}>
        <HiOutlineMenu title="open sidebar" />
      </div>

      {/* logo */}
      <Link prefetch={false} passHref href="/">
        <div className={styles.logo}>
          {theme === "light" ? (
            <Image
              priority={true}
              src={Logo}
              alt="youtube logo"
              layout="fill"
            />
          ) : (
            <Image
              priority={true}
              src={LogoDark}
              alt="youtube logo dark"
              layout="fill"
            />
          )}
        </div>
      </Link>

      {/* form on desktop */}
      {!isMobile && (
        <DesktopForm
          search={search}
          setSearch={setSearch}
          handleSubmit={handleSubmit}
        />
      )}

      {/* form on mobile */}
      {mobileInput && isMobile && (
        <MobileForm
          search={search}
          setSearch={setSearch}
          handleSubmit={handleSubmit}
        />
      )}

      {/* account */}
      <div className={styles.userOptionContainer}>
        {/* option and search */}
        <div className={styles.option}>
          {/* search icon on mobile */}
          <div>
            <BsSearch
              onClick={() => setMobileInput(!mobileInput)}
              title="search"
              className={styles.mobileSearch}
            />
          </div>

          {/* toggle light/dark modal menu */}
          <div ref={themeRef} data-testid="modal-container">
            <BsThreeDotsVertical
              title="open modal"
              onClick={() => setThemeModal(!themeModal)}
            />
            {themeModal && <ThemeModal />}
          </div>
        </div>

        {/* Login or Avatar */}
        {status === "unauthenticated" ? (
          <button onClick={() => signIn("google")}>
            <FaRegUserCircle />
            SIGN IN
          </button>
        ) : (
          <div
            onClick={() => setAvatarModal(!avatarModal)}
            ref={avatarRef}
            data-testid="avatar"
            className={styles.avatar}
          >
            <Image
              src={(session?.user?.image as string) || spinnerGif}
              layout="fill"
              alt="avatar"
            />
            {avatarModal && <AvatarModal />}
          </div>
        )}
      </div>
    </nav>
  );
}

export default React.memo(Navbar);
