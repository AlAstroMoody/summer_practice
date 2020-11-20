import instance from "../getInstanceWithBaseUrl";

export const authUser = async params => {
  let response = await instance.post("auth/token/", params);
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const registerUser = async params => {
  let response = await instance.post("users/", params);
  return response;
};
