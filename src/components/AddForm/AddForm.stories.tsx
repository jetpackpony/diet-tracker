import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import AddForm from "./AddForm";
import SuggestionsList from "./SuggestionsList";

const foundFoodItems = [
  { id: "1", title: "Bread", calories: 120, protein: 15, fat: 23, carbs: 11 },
  { id: "2", title: "More", calories: 120, protein: 15, fat: 23, carbs: 11 },
  {
    id: "3",
    title: "Мороженое Здоровый Рожок с орешками и шоколадом",
    calories: 6969,
    protein: 869,
    fat: 689,
    carbs: 696,
  },
  { id: "4", title: "Хлеб", calories: 120, protein: 15, fat: 23, carbs: 11 },
];

storiesOf("AddForm", module).add("Add Form", () => (
  <div style={{ background: "var(--content-color)", height: "200vh" }}>
    <AddForm
      addRecordWithFoodItem={action("addRecordWithFoodItem")}
      addRecord={action("addRecord")}
      isSearching={false}
      foundFoodItems={foundFoodItems}
      searchFoodItem={action("searchFoodItem")}
    />
  </div>
));

const Container = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: "2rem",
      background: "var(--content-color)",
      height: "200vh",
    }}
  >
    <div style={{ position: "relative" }}>{children}</div>
  </div>
);

storiesOf("AddForm/Suggestions List", module)
  .add("results", () => (
    <Container>
      <SuggestionsList
        isSearching={false}
        foundFoodItems={foundFoodItems}
        onFoodItemSelected={action("loadFoodItem")}
      />
    </Container>
  ))
  .add("searching", () => (
    <Container>
      <SuggestionsList
        isSearching={true}
        foundFoodItems={undefined}
        onFoodItemSelected={action("loadFoodItem")}
      />
    </Container>
  ));
