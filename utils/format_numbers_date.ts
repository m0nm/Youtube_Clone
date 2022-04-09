// this function is used for formating the view count
// ex: "1000 views" to "1k views"

export const numbersFormatter = (number: string) => {
  // turn string to integer
  const viewsInt = parseInt(number);

  // format the number
  const result = Intl.NumberFormat("en", { notation: "compact" }).format(
    viewsInt
  );

  return result;
};

// this function is used for formating the ISO date
export const dateFormatter = (date: string) => {
  const newDate = new Date(date);

  const dd = String(newDate.getDate()).padStart(2, "0");

  const mm = newDate.toLocaleString("default", { month: "short" });

  const yyyy = newDate.getFullYear();

  const dateFormatted = mm + " " + dd + ", " + yyyy;

  return dateFormatted;
};
