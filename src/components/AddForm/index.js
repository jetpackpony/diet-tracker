import React from 'react';

const AddForm = () => (
  <form>
    <h1>Add Food</h1>
    <label htmlFor="title">
      <span>Food: </span>
    </label>
    <input type="text" id="title" name="title" />

    <label htmlFor="weight">
      <span>Weight: </span>
    </label>
    <input type="number" id="weight" name="weight" />

    <label htmlFor="calories">
      <span>Ccal: </span>
    </label>
    <input type="number" id="calories" name="calories" />

    <label htmlFor="protein">
      <span>Protein: </span>
    </label>
    <input type="number" id="protein" name="protein" />

    <label htmlFor="fat">
      <span>Fat: </span>
    </label>
    <input type="number" id="fat" name="fat" />

    <label htmlFor="carbs">
      <span>Net Carbs: </span>
    </label>
    <input type="number" id="carbs" name="carbs" />
  </form>

);

export default AddForm;