import { singleMessageResponse } from "../types/apiInterface";

export const loginUser = async (
  email: string,
  password: string
): Promise<singleMessageResponse> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/login`,
      {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const parsedResp = await response.json();
    return parsedResp;
  } catch (error) {
    console.log(error);
    return { message: "fail rp" };
  }
};
