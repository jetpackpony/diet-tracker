import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FoodJournal from './FoodJournal';
import DayHeader from './DayHeader';
import RecordLine from './RecordLine';

storiesOf('FoodJournal', module)
  .add('with all items', () => (
    <FoodJournal

    />
  ))
  .add('with 0 items for today', () => (
    <div>To be implemented</div>
  ))
  .add('with 0 items for this week', () => (
    <div>To be implemented</div>
  ))

storiesOf('FoodJournal/Day Header', module)
  .add('default', () => (
    <DayHeader

    />
  ))

storiesOf('FoodJournal/Record Line', module)
  .add('default', () => (
    <RecordLine

    />
  ))