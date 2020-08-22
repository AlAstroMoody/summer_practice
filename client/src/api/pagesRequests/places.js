import instance from "../getInstanceWithBaseUrl";

export const getPlacesThisOwner = async id => {
  let response = await instance.get(`places/?format=json&owner=${id}/`);
  return response.data["results"];
};

export const getPlaces = async () => {
  let response = await instance.get("places/");
  return response.data["results"];
};

export const addNewPlace = async params => {
  let response = await instance.post("places/", params);
  return response.data;
};

export const removeThisPlace = async id => {
  let response = await instance.delete(`places/${id}`);
  return response.data;
};

export const editThisPlace = async params => {
  let response = await instance.patch(`places/${params.get("id")}/`, params);
  return response.data;
};

export const getPlace = async id => {
  let response = await instance.get(`places/${id}/`);
  return response.data;
};
