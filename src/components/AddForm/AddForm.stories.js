import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AddForm from './AddForm';

storiesOf('AddForm', module)
  .add('with some emoji', () => (
    <AddForm
      addRecordWithFoodItem={action("addRecordWithFoodItem")}
      addRecord={action("addRecord")}
      isSearching={false}
      foundFoodItems={false}
      searchFoodItem={action("searchFoodItem")}
    />
  ));
