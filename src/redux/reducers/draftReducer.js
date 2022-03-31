const draftsReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_DRAFTS":
      return action.result;
    default:
      return state;
  }
};

export default draftsReducer;
