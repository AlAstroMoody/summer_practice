export const distanceFromPlace = (placeLat, placeLong, myLat, myLong) => {
  const R = 6371;
  let differenceLat = (Math.PI * Math.abs(myLat - placeLat)) / 180;
  let differenceLon = (Math.PI * Math.abs(myLong - placeLong)) / 180;
  let a =
    Math.pow(Math.sin(differenceLat / 2), 2) +
    Math.cos((myLat * Math.PI) / 180) *
      Math.cos((placeLat * Math.PI) / 180) *
      Math.pow(Math.sin(differenceLon / 2), 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.abs(1 - a)));
};
