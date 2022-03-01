import Image from "next/image";
import React from "react";

import { BsThreeDotsVertical, BsSearch } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";

import styles from "./Navbar.module.scss";

import Logo from "./../../../../public/youtube-logo.png";
function Navbar() {
  return (
    <div className={styles.container}>
      {/* logo */}
      <div className={styles.logo}>
        <Image src={Logo} alt="youtube logo" layout="fill" />
      </div>

      {/* form */}
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <input name="search" placeholder="Search" type="text" />
          <button>
            <i>
              <BsSearch />
            </i>
          </button>
        </form>
      </div>

      {/* account */}
      <div className={styles.accountContainer}>
        {/* toggle light/dark mode menu */}
        <div className={styles.option}>
          <BsThreeDotsVertical />
        </div>
        {/* Login/ Avatar */}
        <button>
          <i>
            <FaRegUserCircle />
          </i>
          SIGN IN
        </button>
      </div>
    </div>
  );
}

export default Navbar;
