import instance from "../getInstanceWithBaseUrl";

export const getOurDishes = async id => {
  let response = await instance.get(`dishes/?format=json&place=${id}`);
  return response.data.results;
};

export const getDish = async id => {
  let response = await instance.get(`dishes/${id}`);
  return response.data;
};

export const addNewDish = async params => {
  let response = await instance.post("dishes/", params);
  return response.data;
};

export const removeThisDish = async id => {
  let response = await instance.delete(`dishes/${id}`);
  return response.data;
};

export const editThisDish = async params => {
  let response = await instance.patch(`dishes/${params.get("id")}/`, params);
  return response.data;
};
