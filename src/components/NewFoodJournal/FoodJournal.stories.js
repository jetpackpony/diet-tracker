import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FoodJournal from './FoodJournal';
import DayHeader from './DayHeader';
import RecordLine from './RecordLine';
import WeekHeader from './WeekHeader';

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

storiesOf('FoodJournal/Week Header', module)
  .add('default', () => (
    <WeekHeader
      weekStart="2019-08-26T00:00:00.000Z"
      weekEnd="2019-09-02T00:00:00.000Z"
      calDeficit={4723}
    />
  ))

storiesOf('FoodJournal/Day Header', module)
  .add('default', () => (
    <DayHeader
      dayStart="2019-08-28T00:00:00.000Z"
      totals={{
        "calories": 14,
        "protein": 1.23,
        "fat": 1.23,
        "carbs": 1.23,
      }}
      calDeficit={2356}
    />
  ))

storiesOf('FoodJournal/Record Line', module)
  .add('default', () => (
    <RecordLine
      id="5d66808e0a59eb06549e0fe3"
      foodItem={{
        "id": "5d66808e0a59eb06549e0fe2",
        "title": "New Testeme",
      }}
      weight={123}
      calories={14}
      protein={1.23}
      fat={1.23}
      carbs={1.23}
    />
  ))