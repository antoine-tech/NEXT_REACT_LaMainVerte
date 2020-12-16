const parseQueryParams = (
  inputValue,
  selectedGardenType,
  selectedClimate,
  selectedLocation,
  selectedTag
) => {

  let queryString = [];

  inputValue !== "" && queryString.push(`name=${inputValue}`);
  selectedGardenType !== "" &&
    queryString.push(`garden_type_id=${selectedGardenType}`);
  selectedClimate !== "" && queryString.push(`climate_id=${selectedClimate}`);
  selectedLocation !== "" &&
    queryString.push(`location_id=${selectedLocation}`);
  selectedTag !== "" && queryString.push(`tag_id=${selectedTag}`);

  return queryString.join("&");
};

export {parseQueryParams}
