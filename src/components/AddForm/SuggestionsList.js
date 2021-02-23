import React from 'react';
import styles from './AddForm.module.css';
import { List, ListItem } from '../List';

const SearchResults = ({
  isSearching,
  foundFoodItems,
  onFoodItemSelected
}) => {

  const foundResults = !isSearching && foundFoodItems && foundFoodItems.length > 0;
  const nothingFound = !isSearching && (!foundFoodItems || foundFoodItems.length <= 0);

  return (
    <div className={styles.searchList}>
      <List>
        {
          isSearching && <ListItem>Searchig...</ListItem>
        }
        {
          foundResults && foundFoodItems.map((item) => (
            <ListItem
              key={item.foodItemID}
              onClick={() => onFoodItemSelected(item)}
            >
              {item.title}:
              {item.calories} ccal
              {item.protein}/{item.fat}/{item.carbs}
            </ListItem>
          ))
        }
        {
          nothingFound && <ListItem>Nothing found</ListItem>
        }
      </List>
    </div>
  );
};

export default SearchResults;