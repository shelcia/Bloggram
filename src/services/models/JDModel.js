import { ApiCore } from "../utilities/core";

const url = "jobDescription";

export const apiJD = new ApiCore({
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
