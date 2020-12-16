import React, { useEffect, useState } from "react";
import useGardenRelatedAttributes from "../../hooks/useGardenRelatedAttributes";
import Select from "../Select/index";
import IconClimate from "../icons/IconClimate/index";
import IconLocation from "../icons/IconLocation/index";
import IconLabel from "../icons/IconLabel/index";
import Button from "../Button/index";
import {  search } from "../../requests/gardens";
import { parseQueryParams } from "../../helpers/parseQueryParams";

const SearchEngine = ({ getSearchResult, getFilterDisplayed, filterDisplay}) => {
  const {
    tags,
    climates,
    gardenTypes,
    locations,
  } = useGardenRelatedAttributes();

  const [inputValue, setInputValue] = useState("");
  const [selectedGardenType, setSelectedGardenType] = useState("");
  const [selectedClimate, setSelectedClimate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTag, setSelectedTag] = useState("");


  const handleToogleFilters = () => {
    getFilterDisplayed(!filterDisplay);
  };

  const handleInput = async (
    event,
    selectedGardenType,
    selectedClimate,
    selectedLocation,
    selectedTag
  ) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      const queryString = parseQueryParams(
        inputValue,
        selectedGardenType,
        selectedClimate,
        selectedLocation,
        selectedTag
      );
      const searchResults = await search("gardens", queryString);

      getSearchResult(searchResults);

    };

    fetchSearchResults();
  }, [
    selectedClimate,
    selectedGardenType,
    selectedLocation,
    selectedTag,
    inputValue,
  ]);

  return (
    <div id="search-zone">
      <input
        type="text"
        id="search"
        className="w-full"
        placeholder="A la recherche du jardin des espérides ? "
        onInput={(event) =>
          handleInput(
            event,
            selectedGardenType,
            selectedClimate,
            selectedLocation,
            selectedTag
          )
        }
      />

      <Button
        text={filterDisplay ? "Cacher les filtres" : "Voir les filtres :"}
        classNames={[
          "h-50",
          "w-100",
          "flex",
          "items-center",
          "justify-center",
          "justify-self-end",
          "p-4",
          "col-span-1",
          "bg-blue-dark",
          "text-white",
          "text-center",
          "rounded-full",
          "hover-animate-bounce",
          "mt-4",
        ]}
        onclick={handleToogleFilters}
      />

      {filterDisplay && (
        <div className="filter-zone flex justify-start flex-wrap">
          <Select
            classNames={["col-span-2"]}
            name="gardenType_id"
            id="gardenType_id"
            icon={IconLabel}
            prompter="Type de jardin :"
            options={gardenTypes}
            selectedOption={(gardenType_id) =>
              setSelectedGardenType(gardenType_id)
            }
          />

          <Select
            classNames={["col-span-2"]}
            name="tag_id"
            id="tag_id"
            icon={IconLabel}
            prompter="Tag :"
            options={tags}
            selectedOption={(tag) => setSelectedTag(tag)}
          />
          <Select
            classNames={["col-span-2"]}
            name="climate_id"
            id="climate_id"
            icon={IconClimate}
            prompter="Climats"
            options={climates}
            selectedOption={(climate_id) => setSelectedClimate(climate_id)}
          />

          <Select
            classNames={["col-span-2"]}
            name="location_id"
            id="location_id"
            icon={IconLocation}
            prompter="Localisation :"
            options={locations}
            selectedOption={(location_id) => setSelectedLocation(location_id)}
          />
        </div>
      )}
    </div>
  );
};

export default SearchEngine;
