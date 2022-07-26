import React from 'react';
import styles from './Button.module.css';
import Ripple from '../Ripple';
import type { Icon } from 'grommet-icons';

interface ButtonProps {
  className?: string,
  Icon?: Icon,
  text?: string,
  type?: "outlined" | "plainText" | "primary",
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
};

const Button = ({
  className,
  Icon,
  text = "",
  type = "primary",
  onClick,
  buttonProps = { type: "submit", name: "submit" }
}: ButtonProps) => {
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
      onClick={onClick}
      {...buttonProps}
    >
      <span style={{ marginRight: (Icon && text) ? "0.5rem" : "0" }}>
        {Icon && <Icon size="small" color={iconColor} />}
      </span>
      <span>{text}</span>
      <Ripple />
    </button>
  )
};

export default Button;