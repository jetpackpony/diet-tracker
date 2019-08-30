import React from 'react';
import styles from './Button.module.css';

const Button = ({ className, children, ...props }) => {
  return (
    <button className={[className, styles.button].join(" ")} {...props}>
      {children}
    </button>
  )
};

export default Button;