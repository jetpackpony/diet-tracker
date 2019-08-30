import React, { useState } from 'react';
import foldableGridStyles from './FoldableGrid.module.css';

const useFoldableGrid = () => {
  const [isUnfolded, setUnfolded] = useState(false);
  const unfoldButton = (
    <button
      className={foldableGridStyles.unfold}
      onClick={() => setUnfolded(!isUnfolded)}
    >
      {
        isUnfolded
          ? "fold"
          : "unfold"
      }
    </button>
  );
  const containerClass = [
    isUnfolded ? foldableGridStyles.unfolded : "",
    foldableGridStyles.grid,
  ].join(" ");

  return {
    unfoldButton,
    containerClass,
    titleClass: foldableGridStyles.title,
    statItemClass: foldableGridStyles.statItem
  };
}

export default useFoldableGrid;