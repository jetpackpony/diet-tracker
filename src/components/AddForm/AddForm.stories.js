import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AddForm from './AddForm';
import SuggestionsList from './SuggestionsList';

const foundFoodItems = [
  { foodItemID: '1', title: "Bread", calories: 120, protein: 15, fat: 23, carbs: 11 },
  { foodItemID: '2', title: "More", calories: 120, protein: 15, fat: 23, carbs: 11 },
  { foodItemID: '3', title: "Мороженое Здоровый Рожок с орешками и шоколадом", calories: 6969, protein: 869, fat: 689, carbs: 696 },
  { foodItemID: '4', title: "Хлеб", calories: 120, protein: 15, fat: 23, carbs: 11 },
];

storiesOf('AddForm', module)
  .add('Add Form', () => (
    <AddForm
      addRecordWithFoodItem={action("addRecordWithFoodItem")}
      addRecord={action("addRecord")}
      isSearching={false}
      foundFoodItems={foundFoodItems}
      searchFoodItem={action("searchFoodItem")}
    />
  ));

const Container = ({ children }) => (
  <div style={{ padding: "2rem", background: "var(--content-color)", height: "100vh" }}>
    <div style={{ position: "relative" }}>
      {children}
    </div>
  </div>
);

storiesOf('AddForm/Suggestions List', module)
  .add('results', () => (
    <Container>
      <SuggestionsList
        isSearching={false}
        foundFoodItems={foundFoodItems}
        onFoodItemSelected={action("loadFoodItem")}
      />
    </Container>
  ))
  .add('searching', () => (
    <Container>
      <SuggestionsList
        isSearching={true}
        foundFoodItems={false}
        onFoodItemSelected={action("loadFoodItem")}
      />
    </Container>
  ))