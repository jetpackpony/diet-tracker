import React from 'react';
import FoodJournal from './FoodJournal';

const dates = [
  {
    date: "28 Jul 2019",
    totalCal: "3584",
    totalProtein: "44",
    totalFat: "132",
    totalCarbs: "23",
    itemList: [
      {
        title: "Cinnamon Rolls",
        weight: "230",
        calories: "670",
        protein: "12",
        fat: "45",
        carbs: "132"
      },
      {
        title: "Yoghurt",
        weight: "300",
        calories: "270",
        protein: "54",
        fat: "24",
        carbs: "54"
      },
    ]
  },
  {
    date: "28 Jul 2019",
    totalCal: "3584",
    totalProtein: "44",
    totalFat: "132",
    totalCarbs: "23",
    itemList: [
      {
        title: "Cinnamon Rolls",
        weight: "230",
        calories: "670",
        protein: "12",
        fat: "45",
        carbs: "132"
      },
      {
        title: "Yoghurt",
        weight: "300",
        calories: "270",
        protein: "54",
        fat: "24",
        carbs: "54"
      },
    ]
  }
];

export default () => (
  <FoodJournal dates={dates}/>
);