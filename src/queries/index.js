import gql from 'graphql-tag';

export const GET_WEEKLY_FEED = gql`
  query WeeklyRecordsFeed($cursor: String!) {
    weeklyRecordsFeed(cursor: $cursor, limit: 1) {
      cursor
      weeks {
        weekStart
        weekEnd
        totals {
          calories
        }
        days {
          dayStart
          dayEnd
          totals {
            calories
            protein
            fat
            carbs
          }
          records {
            id,
            foodItem {
              id
              title
              calories
              protein
              fat
              carbs
            }
            weight
            eatenAt
            createdAt
          }
        }
      }
    }
  }
`;

export const UPDATE_RECORD = gql`
  mutation UpdateRecord(
    $id: ID!
    $weight: Int!
  ) {
    updateRecord(
      id: $id
      weight: $weight
    ) {
      id
      weight
    }
  }
`;
export const DELETE_RECORD = gql`
  mutation DeleteRecord($id: ID!) {
    deleteRecord(id: $id)
  }
`;

export const ADD_RECORD_WITH_FOOD_ITEM = gql`
  mutation AddRecordWithFoodItem(
    $title: String!
    $calories: Float!
    $protein: Float!
    $fat: Float!
    $carbs: Float!
    $weight: Int!
    $eatenAt: DateTime!
    $createdAt: DateTime!
  ) {
    addRecordWithFoodItem(
      title: $title
      calories: $calories
      protein: $protein
      fat: $fat
      carbs: $carbs
      weight: $weight
      eatenAt: $eatenAt
      createdAt: $createdAt
    ) {
      id,
      foodItem {
        id
        title
        calories
        protein
        fat
        carbs
      }
      weight
      eatenAt
      createdAt
    }
  }
`;

export const ADD_RECORD = gql`
  mutation AddRecord(
    $foodItemID: ID!
    $weight: Int!
    $eatenAt: DateTime!
    $createdAt: DateTime!
  ) {
    addRecord(
      foodItemID: $foodItemID
      weight: $weight
      eatenAt: $eatenAt
      createdAt: $createdAt
    ) {
      id,
      foodItem {
        id
        title
        calories
        protein
        fat
        carbs
      }
      weight
      eatenAt
      createdAt
    }
  }
`;

export const SEARCH_FOOD_ITEMS = gql`
  query SearchFoodItems($filter: String!) {
    filterFoodItems(filter: $filter, limit: 5) {
      foodItemID: id
      title
      calories
      protein
      fat
      carbs
    }
  }
`;