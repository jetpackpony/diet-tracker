import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AppBar from './index';

storiesOf('AppBar', module)
  .add('no selection', () => (
    <AppBar
      selectedRecords={[]}
      deleteRecords={action("deleteRecords")}
      cloneRecords={action("cloneRecords")}
    />
  ))
  .add('items selected', () => (
    <AppBar
      selectedRecords={["ljfkjwef", "ksdjflsjdf234"]}
      deleteRecords={action("deleteRecords")}
      cloneRecords={action("cloneRecords")}
    />
  ))