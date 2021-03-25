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

export const addUserToRoom = async (
  roomId: string,
  userId: string
): Promise<singleMessageResponse> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/rooms/${roomId}/add-user/${userId}`,
      {
        method: "PUT",
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
    return { message: "ya dun goofed" };
  }
};

export const fetchRoom = async (
  roomId: string
): Promise<singleMessageResponse> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/rooms/${roomId}`,
      {
        credentials: "include",
      }
    );
    const parsedResp = await response.json();
    return parsedResp;
  } catch (error) {
    console.log(error);
    return { message: "room fetch failed :(" };
  }
};

export const uploadAttachment = async (file: File): Promise<string> => {
  try {
    let formData = new FormData();
    formData.append("file", file);
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/files/upload`,
      {
        method: "POST",
        headers: { Accept: "application/json" },
        credentials: "include",
        body: formData,
      }
    );
    const parsedResp = await response.json();
    return parsedResp.message;
  } catch (error) {
    console.log(error);
    return "";
  }
};

// export const downloadAttachment = async (filename: string): Promise<void> => {
//   try {
//     await fetch(`${process.env.REACT_APP_BACKEND_URL}/files/${filename}`, {
//       credentials: "include",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
