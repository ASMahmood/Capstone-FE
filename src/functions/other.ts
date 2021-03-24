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

export const convertTime = (time: string) => {
  let timeString = new Date(time);
  let hour = timeString.getHours();
  let min = timeString.getMinutes();
  let formattedTime = hour + ":" + min;
  console.log(formattedTime);
  return formattedTime;
};
