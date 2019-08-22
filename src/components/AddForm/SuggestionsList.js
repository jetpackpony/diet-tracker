import React from 'react';
import styles from './AddForm.module.css';

const SearchResults = ({
  showSuggestions,
  isSearching,
  foundFoodItems,
  onFoodItemSelected
}) => {

  if (!showSuggestions) return null;

  return (
    <div className={styles.searchList}>
      {
        (isSearching)
          ? (
            <span>Searching...</span>
          )
          : (
            (foundFoodItems && foundFoodItems.length > 0)
              ? (
                <ul>
                  {
                    foundFoodItems.map((item) => (
                      <li
                        key={item.foodItemID}
                        onMouseDown={() => onFoodItemSelected(item)}
                        onTouchStart={() => onFoodItemSelected(item)}
                      >
                        {item.title}:
                        {item.calories} ccal
                        {item.protein}/{item.fat}/{item.carbs}
                      </li>
                    ))
                  }
                </ul>
              )
              : (
                <span>Nothing found</span>
              )
          )
      }
    </div>
  );
};

export default SearchResults;