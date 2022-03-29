import { ApiCore } from "../utilities/core";

const url = "schedule";

export const apiSchedule = new ApiCore({
  getAll: true,
  getSingle: true,
  getByParams: false,
  post: true,
  put: true,
  putById: true,
  patch: true,
  remove: true,
  url: url,
});
