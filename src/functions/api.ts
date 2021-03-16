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

export const registerUser = async (
  email: string,
  password: string,
  username: string
): Promise<singleMessageResponse> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/register`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          username: username,
        }),
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

export const fetchMe = async (): Promise<singleMessageResponse> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/me`,
      {
        credentials: "include",
      }
    );
    const parsedResp = await response.json();
    return parsedResp;
  } catch (error) {
    console.log(error);
    return { message: "glies looks fuckin sick bruv" };
  }
};

export const createRoomFetch = async (
  name: string
): Promise<singleMessageResponse> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/rooms`, {
      method: "POST",
      body: JSON.stringify({ name: name }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const parsedResp = await response.json();
    return parsedResp;
  } catch (error) {
    console.log(error);
    return { message: "help us" };
  }
};
