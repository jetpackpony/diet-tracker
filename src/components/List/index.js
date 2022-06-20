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
    <li
      className={styles.listItem}
      // This is needed to cancel the onBlur event of the input in AddForm
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      {children}
      <Ripple />
    </li>
  );
};
