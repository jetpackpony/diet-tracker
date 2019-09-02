import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styles from './Input.module.css';

storiesOf('Input', module)
  .add('default', () => (
    <input className={styles.input} type="text" />
  ))