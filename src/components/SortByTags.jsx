import axios from "axios";
import React, { useEffect, useState } from "react";
import UseDebounce from "./UseDebounce";
import { useDispatch } from "react-redux";
import { addBlog } from "../state/blogSlice";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
  TextField,
} from "@mui/material";
const SortByTags = () => {
  const [tags, setTags] = useState([]);
  const [query, setQuery] = useState("love");
  const debouncedQuery = UseDebounce(query, 1000);
  const dispatch = useDispatch();

  const fetchTags = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/posts/tags`);
      console.log("fetched data", res.data);
      //   dispatch(addBlog(res.data));
      setTags(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/posts/tag/${query}`);
      console.log("fetched data", res.data);
      dispatch(addBlog(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  const handleTagskChange = (e) => {
    console.log(e);
    setQuery(e);
  };

  useEffect(() => {
    fetchTags();
  }, []);
  useEffect(() => {
    fetchPosts();
  }, [debouncedQuery]);
  return (
    <div>
      <FormControl fullWidth>
        <Autocomplete
          options={tags || []} // Ensure tags is an array
          getOptionLabel={(option) => option.name} // Display category name
          onChange={(event, newValue) =>
            handleTagskChange(newValue ? newValue.slug : "")
          } // Pass selected slug
          renderInput={(params) => (
            <TextField {...params} label="Select Category" variant="outlined" />
          )}
        />
      </FormControl>
    </div>
  );
};

export default SortByTags;
