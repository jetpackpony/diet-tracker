import { Close, Copy, Menu, Trash } from "grommet-icons";
import React, { useContext } from "react";
import SelectionContext, { SelectionItem } from "../../SelectionContext";
import styles from './AppBar.module.css';
import AppBarButton from "./AppBarButton";

interface Props {
  deleteRecords: (items: SelectionItem[]) => void,
  cloneRecords: (items: SelectionItem[]) => void
}

const AppBar = ({
  deleteRecords,
  cloneRecords
}: Props) => {
  const { selectedRecords, clearSelection } = useContext(SelectionContext);
  const onDeleteRecords = () => {
    if (window.confirm("Delete?")) {
      deleteRecords(selectedRecords);
      clearSelection();
    }
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