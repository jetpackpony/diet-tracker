import React, { useRef, useState } from "react";
import styles from "./ContextMenu.module.css";
import { List, ListItem } from "../List";

interface ContextMenuItem {
  title: string;
  action: (e: React.MouseEvent<HTMLLIElement>) => void;
}

interface ContextMenuProps {
  items: ContextMenuItem[];
  children: React.ReactNode;
  debugPos?: { x: number; y: number };
}

const ContextMenu = ({ items, children, debugPos }: ContextMenuProps) => {
  const menuEl = useRef<HTMLDivElement>(null);
  const [menuState, setMenuState] = useState({ show: false, coords: debugPos });
  let timer: NodeJS.Timeout;
  let touchCoords = { x: 0, y: 0 };

  const closeMenu = () => {
    setMenuState({
      ...menuState,
      show: false,
    });
    window.removeEventListener("scroll", closeMenuListener);
    window.removeEventListener("blur", closeMenuListener);
  };
  const closeMenuListener = () => {
    closeMenu();
  };
  const openMenu = () => {
    const padding = 10;
    const w = menuEl?.current?.offsetWidth || 0;
    const h = menuEl?.current?.offsetHeight || 0;
    if (touchCoords.x < padding) touchCoords.x = padding;
    if (touchCoords.y < padding) touchCoords.y = padding;
    if (touchCoords.x > window.innerWidth - w) {
      touchCoords.x = window.innerWidth - w - padding;
    }
    if (touchCoords.y > window.innerHeight - h) {
      touchCoords.y = window.innerHeight - h - padding;
    }

    setMenuState({ show: true, coords: touchCoords });
    window.addEventListener("scroll", closeMenuListener);
    window.addEventListener("blur", closeMenuListener);
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!menuState.show) {
      const touch = e.touches[0];
      touchCoords.x = touch.clientX;
      touchCoords.y = touch.clientY;
      timer = setTimeout(openMenu, 500);
    }
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!menuState.show) {
      const touch = e.touches[0];
      touchCoords.x = touch.clientX;
      touchCoords.y = touch.clientY;
    }
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    clearTimeout(timer);
  };

  const closeMenuCallback = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    closeMenu();
  };

  const menuClasses = [styles.menu];
  (menuState.show || debugPos) && menuClasses.push(styles["menu-visible"]);

  const backdropClasses = [styles.backdrop];
  (menuState.show || debugPos) &&
    backdropClasses.push(styles["backdrop-visible"]);

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
    >
      {children}
      <div
        className={backdropClasses.join(" ")}
        onClick={closeMenuCallback}
        onTouchStart={closeMenuCallback}
      ></div>
      <div
        className={menuClasses.join(" ")}
        style={
          menuState.coords && {
            top: `${menuState.coords.y}px`,
            left: `${menuState.coords.x}px`,
          }
        }
        ref={menuEl}
      >
        <List>
          {items.map((i) => (
            <ListItem
              key={i.title}
              onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                i.action(e);
                closeMenuCallback(e);
              }}
            >
              {i.title}
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default ContextMenu;
