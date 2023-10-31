import { Close, Copy, Menu, Trash } from "grommet-icons";
import { useContext } from "react";
import SelectionContext, { SelectionItem } from "../../SelectionContext";
import styles from "./AppBar.module.css";
import AppBarButton from "./AppBarButton";

interface AppBarProps {
  deleteRecords: (items: SelectionItem[]) => void;
  cloneRecords: (items: SelectionItem[]) => void;
}

const AppBar = ({ deleteRecords, cloneRecords }: AppBarProps) => {
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
  };

  return (
    <header className={styles.header}>
      <AppBarButton Icon={Menu} />
      <div className={styles.title}>Food</div>
      {selectedRecords.length > 0 && (
        <>
          <AppBarButton Icon={Copy} onClick={onCloneRecords} />
          <AppBarButton Icon={Trash} onClick={onDeleteRecords} />
          <AppBarButton Icon={Close} onClick={onCloseSelection} />
        </>
      )}
    </header>
  );
};

export default AppBar;
