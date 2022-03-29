import { ApiCore } from "../utilities/core";

const url = "user";

export const apiUsers = new ApiCore({
  getAll: true,
  getSingle: true,
  getByParams: false,
  post: true,
  postFormData: true,
  put: true,
  putById: true,
  patch: true,
  patchByParams: true,
  remove: true,
  url: url,
});
