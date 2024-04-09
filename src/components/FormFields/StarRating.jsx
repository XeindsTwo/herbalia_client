import StarRatings from "react-star-ratings/build/star-ratings.js";

export const StarRating = ({rating, onChange}) => {
  return (
    <StarRatings
      starRatedColor="#f67280"
      starEmptyColor="#f0dbde"
      starHoverColor="#f67280"
      changeRating={onChange}
      rating={rating}
      numberOfStars={5}
      name='rating'
      starDimension="26px"
      starSpacing="2px"
    />
  );
};