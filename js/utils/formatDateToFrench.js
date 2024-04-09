export function formatDateToFrench(dateString) {
  // Parse the date string "DD-MM-YYYY"
  const [day, month, year] = dateString
    .split("-")
    .map((num) => parseInt(num, 10));

  // Create a new Date object (Note: Month is 0-indexed, hence -1)
  const date = new Date(year, month - 1, day);

  // Use Intl.DateTimeFormat to format the date in French
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const frenchDate = new Intl.DateTimeFormat("fr-FR", options).format(date);

  return frenchDate.charAt(0).toUpperCase() + frenchDate.slice(1); // Capitalize the first letter
}
