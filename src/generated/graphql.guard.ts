/*
 * Generated type guards for "graphql.tsx".
 * WARNING: Do not manually change this file.
 */
import { Maybe, InputMaybe, Exact, MakeOptional, MakeMaybe, Scalars, DayRecords, FoodItem, LoginResult, Mutation, MutationAddFoodItemArgs, MutationAddRecordArgs, MutationAddRecordWithFoodItemArgs, MutationDeleteRecordArgs, MutationUpdateRecordArgs, Query, QueryFilterFoodItemsArgs, QueryGetFoodItemsArgs, QueryGetRecordArgs, QueryLoginArgs, QueryRecordsFeedArgs, QueryTotalsArgs, QueryWeeklyRecordsFeedArgs, Record, RecordFeed, Totals, User, WeekRecords, WeeklyRecordsFeed, AddRecordMutationVariables, AddRecordMutation, AddRecordWithFoodItemMutationVariables, AddRecordWithFoodItemMutation, DeleteRecordMutationVariables, DeleteRecordMutation, IsLoggedInQueryVariables, IsLoggedInQuery, LoginQueryVariables, LoginQuery, SearchFoodItemsQueryVariables, SearchFoodItemsQuery, UpdateRecordMutationVariables, UpdateRecordMutation, WeeklyRecordsFeedQueryVariables, WeeklyRecordsFeedQuery } from "./graphql";

export function isMaybe(obj: any, _argumentName?: string): obj is Maybe {
    return (
        (obj === null ||
            typeof obj === "T")
    )
}

export function isInputMaybe(obj: any, _argumentName?: string): obj is InputMaybe {
    return (
        (obj === null ||
            typeof obj === "T")
    )
}

export function isExact(obj: any, _argumentName?: string): obj is Exact {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function")
    )
}

export function isMakeOptional(obj: any, _argumentName?: string): obj is MakeOptional {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function")
    )
}

export function isMakeMaybe(obj: any, _argumentName?: string): obj is MakeMaybe {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function")
    )
}

export function isScalars(obj: any, _argumentName?: string): obj is Scalars {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.ID === "string" &&
        typeof obj.String === "string" &&
        typeof obj.Boolean === "boolean" &&
        typeof obj.Int === "number" &&
        typeof obj.Float === "number"
    )
}

export function isDayRecords(obj: any, _argumentName?: string): obj is DayRecords {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.__typename === "undefined" ||
            obj.__typename === "DayRecords") &&
        Array.isArray(obj.records) &&
        obj.records.every((e: any) =>
            isRecord(e) as boolean
        ) &&
        isTotals(obj.totals) as boolean
    )
}

export function isFoodItem(obj: any, _argumentName?: string): obj is FoodItem {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.__typename === "undefined" ||
            obj.__typename === "FoodItem") &&
        typeof obj.calories === "number" &&
        typeof obj.carbs === "number" &&
        typeof obj.fat === "number" &&
        typeof obj.id === "string" &&
        typeof obj.protein === "number" &&
        typeof obj.title === "string"
    )
}

export function isLoginResult(obj: any, _argumentName?: string): obj is LoginResult {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.__typename === "undefined" ||
            obj.__typename === "LoginResult") &&
        typeof obj.token === "string" &&
        isUser(obj.user) as boolean
    )
}

export function isMutation(obj: any, _argumentName?: string): obj is Mutation {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.__typename === "undefined" ||
            obj.__typename === "Mutation") &&
        (typeof obj.addFoodItem === "undefined" ||
            obj.addFoodItem === null ||
            isFoodItem(obj.addFoodItem) as boolean) &&
        isRecord(obj.addRecord) as boolean &&
        isRecord(obj.addRecordWithFoodItem) as boolean &&
        typeof obj.deleteRecord === "string" &&
        isRecord(obj.updateRecord) as boolean
    )
}

export function isMutationAddFoodItemArgs(obj: any, _argumentName?: string): obj is MutationAddFoodItemArgs {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.calories === "number" &&
        typeof obj.carbs === "number" &&
        typeof obj.fat === "number" &&
        typeof obj.protein === "number" &&
        typeof obj.title === "string"
    )
}

export function isMutationAddRecordArgs(obj: any, _argumentName?: string): obj is MutationAddRecordArgs {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.foodItemID === "string" &&
        typeof obj.weight === "number"
    )
}

export function isMutationAddRecordWithFoodItemArgs(obj: any, _argumentName?: string): obj is MutationAddRecordWithFoodItemArgs {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.calories === "number" &&
        typeof obj.carbs === "number" &&
        typeof obj.fat === "number" &&
        typeof obj.protein === "number" &&
        typeof obj.title === "string" &&
        typeof obj.weight === "number"
    )
}

