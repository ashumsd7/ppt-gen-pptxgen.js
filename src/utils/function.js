export const getCurrentStatusOfPPT = (slidesConfig,activeSlide ) => {
  const prevConfigs = [...slidesConfig];
  const lastSlide = prevConfigs[activeSlide - 1];
  const lastSlideItems = lastSlide?.slideDataArray;
  if (lastSlideItems.length == 3) {
    console.log("Add new slide.... and add chart on that");
  }
  const isTextAvailable = lastSlideItems.some((item) => item.type === "text");
  return { prevConfigs, lastSlide, lastSlideItems, isTextAvailable };
};