/* eslint-disable */
import "./LogoSearch.css";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";
import SearchCard from "../SearchCard/SearchCard";

function LogoSearch({ searchNow, setSearchedUsers }) {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  let { users } = useSelector((state) => state.UserReducer);
  if (users && users.length > 0)
    users = users.filter((u) => u._id !== user?._id);
  const [searchedText, setSearchText] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (users) {
      const searched = users.filter((user) =>
        user.username.toLowerCase().includes(searchedText.toLowerCase())
      );
      if (searchedText)
        setResults(() =>
          searched.sort((a, b) => {
            return a.username[0] !== searchedText ? 1 : -1;
          })
        );
      else setResults([]);
    }
  }, [searchedText]);

  const handleSearch = (e) => {
    setSearchText(() => e.target.value.trim());
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <BiSearch
          size="26px"
          color="var(--main)"
          style={{ cursor: "pointer" }}
        />
        <input
          type="text"
          placeholder={searchNow || "بحث"}
          onChange={handleSearch}
          style={{ direction: `${searchNow ? "ltr" : "rtl"}` }}
        />
      </div>
      {results.length > 0 && !searchNow && (
        <div className="search-list">
          {results.map((user) => (
            <SearchCard user={user} key={user._id} setSearchText />
          ))}
        </div>
      )}
    </div>
  );
}

export default LogoSearch;
