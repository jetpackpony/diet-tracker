import React from "react";
import Ripple from "../Ripple";
import styles from './AppBar.module.css';

const AppBarButton = ({
  icon = null,
  onClick,
}) => {
  const Icon = icon;
  const textColorPrimary = getComputedStyle(document.documentElement).getPropertyValue('--text-color-primary');
  return (
    <button
      className={styles.button}
      onClick={onClick}
    >
      {icon && <Icon size="18px" color={textColorPrimary} />}
      <Ripple />
    </button>
  );
};

export default AppBarButton;