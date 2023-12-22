import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { type IRating } from "./types";

const Rating = ({ value, text }: IRating): JSX.Element => {
  return (
    <div className="rating">
      <span>
        {value >= 1 ? (
          <FaStar />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value - 1 >= 1 ? (
          <FaStar />
        ) : value - 1 >= 0.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value - 2 >= 1 ? (
          <FaStar />
        ) : value - 2 >= 0.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value - 3 >= 1 ? (
          <FaStar />
        ) : value - 3 >= 0.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value - 4 >= 1 ? (
          <FaStar />
        ) : value - 4 >= 0.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span className="rating-text">{text && text}</span>
    </div>
  );
};

export default Rating;
