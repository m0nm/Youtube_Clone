import React from "react";
import { signOut } from "next-auth/react";

import { GrLogout } from "react-icons/gr";

import styles from "../Navbar.module.scss";

function AvatarModal() {
  return (
    <div className={styles.modal}>
      <div onClick={() => signOut()} className={styles.firstSection}>
        <GrLogout className={styles.signOutSvg} />
        <span>Sign Out</span>
      </div>
    </div>
  );
}

export default AvatarModal;
