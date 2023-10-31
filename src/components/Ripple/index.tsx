import React, { useEffect, useState } from "react";
import styles from "./Ripple.module.css";

const Ripple = () => {
  const [inkPos, setInkPos] = useState({ top: 0, left: 0, size: 0 });
  const [inkActive, setInkActive] = useState(false);
  const triggerRipple = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    const clientX =
      ("clientX" in e ? e.clientX : e.targetTouches?.[0]?.clientX) || 0;
    const clientY =
      ("clientY" in e ? e.clientY : e.targetTouches?.[0]?.clientY) || 0;
    const parentRect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(parentRect.width, parentRect.height);
    const top = clientY - parentRect.top - size / 2;
    const left = clientX - parentRect.left - size / 2;
    setInkPos({ top, left, size });
    setInkActive(true);
  };

  useEffect(() => {
    if (inkActive) {
      const timeoutId = setTimeout(() => setInkActive(false), 400);
      return () => clearTimeout(timeoutId);
    }
  }, [inkActive]);

  return (
    <div
      className={styles.wrapper}
      onMouseDown={triggerRipple}
      onTouchStart={triggerRipple}
    >
      <span
        className={[styles.ink, inkActive ? styles.inkActive : ""].join(" ")}
        style={{
          top: inkPos.top,
          left: inkPos.left,
          width: inkPos.size,
          height: inkPos.size,
        }}
      ></span>
    </div>
  );
};

export default Ripple;
