import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { addBlog } from "../state/blogSlice";
import axios from "axios";
import SortByTags from "../components/SortByTags";
const BlogLists = () => {
  const [disableNext, setDisableNext] = useState(false);
  const [disablePrev, setDisablePrev] = useState(true);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const blogs = useSelector((state) => state.blogs.blogs);
  const state = useSelector((state) => state.blogs.blogs);
  console.log("state", state);
  console.log("blogs", blogs);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/posts/?limit=20&skip=${skip}`
      );
      console.log("fetched data", res.data);
      dispatch(addBlog(res.data));
      setIsLoading(false);
      console.log("fetching");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handlePrev = () => {
    if (disableNext) {
      setDisableNext(false);
    }

    if (skip > 0) {
      setSkip((prev) => prev - blogs.limit);
    } else {
      setDisablePrev(true);
    }
  };
  const handleNext = () => {
    if (disablePrev) {
      setDisablePrev(false);
    }
    console.log(skip, state.total);
    if (blogs.total > skip + blogs.limit) {
      setSkip((prev) => prev + blogs.limit);
    } else {
      setDisableNext(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [skip]);

  return (
    <div>
      BlogLists
      <div>
        <SortByTags />
      </div>
      <div className="blog-container flex justify-center wrap">
        {isLoading ? (
          <Loading />
        ) : (
          blogs.posts?.map((blog) => <Card key={blog.id} {...blog} />)
        )}
      </div>
      <div className="btn-container max-w">
        <button onClick={handlePrev} disabled={disablePrev}>
          Prev
        </button>
        <button onClick={handleNext} disabled={disableNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogLists;
