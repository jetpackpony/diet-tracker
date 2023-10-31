import React from "react";
import moment from "moment";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { changeAllDatesToDate } from "./utils";

import FoodJournal from "../FoodJournal";
import DayHeader from "../DayHeader";
import RecordLine from "../RecordLine";
import WeekHeader from "../WeekHeader";
import testData from "./testData.json";
import DaysList from "../DaysList";
import EditField from "../RecordLine/EditField";
import { DayRecordsWithCalDeficit } from "../../../types";

storiesOf("FoodJournal", module)
  .add("with all items", () => (
    <FoodJournal
      weeks={testData}
      fetchMoreRecords={action("fetchMoreRecords")}
      updateRecord={action("updateRecord")}
    />
  ))
  .add("with 0 items for today", () => <div>To be implemented</div>)
  .add("with 0 items for this week", () => <div>To be implemented</div>);

storiesOf("FoodJournal/Days list", module).add("default", () => (
  <DaysList
    days={[
      changeAllDatesToDate(
        moment().add(2, "day"),
        testData[1].days[2],
      ) as DayRecordsWithCalDeficit,
      changeAllDatesToDate(
        moment().add(1, "day"),
        testData[1].days[1],
      ) as DayRecordsWithCalDeficit,
      changeAllDatesToDate(
        moment(),
        testData[1].days[0],
      ) as DayRecordsWithCalDeficit,
      ...testData[0].days,
    ]}
    updateRecord={action("updateRecord")}
  />
));

storiesOf("FoodJournal/Week Header", module).add("default", () => (
  <WeekHeader
    weekStart="2019-08-26T00:00:00.000Z"
    weekEnd="2019-09-02T00:00:00.000Z"
    calDeficit={4723}
  />
));

storiesOf("FoodJournal/Day Header", module).add("default", () => (
  <DayHeader
    dayStart="2019-08-28T00:00:00.000Z"
    totals={{
      calories: 14,
      protein: 1.23,
      fat: 1.23,
      carbs: 1.23,
    }}
    calDeficit={2356}
  />
));

storiesOf("FoodJournal/Record Line", module)
  .add("default", () => (
    <RecordLine
      id="5d66808e0a59eb06549e0fe3"
      foodItem={{
        id: "5d66808e0a59eb06549e0fe2",
        title: "New Testeme",
        calories: 250,
        protein: 26.76,
        fat: 24.53,
        carbs: 122.65,
      }}
      weight={123}
      calories={14}
      protein={1.23}
      fat={1.23}
      carbs={1.23}
      updateRecord={action("updateRecord")}
    />
  ))
  .add("long names", () => (
    <RecordLine
      id="5d66808e0a59eb06549e0fe3"
      foodItem={{
        id: "5d66808e0a59eb06549e0fe2",
        title:
          "This is a long food item name probably shouldn't be this long in real life",
        calories: 250,
        protein: 26.76,
        fat: 24.53,
        carbs: 122.65,
      }}
      weight={9999}
      calories={9999}
      protein={999.99}
      fat={999.99}
      carbs={999.99}
      updateRecord={action("updateRecord")}
    />
  ))
  .add("multiple", () => (
    <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
      <RecordLine
        id="5d66808e0a59eb06549e0fe3"
        foodItem={{
          id: "5d66808e0a59eb06549e0fe2",
          title: "New Testeme",
          calories: 250,
          protein: 26.76,
          fat: 24.53,
          carbs: 122.65,
        }}
        weight={123}
        calories={14}
        protein={1.23}
        fat={1.23}
        carbs={1.23}
        updateRecord={action("updateRecord")}
      />
      <RecordLine
        id="5d66808e0a59eb06549e0fe3"
        foodItem={{
          id: "5d66808e0a59eb06549e0fe2",
          title: "New Testeme",
          calories: 250,
          protein: 26.76,
          fat: 24.53,
          carbs: 122.65,
        }}
        weight={123}
        calories={14}
        protein={1.23}
        fat={1.23}
        carbs={1.23}
        updateRecord={action("updateRecord")}
      />
      <RecordLine
        id="5d66808e0a59eb06549e0fe3"
        foodItem={{
          id: "5d66808e0a59eb06549e0fe2",
          title: "New Testeme",
          calories: 250,
          protein: 26.76,
          fat: 24.53,
          carbs: 122.65,
        }}
        weight={123}
        calories={14}
        protein={1.23}
        fat={1.23}
        carbs={1.23}
        updateRecord={action("updateRecord")}
      />
    </ol>
  ));

storiesOf("FoodJournal/Record Line/Edit Field", module).add("default", () => (
  <EditField weight={123} onUpdate={action("onUpdate")} />
));
