import { createStore } from 'redux';

const initialState = {
  records: [
    {
      title: "Cinnamon Rolls",
      weight: 230,
      calories: 670,
      protein: 12,
      fat: 45,
      carbs: 132,
      datetime: (new Date("28 Jul 2019 15:44:32")).toISOString(),
    },
    {
      title: "Yoghurt",
      weight: 300,
      calories: 270,
      protein: 54,
      fat: 24,
      carbs: 54,
      datetime: (new Date("28 Jul 2019 18:44:32")).toISOString(),
    },
    {
      title: "Cinnamon Rolls",
      weight: 230,
      calories: 670,
      protein: 12,
      fat: 45,
      carbs: 132,
      datetime: (new Date("27 Jul 2019 18:44:32")).toISOString(),
    },
    {
      title: "Yoghurt",
      weight: 300,
      calories: 270,
      protein: 54,
      fat: 24,
      carbs: 54,
      datetime: (new Date("27 Jul 2019 11:44:32")).toISOString(),
    },
  ]
};

const reducer = (state = initialState, action) => state;

const initStore = () => createStore(reducer);

export default initStore;