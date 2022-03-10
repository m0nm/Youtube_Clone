import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useSession, signIn } from "next-auth/react";

import { BsThreeDotsVertical, BsSearch } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import Logo from "./../../../../public/youtube-logo.png";
import LogoDark from "./../../../../public/youtube-logo-dark.png";
import spinnerGif from "./../../../../public/spinner.gif";

import styles from "./Navbar.module.scss";

import Modal from "./modal/Modal";
import { useDetectOutsideClick } from "../../../hooks/useDetectOutsideClick";

function Navbar() {
  // google oauth
  const { data: session, status } = useSession();

  // change theme hook
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  // wait for theme to be mounted on client
  useEffect(() => setMounted(true), []);

  // toggle theme modal
  const [modal, setModal] = useState(false);

  // close theme modal if clicked outside
  const ref = useRef<HTMLDivElement>(null);
  useDetectOutsideClick(
    ref,
    useCallback(() => {
      setModal(false);
    }, [setModal])
  );

  if (!mounted) return null;

  return (
    <div
      className={theme === "light" ? styles.container : styles.containerDark}
    >
      {/* sidebar menu if on mobile */}
      <div className={styles.sidebarMenu}>
        <HiOutlineMenu />
      </div>
      {/* logo */}
      <Link passHref href="/">
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

      {/* form */}
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <input name="search" placeholder="Search" type="text" />
          <button>
            <BsSearch />
          </button>
        </form>
      </div>

      {/* account */}
      <div className={styles.accountContainer}>
        {/* toggle light/dark mode menu */}
        <div className={styles.option}>
          <BsSearch className={styles.mobileSearch} />

          <div ref={ref} data-testid="modal-container">
            <BsThreeDotsVertical onClick={() => setModal(!modal)} />
            {modal && <Modal styles={styles} />}
          </div>
        </div>
        {/* Login/ Avatar */}

        {status === "unauthenticated" ? (
          <button onClick={() => signIn("google")}>
            <FaRegUserCircle />
            SIGN IN
          </button>
        ) : (
          <div className={styles.avatar}>
            <Image
              src={(session?.user?.image as string) || spinnerGif}
              layout="fill"
              alt="avatar"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
