import type { Icon } from "grommet-icons";
import React from "react";
import Ripple from "../Ripple";
import styles from "./AppBar.module.css";

interface AppBarButtonProps {
  Icon?: Icon;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const AppBarButton = ({ Icon, onClick }: AppBarButtonProps) => {
  const textColorPrimary = getComputedStyle(
    document.documentElement,
  ).getPropertyValue("--text-color-primary");
  return (
    <button className={styles.button} onClick={onClick}>
      {Icon && <Icon size="18px" color={textColorPrimary} />}
      <Ripple />
    </button>
  );
};

export default AppBarButton;