export function isMutationDeleteRecordArgs(obj: any, _argumentName?: string): obj is MutationDeleteRecordArgs {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "string"
    )
}

export function isMutationUpdateRecordArgs(obj: any, _argumentName?: string): obj is MutationUpdateRecordArgs {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "string" &&
        typeof obj.weight === "number"
    )
}

export function isQuery(obj: any, _argumentName?: string): obj is Query {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.__typename === "undefined" ||
            obj.__typename === "Query") &&
        Array.isArray(obj.filterFoodItems) &&
        obj.filterFoodItems.every((e: any) =>
            isFoodItem(e) as boolean
        ) &&
        Array.isArray(obj.foodItems) &&
        obj.foodItems.every((e: any) =>
            isFoodItem(e) as boolean
        ) &&
        Array.isArray(obj.getAllRecords) &&
        obj.getAllRecords.every((e: any) =>
            isRecord(e) as boolean
        ) &&
        Array.isArray(obj.getFoodItems) &&
        obj.getFoodItems.every((e: any) =>
            isFoodItem(e) as boolean
        ) &&
        (typeof obj.getRecord === "undefined" ||
            obj.getRecord === null ||
            isRecord(obj.getRecord) as boolean) &&
        typeof obj.isLoggedIn === "boolean" &&
        isLoginResult(obj.login) as boolean &&
        isRecordFeed(obj.recordsFeed) as boolean &&
        isTotals(obj.totals) as boolean &&
        isWeeklyRecordsFeed(obj.weeklyRecordsFeed) as boolean
    )
}

export function isQueryFilterFoodItemsArgs(obj: any, _argumentName?: string): obj is QueryFilterFoodItemsArgs {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.filter === "string" &&
        typeof obj.limit === "number"
    )
}

export function isQueryGetFoodItemsArgs(obj: any, _argumentName?: string): obj is QueryGetFoodItemsArgs {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        Array.isArray(obj.ids) &&
        obj.ids.every((e: any) =>
            typeof e === "string"
        )
    )
}

export function isQueryGetRecordArgs(obj: any, _argumentName?: string): obj is QueryGetRecordArgs {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "string"
    )
}

export function isQueryLoginArgs(obj: any, _argumentName?: string): obj is QueryLoginArgs {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.password === "string" &&
        typeof obj.userName === "string"
    )
}

export function isQueryRecordsFeedArgs(obj: any, _argumentName?: string): obj is QueryRecordsFeedArgs {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.cursor === "string" &&
        typeof obj.limit === "number"
    )
}

export function isQueryTotalsArgs(obj: any, _argumentName?: string): obj is QueryTotalsArgs {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function")
    )
}

export function isQueryWeeklyRecordsFeedArgs(obj: any, _argumentName?: string): obj is QueryWeeklyRecordsFeedArgs {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.cursor === "string" &&
        typeof obj.limit === "number"
    )
}

export function isRecord(obj: any, _argumentName?: string): obj is Record {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.__typename === "undefined" ||
            obj.__typename === "Record") &&
        isFoodItem(obj.foodItem) as boolean &&
        typeof obj.id === "string" &&
        typeof obj.weight === "number"
    )
}

export function isRecordFeed(obj: any, _argumentName?: string): obj is RecordFeed {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.__typename === "undefined" ||
            obj.__typename === "RecordFeed") &&
        typeof obj.cursor === "string" &&
        Array.isArray(obj.records) &&
        obj.records.every((e: any) =>
            isRecord(e) as boolean
        )
    )
}

export function isTotals(obj: any, _argumentName?: string): obj is Totals {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.__typename === "undefined" ||
            obj.__typename === "Totals") &&
        typeof obj.calories === "number" &&
        typeof obj.carbs === "number" &&
        typeof obj.fat === "number" &&
        typeof obj.protein === "number"
    )
}

export function isUser(obj: any, _argumentName?: string): obj is User {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.__typename === "undefined" ||
            obj.__typename === "User") &&
        typeof obj.id === "string" &&
        typeof obj.userName === "string"
    )
}

export function isWeekRecords(obj: any, _argumentName?: string): obj is WeekRecords {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.__typename === "undefined" ||
            obj.__typename === "WeekRecords") &&
        Array.isArray(obj.days) &&
        obj.days.every((e: any) =>
            isDayRecords(e) as boolean
        ) &&
        isTotals(obj.totals) as boolean
    )
}

export function isWeeklyRecordsFeed(obj: any, _argumentName?: string): obj is WeeklyRecordsFeed {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.__typename === "undefined" ||
            obj.__typename === "WeeklyRecordsFeed") &&
        typeof obj.cursor === "string" &&
        Array.isArray(obj.weeks) &&
        obj.weeks.every((e: any) =>
            isWeekRecords(e) as boolean
        )
    )
}

