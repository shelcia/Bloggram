import toast from "react-hot-toast";
import { PREFIX } from "../constants";
import { isCookieExist } from "./isValidToken";
import { apiBlog } from "../services/models/BlogModel";

export const handleLike = (blogId) => {
  const userId = localStorage.getItem(`${PREFIX}UserId`);
  if (!(isCookieExist() && userId)) {
    toast.error("Only logged in users can like");
    return;
  }

  const response = {
    userId: userId,
    blogId: blogId,
  };

  apiBlog.put(response, `likes/${blogId}`).then((res) => {
    // console.log(res);
    if (res.status === "200") {
      toast.success(res.message);
      // _getUser();
    } else {
      toast.error(res.message);
    }
  });
};
