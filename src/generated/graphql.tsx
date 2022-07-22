import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type DayRecords = {
  __typename?: 'DayRecords';
  dayEnd: Scalars['DateTime'];
  dayStart: Scalars['DateTime'];
  records: Array<Record>;
  totals: Totals;
};

export type FoodItem = {
  __typename?: 'FoodItem';
  calories: Scalars['Float'];
  carbs: Scalars['Float'];
  fat: Scalars['Float'];
  id: Scalars['ID'];
  protein: Scalars['Float'];
  title: Scalars['String'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  token: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFoodItem?: Maybe<FoodItem>;
  addRecord: Record;
  addRecordWithFoodItem: Record;
  deleteRecord: Scalars['ID'];
  updateRecord: Record;
};


export type MutationAddFoodItemArgs = {
  calories: Scalars['Float'];
  carbs: Scalars['Float'];
  fat: Scalars['Float'];
  protein: Scalars['Float'];
  title: Scalars['String'];
};


export type MutationAddRecordArgs = {
  createdAt: Scalars['DateTime'];
  eatenAt: Scalars['DateTime'];
  foodItemID: Scalars['ID'];
  weight: Scalars['Int'];
};


export type MutationAddRecordWithFoodItemArgs = {
  calories: Scalars['Float'];
  carbs: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  eatenAt: Scalars['DateTime'];
  fat: Scalars['Float'];
  protein: Scalars['Float'];
  title: Scalars['String'];
  weight: Scalars['Int'];
};


export type MutationDeleteRecordArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateRecordArgs = {
  id: Scalars['ID'];
  weight: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  filterFoodItems: Array<FoodItem>;
  foodItems: Array<FoodItem>;
  getAllRecords: Array<Record>;
  getFoodItems: Array<FoodItem>;
  getRecord?: Maybe<Record>;
  isLoggedIn: Scalars['Boolean'];
  login: LoginResult;
  recordsFeed: RecordFeed;
  totals: Totals;
  weeklyRecordsFeed: WeeklyRecordsFeed;
};


export type QueryFilterFoodItemsArgs = {
  filter: Scalars['String'];
  limit: Scalars['Int'];
};


export type QueryGetFoodItemsArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryGetRecordArgs = {
  id: Scalars['ID'];
};


export type QueryLoginArgs = {
  password: Scalars['String'];
  userName: Scalars['String'];
};


export type QueryRecordsFeedArgs = {
  cursor: Scalars['String'];
  limit: Scalars['Int'];
};


export type QueryTotalsArgs = {
  endInterval: Scalars['DateTime'];
  startInterval: Scalars['DateTime'];
};


export type QueryWeeklyRecordsFeedArgs = {
  cursor: Scalars['String'];
  limit: Scalars['Int'];
};

export type Record = {
  __typename?: 'Record';
  createdAt: Scalars['DateTime'];
  eatenAt: Scalars['DateTime'];
  foodItem: FoodItem;
  id: Scalars['ID'];
  weight: Scalars['Int'];
};

export type RecordFeed = {
  __typename?: 'RecordFeed';
  cursor: Scalars['String'];
  records: Array<Record>;
};

export type Totals = {
  __typename?: 'Totals';
  calories: Scalars['Float'];
  carbs: Scalars['Float'];
  fat: Scalars['Float'];
  protein: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  userName: Scalars['String'];
};

export type WeekRecords = {
  __typename?: 'WeekRecords';
  days: Array<DayRecords>;
  totals: Totals;
  weekEnd: Scalars['DateTime'];
  weekStart: Scalars['DateTime'];
};

export type WeeklyRecordsFeed = {
  __typename?: 'WeeklyRecordsFeed';
  cursor: Scalars['String'];
  weeks: Array<WeekRecords>;
};

export type AddRecordMutationVariables = Exact<{
  foodItemID: Scalars['ID'];
  weight: Scalars['Int'];
  eatenAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
}>;


export type AddRecordMutation = { __typename?: 'Mutation', addRecord: { __typename?: 'Record', id: string, weight: number, eatenAt: any, createdAt: any, foodItem: { __typename?: 'FoodItem', id: string, title: string, calories: number, protein: number, fat: number, carbs: number } } };

export type AddRecordWithFoodItemMutationVariables = Exact<{
  title: Scalars['String'];
  calories: Scalars['Float'];
  protein: Scalars['Float'];
  fat: Scalars['Float'];
  carbs: Scalars['Float'];
  weight: Scalars['Int'];
  eatenAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
}>;


export type AddRecordWithFoodItemMutation = { __typename?: 'Mutation', addRecordWithFoodItem: { __typename?: 'Record', id: string, weight: number, eatenAt: any, createdAt: any, foodItem: { __typename?: 'FoodItem', id: string, title: string, calories: number, protein: number, fat: number, carbs: number } } };

export type DeleteRecordMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteRecordMutation = { __typename?: 'Mutation', deleteRecord: string };

export type IsLoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type IsLoggedInQuery = { __typename?: 'Query', isLoggedIn: boolean };

export type LoginQueryVariables = Exact<{
  userName: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'LoginResult', token: string, user: { __typename?: 'User', id: string } } };

