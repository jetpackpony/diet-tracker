import uuid from 'uuid/v4';

export const ACTIONS = {
  ADD_RECORD: "ADD_RECORD"
};

export const addRecord = (data) => ({
  type: ACTIONS.ADD_RECORD,
  id: uuid(),
  data
})