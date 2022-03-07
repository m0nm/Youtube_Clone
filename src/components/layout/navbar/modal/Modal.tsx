import React, { useState } from "react";
import { useTheme } from "next-themes";

import { WiMoonAltWaxingGibbous1 } from "react-icons/wi";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";

type IModal = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  styles:
    | {
        readonly [key: string]: string;
      }
    | any;
};

function Modal({ styles, setModal }: IModal) {
  // switch theme
  const { theme, setTheme } = useTheme();

  // select second section of menu
  const [secondary, setSecondary] = useState(false);

  //  check mark icon
  const checkSvg = <AiOutlineCheck />;

  return (
    <div className={styles.modal}>
      {/* first menu section */}
      {!secondary ? (
        <div onClick={() => setSecondary(true)} className={styles.firstSection}>
          <WiMoonAltWaxingGibbous1 />
          <span>Appearance: Device theme</span>
        </div>
      ) : (
        /* second menu section */
        <div className={styles.secondSection}>
          <div>
            <BsArrowLeft onClick={() => setSecondary(false)} />
            <span>Appearance</span>
          </div>

          <p>Setting applies to this browser only</p>

          <ul>
            <li onClick={() => setTheme("system")}>
              {" "}
              {theme === "system" && checkSvg} Use Device theme
            </li>
            <li onClick={() => setTheme("dark")}>
              {" "}
              {theme === "dark" && checkSvg} Dark theme
            </li>
            <li onClick={() => setTheme("light")}>
              {" "}
              {theme === "light" && checkSvg} Light theme
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Modal;
