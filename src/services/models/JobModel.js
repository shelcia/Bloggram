import { ApiCore } from "../utilities/core";

const url = "jobs";

export const apiJobs = new ApiCore({
  getAll: true,
  getSingle: true,
  getByParams: true,
  post: true,
  put: true,
  putById: true,
  patch: true,
  patchByParams: true,
  remove: true,
  url: url,
});
