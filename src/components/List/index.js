import React from 'react';
import styles from './List.module.css';

export const List = ({ className, children, onClick, ...props }) => {
  return (
    <ul className={styles.list} onClick={onClick} onTouchStart={onClick}>
      {children}
    </ul>
  );
};
export const ListItem = ({ className, children, onClick, ...props }) => {
  return (
    <li className={styles.listItem} onTouchStart={onClick}>
      {children}
    </li>
  );
};
