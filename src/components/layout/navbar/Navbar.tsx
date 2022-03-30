import Image from "next/image";
import Link from "next/link";
import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { useDetectOutsideClick } from "../../../hooks/useDetectOutsideClick";
import { useMounted } from "../../../hooks/useMounted";
import { useMediaQuery } from "react-responsive";
import AvatarModal from "./modal/AvatarModal";

type INavbar = {
  setExpand: React.Dispatch<SetStateAction<boolean>>;
};

function Navbar({ setExpand }: INavbar) {
  // google oauth
  const { data: session, status } = useSession();

  // change theme hook
  const { theme } = useTheme();

  // toggle theme modal
  const [themeModal, setThemeModal] = useState(false);

  // toggle sign-out avatar modal
  const [avatarModal, setAvatarModal] = useState(false);

  // close theme modal if clicked outside
  const themeRef = useRef<HTMLDivElement>(null);
  useDetectOutsideClick(
    themeRef,
    useCallback(() => {
      setThemeModal(false);
    }, [setThemeModal])
  );

  // close avatar modal if clicked outside
  const avatarRef = useRef<HTMLDivElement>(null);
  useDetectOutsideClick(
    avatarRef,
    useCallback(() => {
      setAvatarModal(false);
    }, [setAvatarModal])
  );

  // toggle mobile search input
  const [mobileSearch, setMobileSearch] = useState(false);

  // to conditionally render form for mobile only
  const MobileForm = () => {
    const isMobile = useMediaQuery({ maxWidth: 1024 });

    return !(mobileSearch && isMobile) ? null : (
      <form className={styles.formMobile}>
        <input name="search" placeholder="Search" type="text" />
      </form>
    );
  };

  // to conditionally render form for desktops only
  const DesktopForm = () => {
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    return !isDesktop ? null : (
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <input name="search" placeholder="Search" type="text" />
          <button>
            <BsSearch />
          </button>
        </form>
      </div>
    );
  };

  // wait for theme hook (check ./hooks)
  return !useMounted() ? null : (
    <nav
      className={theme === "light" ? styles.container : styles.containerDark}
    >
      {/* menu */}
      <div
        onClick={() => setExpand((prev) => !prev)}
        className={styles.sidebarMenu}
      >
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
      <DesktopForm />

      {/* form on mobile */}
      <MobileForm />

      {/* account */}
      <div className={styles.userOptionContainer}>
        {/* option and search */}
        <div className={styles.option}>
          {/* search icon on mobile */}
          <div>
            <BsSearch
              onClick={() => setMobileSearch(!mobileSearch)}
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

export default Navbar;
