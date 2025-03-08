import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navLists } from "../utils/data";
import SearchBox from "./SearchBox";

const Navbar = () => {
 

  return (
    <div className="container">
      <div className="navbar-container flex justify-between items-center">
        <div className="logo">Blog Hub</div>
        <div className="search-container">
         <SearchBox />
        </div>
        <div className="list-container ">
          <ul className="flex">
            {navLists?.map((item) => (
              <li key={item.url}>
                <Link to={item.url}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
