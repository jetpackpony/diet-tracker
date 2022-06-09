import React, { useState, useRef, useEffect } from 'react';
import styles from './Button.module.css';

const Button = ({
  className,
  icon = null,
  text = "",
  type = "primary",
  onClick,
  buttonProps = { type: "submit", name: "submit" }
}) => {
  const [inkPos, setInkPos] = useState({ top: 0, left: 0, size: 0 });
  const [inkActive, setInkActive] = useState(false);
  const buttonOnClick = (e) => {
    const buttonRect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(buttonRect.width, buttonRect.height);
    const top = e.clientY - buttonRect.top - size / 2;
    const left = e.clientX - buttonRect.left - size / 2;
    setInkPos({ top, left, size });
    setInkActive(true);
    setTimeout(() => setInkActive(false), 400);
    onClick(e);
  };

  // We need this to be able to use prop as component
  const Icon = icon;

  const primaryColorText = getComputedStyle(document.documentElement).getPropertyValue('--primary-color-text');
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
  let iconColor = "";
  const buttonStyles = [className, styles.button];
  switch (type) {
    case "outlined":
      buttonStyles.push(styles.outlined);
      iconColor = primaryColor;
      break;
    case "plainText":
      buttonStyles.push(styles.plainText);
      iconColor = primaryColor;
      break;
    case "primary":
    default:
      buttonStyles.push(styles.primary);
      iconColor = primaryColorText;
  }

  return (
    <button
      className={buttonStyles.join(" ")}
      onClick={buttonOnClick}
      {...buttonProps}
    >

      <span style={{ marginRight: (icon && text) ? "0.5rem" : "0" }}>
        {icon && <Icon size="small" color={iconColor} />}
      </span>
      <span>{text}</span>
      <span
        className={[styles.ink, (inkActive) ? styles.inkActive : ""].join(" ")}
        style={{ top: inkPos.top, left: inkPos.left, width: inkPos.size, height: inkPos.size }}
      ></span>
    </button>
  )
};

export default Button;