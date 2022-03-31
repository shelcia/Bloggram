const publishedReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_PUBLISHED":
      return action.result;
    default:
      return state;
  }
};

export default publishedReducer;
