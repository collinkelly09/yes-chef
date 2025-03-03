export const starConversion = (rating: number) => {
  let starRating = "★";
  for (let i = 1; i < 5; i++) {
    if (i < rating) starRating += "★";
    else starRating += "☆";
  }

  return starRating;
};
