export const getFallbackImageLink = (image_size, text) => {
  return `https://via.placeholder.com/${image_size}/f63b3b/fff?text=${text.replace(
    " ",
    "+"
  )}`;
};
