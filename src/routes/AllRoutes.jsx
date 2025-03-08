import React from "react";
import { Route, Routes } from "react-router-dom";
import ContactUs from "../pages/ContactUs";
import BlogLists from "../pages/BlogLists";
import BlogDetailsPage from "../pages/BlogDetailsPage";
import About from "../pages/About"
import SearchPage from "../pages/SearchPage";
const AllRoutes = () => {
  
  
  return (
    <Routes>
      <Route path="/" element={<BlogLists />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/blog/:id" element={<BlogDetailsPage />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default AllRoutes;
