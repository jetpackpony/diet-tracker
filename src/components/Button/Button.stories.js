import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from './index';
import { Trash } from 'grommet-icons';

storiesOf('Button', module)
  .add('with icon', () => (
    <Button
      onClick={action("clicked")}
    >
      <Trash size="small" color="red" />
      <span> Delete</span>
    </Button>
  ))