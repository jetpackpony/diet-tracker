import { useLazyQuery } from "@apollo/client";
import { SearchFoodItemsDocument } from "../generated/graphql";

export const useSearchFoodItem = () => {
  const [search, status] = useLazyQuery(SearchFoodItemsDocument);
  const searchFoodItem = (filter: string) => {
    console.log("Searching for: ", filter);
    search({ variables: { filter } });
  };

  return {
    searchFoodItem,
    isSearching: status.loading,
    searchData: status.data,
  };
};
