import { FaStar } from "react-icons/fa";

const Rating = ({ ratingsAverage }) => {
  const maxRating = 5;
  const coloredStars = Math.round(ratingsAverage * maxRating) / maxRating;

  return (
    <div>
      {[...Array(maxRating)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <FaStar
            key={index}
            color={ratingValue <= coloredStars ? "#ffc045" : "#DDE1E8"}
            size={16}
          />
        );
      })}
    </div>
  );
};

export default Rating;
