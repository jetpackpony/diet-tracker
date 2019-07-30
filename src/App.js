import React from 'react';
import FoodJournal from './components/FoodJournal';
import AddForm from './components/AddForm';

const App = () => {
  return (
    <main>
      <AddForm />
      <FoodJournal />
    </main>
  );
};

export default App;
