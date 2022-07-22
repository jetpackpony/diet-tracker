import { DayRecords, WeekRecords } from "./generated/graphql";

export type WeekRecordsWithCalDeficit = WeekRecords & { calDeficit: number };
export type DayRecordsWithCalDeficit = DayRecords & { calDeficit: number };