export type SearchFoodItemsQueryVariables = Exact<{
  filter: Scalars['String'];
}>;


export type SearchFoodItemsQuery = { __typename?: 'Query', filterFoodItems: Array<{ __typename?: 'FoodItem', title: string, calories: number, protein: number, fat: number, carbs: number, foodItemID: string }> };

export type UpdateRecordMutationVariables = Exact<{
  id: Scalars['ID'];
  weight: Scalars['Int'];
}>;


export type UpdateRecordMutation = { __typename?: 'Mutation', updateRecord: { __typename?: 'Record', id: string, weight: number } };

export type WeeklyRecordsFeedQueryVariables = Exact<{
  cursor: Scalars['String'];
}>;


export type WeeklyRecordsFeedQuery = { __typename?: 'Query', weeklyRecordsFeed: { __typename?: 'WeeklyRecordsFeed', cursor: string, weeks: Array<{ __typename?: 'WeekRecords', weekStart: any, weekEnd: any, totals: { __typename?: 'Totals', calories: number, protein: number, fat: number, carbs: number }, days: Array<{ __typename?: 'DayRecords', dayStart: any, dayEnd: any, totals: { __typename?: 'Totals', calories: number, protein: number, fat: number, carbs: number }, records: Array<{ __typename?: 'Record', id: string, weight: number, eatenAt: any, createdAt: any, foodItem: { __typename?: 'FoodItem', id: string, title: string, calories: number, protein: number, fat: number, carbs: number } }> }> }> } };


export const AddRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"foodItemID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"weight"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eatenAt"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createdAt"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"foodItemID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"foodItemID"}}},{"kind":"Argument","name":{"kind":"Name","value":"weight"},"value":{"kind":"Variable","name":{"kind":"Name","value":"weight"}}},{"kind":"Argument","name":{"kind":"Name","value":"eatenAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eatenAt"}}},{"kind":"Argument","name":{"kind":"Name","value":"createdAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createdAt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"foodItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"protein"}},{"kind":"Field","name":{"kind":"Name","value":"fat"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}}]}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"eatenAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<AddRecordMutation, AddRecordMutationVariables>;
export const AddRecordWithFoodItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddRecordWithFoodItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"calories"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"protein"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fat"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"carbs"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"weight"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eatenAt"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createdAt"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addRecordWithFoodItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"calories"},"value":{"kind":"Variable","name":{"kind":"Name","value":"calories"}}},{"kind":"Argument","name":{"kind":"Name","value":"protein"},"value":{"kind":"Variable","name":{"kind":"Name","value":"protein"}}},{"kind":"Argument","name":{"kind":"Name","value":"fat"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fat"}}},{"kind":"Argument","name":{"kind":"Name","value":"carbs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"carbs"}}},{"kind":"Argument","name":{"kind":"Name","value":"weight"},"value":{"kind":"Variable","name":{"kind":"Name","value":"weight"}}},{"kind":"Argument","name":{"kind":"Name","value":"eatenAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eatenAt"}}},{"kind":"Argument","name":{"kind":"Name","value":"createdAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createdAt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"foodItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"protein"}},{"kind":"Field","name":{"kind":"Name","value":"fat"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}}]}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"eatenAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<AddRecordWithFoodItemMutation, AddRecordWithFoodItemMutationVariables>;
export const DeleteRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteRecordMutation, DeleteRecordMutationVariables>;
export const IsLoggedInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsLoggedIn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isLoggedIn"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"client"}}]}]}}]} as unknown as DocumentNode<IsLoggedInQuery, IsLoggedInQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userName"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginQuery, LoginQueryVariables>;
export const SearchFoodItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchFoodItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filterFoodItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"foodItemID"},"name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"protein"}},{"kind":"Field","name":{"kind":"Name","value":"fat"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}}]}}]}}]} as unknown as DocumentNode<SearchFoodItemsQuery, SearchFoodItemsQueryVariables>;
export const UpdateRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"weight"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"weight"},"value":{"kind":"Variable","name":{"kind":"Name","value":"weight"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}}]}}]}}]} as unknown as DocumentNode<UpdateRecordMutation, UpdateRecordMutationVariables>;
export const WeeklyRecordsFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WeeklyRecordsFeed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weeklyRecordsFeed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"weeks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weekStart"}},{"kind":"Field","name":{"kind":"Name","value":"weekEnd"}},{"kind":"Field","name":{"kind":"Name","value":"totals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"protein"}},{"kind":"Field","name":{"kind":"Name","value":"fat"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}}]}},{"kind":"Field","name":{"kind":"Name","value":"days"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dayStart"}},{"kind":"Field","name":{"kind":"Name","value":"dayEnd"}},{"kind":"Field","name":{"kind":"Name","value":"totals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"protein"}},{"kind":"Field","name":{"kind":"Name","value":"fat"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}}]}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"foodItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"protein"}},{"kind":"Field","name":{"kind":"Name","value":"fat"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}}]}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"eatenAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<WeeklyRecordsFeedQuery, WeeklyRecordsFeedQueryVariables>;