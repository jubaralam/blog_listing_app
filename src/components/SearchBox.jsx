import React, { useEffect, useState } from "react";

import UseDebounce from "./UseDebounce";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addBlog } from "../state/blogSlice";
// import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = UseDebounce(query, 2000);
  const dispatch = useDispatch();
  //   const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/posts/search?q=${query}`
      );
      console.log("fetched data", res.data);
      dispatch(addBlog(res.data));
      console.log("fetching");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    // navigate("/search");
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (debouncedQuery) {
      console.log("started fetching data");
      fetchPosts();
    }
  }, [debouncedQuery]);

  return (
    <div className="search-box">
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        value={query}
        placeholder="search here ex. his mother had always tought him"
      />
    </div>
  );
};

export default SearchBox;
