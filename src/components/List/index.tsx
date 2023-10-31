import styles from "./List.module.css";
import Ripple from "../Ripple";

interface ListProps {
  children: React.ReactNode;
}

interface ListItemProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
}

export const List = ({ children }: ListProps) => {
  return <ul className={styles.list}>{children}</ul>;
};
export const ListItem = ({ children, onClick }: ListItemProps) => {
  return (
    <li
      className={styles.listItem}
      // This is needed to cancel the onBlur event of the input in AddForm
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      {children}
      <Ripple />
    </li>
  );
};
