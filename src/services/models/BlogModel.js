import { ApiCore } from "../utilities/core";

const url = "blog";

export const apiBlog = new ApiCore({
  getAll: true,
  getSingle: true,
  getByParams: true,
  post: true,
  postFormData: true,
  put: true,
  putById: true,
  putFormData: true,
  patch: true,
  remove: true,
  url: url,
});
