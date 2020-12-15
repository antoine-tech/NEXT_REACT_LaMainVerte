import React, { useEffect, useState } from "react";
import { getClimates } from "../../requests/climates";
import { getTags } from "../../requests/tags";
import { search } from "../../requests/gardens";
import SearchFilter from "../SearchFilter/index";

const SearchEngine = ({getSearchResult}) => {
  const [filters, setFilters] = useState([]);
  const [tags, setTags] = useState([]);
  const [climates, setClimates] = useState([]);

  const handleInput = async (event) =>
  {
      const searchResult = await search(event.target.value);
      getSearchResult(searchResult)
  }

  const handleCheckBoxChange = (object, dataType) => {
    if (
      filters.find(
        (element) => element.id === object.id && element.type === object.type
      )
    ) {
      setFilters(
        filters.filter(
          (element) => element.type !== object.id && element.id !== object.id
        )
      );
    } else {
      setFilters([...filters, {...object, dataType}]);
    }

  };

  useEffect(()=>{

    // console.log(filters)

  }, [filters])

  useEffect(() => {
    const fetchClimates = async () => {
      const climates = await getClimates();
      setClimates(climates);
    };
    const fetchTags = async () => {
      const tags = await getTags();
      setTags(tags);
    };

    fetchTags();
    fetchClimates();
  }, []);

  return (
    <div id="search-zone">
      <input
        type="text"
        id="search"
        className="w-full"
        placeholder="A la recherche du jardin des espérides ? "
        onInput={handleInput}
      />
      <p className="mt-4">Filtres :</p>

      <div className="filter-zone flex justify-start flex-wrap">
        {tags &&
          tags.map((tag) => {
            let { id, name } = tag;
            return (
              <SearchFilter
                key={`tag-${id}`}
                id={id}
                name={id}
                label={name}
                onChange={() => handleCheckBoxChange(tag, 'tag')}
                type="tag"
              />
            );
          })}

        {climates &&
          climates.map((climate) => {
            let { id, name } = climate;
            return (
              <SearchFilter
                key={`climate-${id}`}
                id={id}
                name={id}
                label={name}
                onChange={() => handleCheckBoxChange(climate, 'climate')}
                type="climate"
              />
            );
          })}
      </div>
    </div>
  );
};

export default SearchEngine;
