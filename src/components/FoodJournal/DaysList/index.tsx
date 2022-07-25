import styles from './DaysList.module.css';
import RecordLine from '../RecordLine';
import DayHeader from '../DayHeader';
import { DayRecordsWithCalDeficit } from '../../../types';
import { UpdateRecord } from '../../../hooks/useUpdateRecord';

interface DaysListProps {
  days: DayRecordsWithCalDeficit[],
  updateRecord: UpdateRecord
};

const DaysList = ({ days, updateRecord }: DaysListProps) => (
  <ol className={styles.list}>
    {
      days.map((day, j) => (
        <li key={j} className={styles.day}>
          <DayHeader
            dayStart={day.dayStart}
            totals={day.totals}
            calDeficit={day.calDeficit}
          />
          <ol>
            {
              day.records.map((rec) => (
                <RecordLine
                  key={rec.id}
                  {...rec}
                  updateRecord={updateRecord}
                />
              ))
            }
          </ol>
        </li>
      ))
    }
  </ol>
);

export default DaysList;