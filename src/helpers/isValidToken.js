import { PREFIX } from "../constants";
import { apiAuth } from "../services/models/AuthModel";
import Cookies from "js-cookie";

export const isValidToken = async () => {
  const token = localStorage.getItem(`${PREFIX}Token`);
  const userId = localStorage.getItem(`${PREFIX}UserId`);

  const body = {
    token: token,
    userId: userId,
  };

  try {
    const res = await apiAuth.post(body, `isvalid`, true);
    console.log(res);
    return await res.isValid;
  } catch (error) {
    return false;
  }
};

export const isCookieExist = () => {
  return Cookies.get(`${PREFIX}Token`) !== undefined;
};

export const isSameUser = (id) => {
  const userId = localStorage.getItem(`${PREFIX}UserId`);
  return id === userId;
};