export function isAddRecordMutationVariables(obj: any, _argumentName?: string): obj is AddRecordMutationVariables {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.foodItemID === "string" &&
        typeof obj.weight === "number"
    )
}

export function isAddRecordMutation(obj: any, _argumentName?: string): obj is AddRecordMutation {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.__typename === "undefined" ||
            obj.__typename === "Mutation") &&
        (obj.addRecord !== null &&
            typeof obj.addRecord === "object" ||
            typeof obj.addRecord === "function") &&
        (typeof obj.addRecord.__typename === "undefined" ||
            obj.addRecord.__typename === "Record") &&
        typeof obj.addRecord.id === "string" &&
        typeof obj.addRecord.weight === "number" &&
        (obj.addRecord.foodItem !== null &&
            typeof obj.addRecord.foodItem === "object" ||
            typeof obj.addRecord.foodItem === "function") &&
        (typeof obj.addRecord.foodItem.__typename === "undefined" ||
            obj.addRecord.foodItem.__typename === "FoodItem") &&
        typeof obj.addRecord.foodItem.id === "string" &&
        typeof obj.addRecord.foodItem.title === "string" &&
        typeof obj.addRecord.foodItem.calories === "number" &&
        typeof obj.addRecord.foodItem.protein === "number" &&
        typeof obj.addRecord.foodItem.fat === "number" &&
        typeof obj.addRecord.foodItem.carbs === "number"
    )
}

export function isAddRecordWithFoodItemMutationVariables(obj: any, _argumentName?: string): obj is AddRecordWithFoodItemMutationVariables {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.title === "string" &&
        typeof obj.calories === "number" &&
        typeof obj.protein === "number" &&
        typeof obj.fat === "number" &&
        typeof obj.carbs === "number" &&
        typeof obj.weight === "number"
    )
}

export function isAddRecordWithFoodItemMutation(obj: any, _argumentName?: string): obj is AddRecordWithFoodItemMutation {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.__typename === "undefined" ||
            obj.__typename === "Mutation") &&
        (obj.addRecordWithFoodItem !== null &&
            typeof obj.addRecordWithFoodItem === "object" ||
            typeof obj.addRecordWithFoodItem === "function") &&
        (typeof obj.addRecordWithFoodItem.__typename === "undefined" ||
            obj.addRecordWithFoodItem.__typename === "Record") &&
        typeof obj.addRecordWithFoodItem.id === "string" &&
        typeof obj.addRecordWithFoodItem.weight === "number" &&
        (obj.addRecordWithFoodItem.foodItem !== null &&
            typeof obj.addRecordWithFoodItem.foodItem === "object" ||
            typeof obj.addRecordWithFoodItem.foodItem === "function") &&
        (typeof obj.addRecordWithFoodItem.foodItem.__typename === "undefined" ||
            obj.addRecordWithFoodItem.foodItem.__typename === "FoodItem") &&
        typeof obj.addRecordWithFoodItem.foodItem.id === "string" &&
        typeof obj.addRecordWithFoodItem.foodItem.title === "string" &&
        typeof obj.addRecordWithFoodItem.foodItem.calories === "number" &&
        typeof obj.addRecordWithFoodItem.foodItem.protein === "number" &&
        typeof obj.addRecordWithFoodItem.foodItem.fat === "number" &&
        typeof obj.addRecordWithFoodItem.foodItem.carbs === "number"
    )
}

export function isDeleteRecordMutationVariables(obj: any, _argumentName?: string): obj is DeleteRecordMutationVariables {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "string"
    )
}

export function isDeleteRecordMutation(obj: any, _argumentName?: string): obj is DeleteRecordMutation {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.__typename === "undefined" ||
            obj.__typename === "Mutation") &&
        typeof obj.deleteRecord === "string"
    )
}

export function isIsLoggedInQueryVariables(obj: any, _argumentName?: string): obj is IsLoggedInQueryVariables {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function")
    )
}

export function isIsLoggedInQuery(obj: any, _argumentName?: string): obj is IsLoggedInQuery {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.__typename === "undefined" ||
            obj.__typename === "Query") &&
        typeof obj.isLoggedIn === "boolean"
    )
}

export function isLoginQueryVariables(obj: any, _argumentName?: string): obj is LoginQueryVariables {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.userName === "string" &&
        typeof obj.password === "string"
    )
}

export function isLoginQuery(obj: any, _argumentName?: string): obj is LoginQuery {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.__typename === "undefined" ||
            obj.__typename === "Query") &&
        (obj.login !== null &&
            typeof obj.login === "object" ||
            typeof obj.login === "function") &&
        (typeof obj.login.__typename === "undefined" ||
            obj.login.__typename === "LoginResult") &&
        typeof obj.login.token === "string" &&
        (obj.login.user !== null &&
            typeof obj.login.user === "object" ||
            typeof obj.login.user === "function") &&
        (typeof obj.login.user.__typename === "undefined" ||
            obj.login.user.__typename === "User") &&
        typeof obj.login.user.id === "string"
    )
}

