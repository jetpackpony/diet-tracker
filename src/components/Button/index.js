import React from 'react';
import styles from './Button.module.css';
import { useRipple } from '../../hooks/useRipple';

const Button = ({
  className,
  icon = null,
  text = "",
  type = "primary",
  onClick,
  buttonProps = { type: "submit", name: "submit" }
}) => {
  const { Ripple, triggerRipple } = useRipple();
  const buttonOnClick = (e) => {
    triggerRipple(e);
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
      <Ripple />
    </button>
  )
};

export default Button;