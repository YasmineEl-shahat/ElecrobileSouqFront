import { StarIcon } from "../assets/icons";

const Rating = ({ ratingsAverage }) => {
  const maxRating = 5;
  const coloredStars = Math.round(ratingsAverage * maxRating) / maxRating;

  return [...Array(maxRating)].map((_, index) => {
    const ratingValue = index + 1;
    return (
      <StarIcon
        key={index}
        className="star"
        color={ratingValue <= coloredStars ? "#ffc045" : "#DDE1E8"}
        size={16}
      />
    );
  });
};

export default Rating;
