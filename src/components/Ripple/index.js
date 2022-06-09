import React, { useState } from 'react';
import styles from './Ripple.module.css';

const Ripple = () => {
  const [inkPos, setInkPos] = useState({ top: 0, left: 0, size: 0 });
  const [inkActive, setInkActive] = useState(false);
  const triggerRipple = (e) => {
    const parentRect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(parentRect.width, parentRect.height);
    const top = e.clientY - parentRect.top - size / 2;
    const left = e.clientX - parentRect.left - size / 2;
    setInkPos({ top, left, size });
    setInkActive(true);
    setTimeout(() => setInkActive(false), 400);
  };

  return (
    <div className={styles.wrapper} onClick={triggerRipple}>
      <span
        className={[styles.ink, (inkActive) ? styles.inkActive : ""].join(" ")}
        style={{ top: inkPos.top, left: inkPos.left, width: inkPos.size, height: inkPos.size }}
      ></span>
    </div>
  );
};

export default Ripple;