export const loading = namespace => reducer => {
  return (state, actoin) => {
    return {
      ...reducer(state, actoin),
      loading: new RegExp(`${namespace}/LOADING`).test(actoin.type)
    };
  };
};
