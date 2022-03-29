import { ApiCore } from "../utilities/core";

const url = "blog";

export const apiBlog = new ApiCore({
  getAll: true,
  getSingle: true,
  getByParams: true,
  post: true,
  put: true,
  putById: true,
  patch: true,
  remove: true,
  url: url,
});
