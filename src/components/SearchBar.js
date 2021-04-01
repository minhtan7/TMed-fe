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
    <div className="nav-search" style={{ width: "100%" }}>
      <form style={{ width: "100%", position: "relative" }} onSubmit={onSubmit}>
        <input
          /* className={`${classes}`} */
          placeholder="Who are you looking for?"
          onChange={onChange}
          style={{ width: "100%" }}
        />
        <FontAwesomeIcon
          icon={["fas", "search"]}
          className="mr-2 nav-search-icon"
          size="lg"
          style={{ transform: "translate(0,-50%)" }}
        />
      </form>
    </div>
  );
};

export default SearchBar;
