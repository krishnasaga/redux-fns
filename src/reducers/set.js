export const __toRecords = (__records = []) => {
  if (!Array.isArray(__records))
    return {
      records: {},
      ids: []
    };
  const records = __records.reduce((map, obj) => {
    map[obj.id] = obj;
    return map;
  }, {});
  return {
    records,
    ids: Object.keys(records)
  };
};

export const __updateAllRecords = (state, action) => __toRecords(action.data);

export const __updateRecords = (state, action) => {
  if (!action.data || !state.records[action.data.id]) {
    return state;
  }
  if (!Array.isArray(action.data) && state.records[action.data.id]) {
    return {
      records: { ...state.records, [action.data.id]: action.data },
      ids: state.ids
    };
  } else if (Array.isArray(action.data) && state.records[action.data.id]) {
    return state;
  }
  return state;
};

export const __addRecords = (state, action) => {
  if (!action.data) return state;
  if (!Array.isArray(action.data)) {
    return {
      records: { ...state.records, [action.data.id]: action.data },
      ids: [...state.ids, action.data.id]
    };
  }
  return {
    records: { ...state.records, ...__toRecords(action.data).records },
    ids: [...state.ids, ...__toRecords(action.data).ids]
  };
};

export const __removeRecords = (state, action) => {
  const __state = Object.assign({}, state);
  if (!Array.isArray(action.data)) {
    delete __state.records[action.data.id];
    return {
      records: __state.records,
      ids: state.ids
    };
  }
  return {
    records: { ...state.records, ...__toRecords(action.data) },
    ids: state.ids
  };
};

export const createRecordsReducer = ({ namespace }) => {
  return (
    state = {
      records: {},
      ids: []
    },
    action
  ) => {
    if (new RegExp(`${namespace}/CHANGED`).test(action.type)) {
      return __updateAllRecords(state, action);
    } else if (new RegExp(`${namespace}/UPDATED`).test(action.type)) {
      return __updateRecords(state, action);
    } else if (new RegExp(`${namespace}/ADDED`).test(action.type)) {
      return __addRecords(state, action);
    } else if (new RegExp(`${namespace}/REMOVED`).test(action.type)) {
      return __removeRecords(state, action);
    }
    return state;
  };
};

export const loadable = namespace => reducer => {
  return (state, actoin) => {
    return {
      ...reducer(state, actoin),
      loading: new RegExp(`${namespace}/LOADING`).test(actoin.type)
    };
  };
};

export const selectRecords = (state, ids) => {
  if (!ids) return Object.values(state.records); //select all records
  if (typeof ids === "string" || typeof ids === "number") {
    //select a single record
    return state.records[ids];
  }
  if (Array.isArray(ids)) {
    //select multiple records
    return Object.values(state.records).filter(record =>
      ids.includes(record.id)
    );
  }
  return [];
};
