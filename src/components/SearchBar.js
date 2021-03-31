import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";

const SearchBar = ({ classes }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [search, setSearch] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    if (search.trim()) {
      history.push(`/search?search=${search}`);
    } else {
      history.push("/search");
    }
    e.target.reset();
  };
  /* console.log(history); */
  const onChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <form style={{ width: "100%", position: "relative" }} onSubmit={onSubmit}>
      <input
        /* className={`${classes}`} */
        placeholder="What are you looking for?"
        onChange={onChange}
      />
      <FontAwesomeIcon
        icon={["fas", "search"]}
        className="mr-2 nav-search-icon"
        size="lg"
      />
    </form>
  );
};

export default SearchBar;
