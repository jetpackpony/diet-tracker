import React, { useState } from 'react';
import foldableGridStyles from './FoldableGrid.module.css';
import { Up, Down } from 'grommet-icons';

const useFoldableGrid = () => {
  const [isUnfolded, setUnfolded] = useState(false);
  const toggleFold = () => setUnfolded(!isUnfolded);
  const unfoldButton = (
    <button
      className={foldableGridStyles.unfold}
      onClick={toggleFold}
    >
      {
        isUnfolded
          ? <Up color="#959595" size="small" />
          : <Down color="#959595" size="small" />
      }
    </button>
  );
  const containerClass = [
    isUnfolded ? foldableGridStyles.unfolded : "",
    foldableGridStyles.grid,
  ].join(" ");

  return {
    toggleFold,
    unfoldButton,
    containerClass,
    titleClass: foldableGridStyles.title,
    statItemClass: foldableGridStyles.statItem
  };
}

export default useFoldableGrid;