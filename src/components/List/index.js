import React from 'react';
import styles from './List.module.css';
import Ripple from '../Ripple';

export const List = ({ className, children, onClick, ...props }) => {
  return (
    <ul className={styles.list}>
      {children}
    </ul>
  );
};
export const ListItem = ({ className, children, onClick, ...props }) => {
  return (
    <li className={styles.listItem} onClick={onClick}>
      {children}
      <Ripple />
    </li>
  );
};