export function isSearchFoodItemsQueryVariables(obj: any, _argumentName?: string): obj is SearchFoodItemsQueryVariables {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.filter === "string"
    )
}

export function isSearchFoodItemsQuery(obj: any, _argumentName?: string): obj is SearchFoodItemsQuery {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.__typename === "undefined" ||
            obj.__typename === "Query") &&
        Array.isArray(obj.filterFoodItems) &&
        obj.filterFoodItems.every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            (typeof e.__typename === "undefined" ||
                e.__typename === "FoodItem") &&
            typeof e.id === "string" &&
            typeof e.title === "string" &&
            typeof e.calories === "number" &&
            typeof e.protein === "number" &&
            typeof e.fat === "number" &&
            typeof e.carbs === "number"
        )
    )
}

export function isUpdateRecordMutationVariables(obj: any, _argumentName?: string): obj is UpdateRecordMutationVariables {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "string" &&
        typeof obj.weight === "number"
    )
}

export function isUpdateRecordMutation(obj: any, _argumentName?: string): obj is UpdateRecordMutation {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.__typename === "undefined" ||
            obj.__typename === "Mutation") &&
        (obj.updateRecord !== null &&
            typeof obj.updateRecord === "object" ||
            typeof obj.updateRecord === "function") &&
        (typeof obj.updateRecord.__typename === "undefined" ||
            obj.updateRecord.__typename === "Record") &&
        typeof obj.updateRecord.id === "string" &&
        typeof obj.updateRecord.weight === "number"
    )
}

export function isWeeklyRecordsFeedQueryVariables(obj: any, _argumentName?: string): obj is WeeklyRecordsFeedQueryVariables {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.cursor === "string"
    )
}

export function isWeeklyRecordsFeedQuery(obj: any, _argumentName?: string): obj is WeeklyRecordsFeedQuery {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.__typename === "undefined" ||
            obj.__typename === "Query") &&
        (obj.weeklyRecordsFeed !== null &&
            typeof obj.weeklyRecordsFeed === "object" ||
            typeof obj.weeklyRecordsFeed === "function") &&
        (typeof obj.weeklyRecordsFeed.__typename === "undefined" ||
            obj.weeklyRecordsFeed.__typename === "WeeklyRecordsFeed") &&
        typeof obj.weeklyRecordsFeed.cursor === "string" &&
        Array.isArray(obj.weeklyRecordsFeed.weeks) &&
        obj.weeklyRecordsFeed.weeks.every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            (typeof e.__typename === "undefined" ||
                e.__typename === "WeekRecords") &&
            (e.totals !== null &&
                typeof e.totals === "object" ||
                typeof e.totals === "function") &&
            (typeof e.totals.__typename === "undefined" ||
                e.totals.__typename === "Totals") &&
            typeof e.totals.calories === "number" &&
            typeof e.totals.protein === "number" &&
            typeof e.totals.fat === "number" &&
            typeof e.totals.carbs === "number" &&
            Array.isArray(e.days) &&
            e.days.every((e: any) =>
                (e !== null &&
                    typeof e === "object" ||
                    typeof e === "function") &&
                (typeof e.__typename === "undefined" ||
                    e.__typename === "DayRecords") &&
                (e.totals !== null &&
                    typeof e.totals === "object" ||
                    typeof e.totals === "function") &&
                (typeof e.totals.__typename === "undefined" ||
                    e.totals.__typename === "Totals") &&
                typeof e.totals.calories === "number" &&
                typeof e.totals.protein === "number" &&
                typeof e.totals.fat === "number" &&
                typeof e.totals.carbs === "number" &&
                Array.isArray(e.records) &&
                e.records.every((e: any) =>
                    (e !== null &&
                        typeof e === "object" ||
                        typeof e === "function") &&
                    (typeof e.__typename === "undefined" ||
                        e.__typename === "Record") &&
                    typeof e.id === "string" &&
                    typeof e.weight === "number" &&
                    (e.foodItem !== null &&
                        typeof e.foodItem === "object" ||
                        typeof e.foodItem === "function") &&
                    (typeof e.foodItem.__typename === "undefined" ||
                        e.foodItem.__typename === "FoodItem") &&
                    typeof e.foodItem.id === "string" &&
                    typeof e.foodItem.title === "string" &&
                    typeof e.foodItem.calories === "number" &&
                    typeof e.foodItem.protein === "number" &&
                    typeof e.foodItem.fat === "number" &&
                    typeof e.foodItem.carbs === "number"
                )
            )
        )
    )
}
