import React, { useRef, useState } from 'react';
import styles from './ContextMenu.module.css';
import { List, ListItem } from '../List';

const ContextMenu = ({ items, children, debugPos = null }) => {
  const menuEl = useRef(null);
  const [menuState, setMenuState] = useState({ show: false, coords: debugPos });
  let timer;
  let touchCoords = { x: 0, y: 0 };

  const closeMenu = () => {
    setMenuState({
      ...menuState,
      show: false
    });
    window.removeEventListener('scroll', closeMenuListener);
    window.removeEventListener('blur', closeMenuListener);
  };
  const closeMenuListener = () => {
    closeMenu();
  };
  const openMenu = () => {
    const padding = 10;
    const w = menuEl.current.offsetWidth;
    const h = menuEl.current.offsetHeight;
    if (touchCoords.x < padding) touchCoords.x = padding;
    if (touchCoords.y < padding) touchCoords.y = padding;
    if (touchCoords.x > window.innerWidth - w) {
      touchCoords.x = window.innerWidth - w - padding;
    }
    if (touchCoords.y > window.innerHeight - h) {
      touchCoords.y = window.innerHeight - h - padding;
    }

    setMenuState({ show: true, coords: touchCoords });
    window.addEventListener('scroll', closeMenuListener);
    window.addEventListener('blur', closeMenuListener);
  };

  const onTouchStart = (e) => {
    if (!menuState.show) {
      const touch = e.touches[0];
      touchCoords.x = touch.clientX;
      touchCoords.y = touch.clientY;
      timer = setTimeout(openMenu, 500);
    }
  };

  const onTouchMove = (e) => {
    if (!menuState.show) {
      const touch = e.touches[0];
      touchCoords.x = touch.clientX;
      touchCoords.y = touch.clientY;
    }
  };

  const onTouchEnd = (e) => {
    clearTimeout(timer);
  };

  const closeMenuCallback = (e) => {
    e.stopPropagation();
    closeMenu();
  }

  const menuClasses = [styles.menu];
  (menuState.show || debugPos) && menuClasses.push(styles['menu-visible']);

  const backdropClasses = [styles.backdrop];
  (menuState.show || debugPos) && backdropClasses.push(styles['backdrop-visible']);

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
    >
      {children}
      <div
        className={backdropClasses.join(' ')}
        onClick={closeMenuCallback}
        onTouchStart={closeMenuCallback}
      >
      </div>
      <div
        className={menuClasses.join(" ")}
        style={menuState.coords && { top: menuState.coords.y, left: menuState.coords.x }}
        ref={menuEl}
      >
        <List onClick={closeMenuCallback}>
          {
            items.map((i) => (
              <ListItem
                key={i.title}
                onClick={i.action}
              >
                {i.title}
              </ListItem>
            ))
          }
        </List>
      </div>
    </div>
  );
};

export default ContextMenu;