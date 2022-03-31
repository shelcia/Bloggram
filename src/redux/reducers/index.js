import postReducer from "./postReducer";
import draftsReducer from "./draftReducer";
import publishedReducer from "./publishedReducer";

import { combineReducers } from "redux";

const rootReducers = combineReducers({
  posts: postReducer,
  drafts: draftsReducer,
  published: publishedReducer,
});

export default rootReducers;
