// this function is used for formating the view count
// ex: "1000 views" to "1k views"

export const viewsFormatter = (views: string) => {
  // turn string to integer
  const viewsInt = parseInt(views);

  // format the number
  const result = Intl.NumberFormat("en", { notation: "compact" }).format(
    viewsInt
  );

  return result;
};
