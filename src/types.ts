import { DayRecords, Record, WeekRecords } from "./generated/graphql";

export type WeekRecordsWithCalDeficit = {
  days: DayRecordsWithCalDeficit[];
  calDeficit: number;
} & WeekRecords;

export type DayRecordsWithCalDeficit = {
  records: RecordWithMacros[];
  calDeficit: number;
} & DayRecords;

export type RecordWithMacros = {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
} & Record;
