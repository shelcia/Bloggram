import { ApiCore } from "../utilities/core";

const url = "library";

export const apiLibrary = new ApiCore({
  getAll: true,
  getSingle: true,
  getByParams: false,
  post: true,
  postFormData: true,
  put: true,
  putById: true,
  patch: true,
  remove: true,
  url: url,
});
