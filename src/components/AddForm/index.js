import AddForm from './AddForm';
import { connect } from 'react-redux';
import { addRecord } from '../../store/actions';

const exampleRecord = {
  title: "Cinnamon Rolls",
  weight: 230,
  calories: 670,
  protein: 12,
  fat: 45,
  carbs: 132,
  datetime: (new Date("29 Jul 2019 22:22:22")).toISOString(),
}

const mapDispatchToProps = (dispatch) => ({
  addRecord: (data) => dispatch(addRecord(data))
});

export default connect(null, mapDispatchToProps)(AddForm);