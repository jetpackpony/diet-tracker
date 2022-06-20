import React from 'react';
import styles from './SuggestionsList.module.css';
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
              <div>{item.title}</div>
              <div className={styles.subtitle}>{item.calories} cal {item.protein}/{item.fat}/{item.carbs}</div>
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