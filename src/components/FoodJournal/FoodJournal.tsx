import styles from "./FoodJournal.module.css";
import WeekHeader from "./WeekHeader";
import DaysList from "./DaysList";
import Button from "../Button";
import { WeekRecordsWithCalDeficit } from "../../types";
import { UpdateRecord } from "../../hooks/useUpdateRecord";

interface FoodJournalProps {
  weeks: WeekRecordsWithCalDeficit[];
  fetchMoreRecords: () => void;
  updateRecord: UpdateRecord;
}

const FoodJournal = ({
  weeks,
  fetchMoreRecords,
  updateRecord,
}: FoodJournalProps) => {
  return (
    <section className={styles.foodJournal}>
      <ol>
        {weeks.map((week, i) => (
          <li key={i}>
            <WeekHeader
              weekStart={week.weekStart}
              weekEnd={week.weekEnd}
              calDeficit={week.calDeficit}
            />
            <DaysList days={week.days} updateRecord={updateRecord} />
          </li>
        ))}
      </ol>
      <Button
        className={styles.loadMore}
        onClick={fetchMoreRecords}
        text="Load More"
      />
    </section>
  );
};

export default FoodJournal;
