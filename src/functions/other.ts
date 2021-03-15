import { fetchMe } from "./api";

export const fetchUserInfo = async () => {
  const response = await fetchMe();
  console.log(response);
  if (Object.keys(response).length > 1) {
    return true;
  } else {
    return false;
  }
};
