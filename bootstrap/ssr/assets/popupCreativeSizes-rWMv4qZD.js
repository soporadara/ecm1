const POPUP_CREATIVE_SIZES = [
  {
    value: "landscape_1920x1080",
    label: "Landscape",
    dimensions: "1920 x 1080",
    width: 1920,
    height: 1080,
    hint: "Wide desktop promotion"
  },
  {
    value: "square_1280x1280",
    label: "Square",
    dimensions: "1280 x 1280",
    width: 1280,
    height: 1280,
    hint: "Balanced desktop and mobile"
  },
  {
    value: "portrait_1080x1920",
    label: "Portrait",
    dimensions: "1080 x 1920",
    width: 1080,
    height: 1920,
    hint: "Tall mobile-first promotion"
  }
];
const DEFAULT_POPUP_CREATIVE_SIZE = "landscape_1920x1080";
function getPopupCreativeSize(value) {
  return POPUP_CREATIVE_SIZES.find((size) => size.value === value) || POPUP_CREATIVE_SIZES[0];
}
export {
  DEFAULT_POPUP_CREATIVE_SIZE as D,
  POPUP_CREATIVE_SIZES as P,
  getPopupCreativeSize as g
};
