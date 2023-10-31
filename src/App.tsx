import "./reset.css";
import "./App.css";
import styles from "./App.module.css";
import Login from "./components/Login";
import { useQuery } from "@apollo/client";
import AppBar from "./components/AppBar";
import AddForm from "./components/AddForm";
import FoodJournal from "./components/FoodJournal";
import SelectionContext, { useSelection } from "./SelectionContext";
import { IsLoggedInDocument } from "./generated/graphql";
import { useDeleteRecords } from "./hooks/useDeleteRecords";
import { useCloneRecords } from "./hooks/useCloneRecords";

const App = () => {
  const { data } = useQuery(IsLoggedInDocument);
  const selectionContextValue = useSelection();
  const deleteRecords = useDeleteRecords();
  const cloneRecords = useCloneRecords();

  return (
    <SelectionContext.Provider value={selectionContextValue}>
      <AppBar deleteRecords={deleteRecords} cloneRecords={cloneRecords} />
      <main className={styles.main}>
        {data && data.isLoggedIn ? (
          <>
            <AddForm />
            <FoodJournal />
          </>
        ) : (
          <Login />
        )}
      </main>
    </SelectionContext.Provider>
  );
};

export default App;
