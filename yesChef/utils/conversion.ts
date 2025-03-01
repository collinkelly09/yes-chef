export const starConversion = (rating: number) => {
  let starRating = "★";
  for (let i = 1; i < rating; i++) {
    starRating += "★";
  }
  return starRating;
};
