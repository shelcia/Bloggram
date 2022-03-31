export const LoadPost = (result) => {
  return {
    type: `LOAD_POST`,
    result: result,
  };
};
export const AddPost = (newPost) => {
  return {
    type: `ADD_POST`,
    result: newPost,
  };
};

export const AddComment = (newAllPost) => {
  return {
    type: `ADD_COMMENT`,
    result: newAllPost,
  };
};

export const AddLike = (newAllPost) => {
  return {
    type: `ADD_LIKE`,
    result: newAllPost,
  };
};

export const LoadDrafts = (result) => {
  return {
    type: `LOAD_DRAFTS`,
    result: result,
  };
};

export const LoadPublished = (result) => {
  return {
    type: `LOAD_PUBLISHED`,
    result: result,
  };
};
