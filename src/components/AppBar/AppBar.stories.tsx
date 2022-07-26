import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AppBar from './index';

storiesOf('AppBar', module)
  .add('no selection', () => (
    <AppBar
      deleteRecords={action("deleteRecords")}
      cloneRecords={action("cloneRecords")}
    />
  ))
  .add('items selected', () => (
    <AppBar
      deleteRecords={action("deleteRecords")}
      cloneRecords={action("cloneRecords")}
    />
  ))