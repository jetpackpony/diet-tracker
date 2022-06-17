import { Close, Copy, Menu, Trash } from "grommet-icons";
import React, { useContext } from "react";
import SelectionContext from "../../SelectionContext";
import styles from './AppBar.module.css';
import AppBarButton from "./AppBarButton";

const AppBar = ({
  deleteRecords,
  cloneRecords
}) => {
  const { selectedRecords, clearSelection } = useContext(SelectionContext);
  const onDeleteRecords = () => {
    deleteRecords(selectedRecords);
    clearSelection();
  };
  const onCloneRecords = () => {
    cloneRecords(selectedRecords);
    clearSelection();
  };
  const onCloseSelection = () => {
    clearSelection();
  }

  return (
    <header className={styles.header}>
      <AppBarButton icon={Menu} />
      <div className={styles.title}>Food</div>
      {
        (selectedRecords.length > 0) && (
          <>
            <AppBarButton icon={Copy} onClick={onCloneRecords} />
            <AppBarButton icon={Trash} onClick={onDeleteRecords} />
            <AppBarButton icon={Close} onClick={onCloseSelection} />
          </>
        )
      }
    </header>
  );
};

export default AppBar;