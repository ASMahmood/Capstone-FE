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
      body: JSON.stringify({
        name: name,
        chatHistory: [],
        participants: [],
        onlineParticipants: [],
        images: "",
      }),
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

export const sendEmailInvite = async (
  email: string,
  roomId: string
): Promise<singleMessageResponse> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/rooms/addrequest/${roomId}`,
      {
        method: "POST",
        body: JSON.stringify({ email: email }),
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
    return { message: "glitch in the matrix" };
  }
};

export const editProfilePic = async (
  pic: File
): Promise<singleMessageResponse> => {
  try {
    let formData = new FormData();
    formData.append("ProfilePic", pic);
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/me/upload`,
      {
        method: "PUT",
        headers: { Accept: "application/json" },
        credentials: "include",
        body: formData,
      }
    );
    const parsedResp = await response.json();
    return parsedResp;
  } catch (error) {
    console.log(error);
    return { message: "Error editing profile pic" };
  }
};

export const setProfilePic = async (
  userId: string,
  pic: File
): Promise<singleMessageResponse> => {
  try {
    let formData = new FormData();
    formData.append("ProfilePic", pic);
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/upload`,
      {
        method: "PUT",
        headers: { Accept: "application/json" },
        credentials: "include",
        body: formData,
      }
    );
    const parsedResp = await response.json();
    return parsedResp;
  } catch (error) {
    console.log(error);
    return { message: "Error setting profile pic" };
  }
};

export const editProfileFetch = async (
  username: string
): Promise<singleMessageResponse> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/me`,
      {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({ username: username }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const parsedResp = await response.json();
    return parsedResp;
  } catch (error) {
    console.log(error);
    return { message: "Error setting profile pic" };
  }
};

export const fetchRandomMeme = async () => {
  try {
    const response = await fetch("https://meme-api.herokuapp.com/gimme");
    const parsedResp = await response.json();
    return parsedResp.url;
  } catch (error) {
    console.log(error);
  }
};
