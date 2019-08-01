import initialState from '../initialState';
import { ACTIONS } from '../actions';

const makeRecord = (id, data) => ({
  id,
  ...data
});

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case ACTIONS.ADD_RECORD:
      return {
        records: [
          ...state.records,
          makeRecord(action.id, action.data)
        ]
      };
  }
  return state;
};

export default reducer;