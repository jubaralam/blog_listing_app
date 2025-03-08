import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({
  id,

  tags,
  category,
  title,
}) => {
  const navigate = useNavigate();

  return (
    <div className="card-container" onClick={() => navigate(`/blog/${id}`)}>
      {/* <div>
        <img src={poster} alt={title} className="w-full" />
      </div> */}
      <div className="content-container">
        <p>{category}</p>
        <h2>{title}</h2>
        <h5>
          {tags?.map((tag) => (
            <span>{tag}</span>
          ))}
        </h5>
      </div>
    </div>
  );
};

export default Card;
