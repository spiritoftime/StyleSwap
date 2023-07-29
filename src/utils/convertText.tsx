/**
 * Function to convert a string to title case
 * @param {string} text
 * @returns {string} text in title case
 */
export const convertToTitleCase = (text: string) => {
  return text
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ");
};
