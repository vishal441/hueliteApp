import {
  hsvToRgb,
  changeColorBrigntess,
  hexToRgb,
  rgbToHex
} from "./colorPicker/ColorUtil";

const changeBrightness = (value, rgb) => {
  let hexColor = rgbToHex(rgb),
    brightenColor = changeColorBrigntess(hexColor, value),
    rgbColor = hexToRgb(brightenColor);
  if (rgbColor.r > 220 && rgbColor.b > 220 && rgbColor.b > 220) {
    rgbColor.r = 50;
    rgbColor.g = 240;
    rgbColor.b = 240;
  }
  return `rgb(${rgbColor.r},${rgbColor.g},${rgbColor.b})`;
};

const getSelectedGradientColors = color => {
  let { h, s, v } = color,
    gradientColorArr = [];
  if (h < 0) {
    h = 360 + h;
  }
  let h1 = h - 50,
    h2 = h + 50;
  //h3 = h + 60;
  if (h1 < 0) h1 = h1 + 360;
  if (h2 > 360) h2 = h2 - 360;
  //if (h3 > 360) h3 = h3 - 360;
  let rgb = hsvToRgb(h, s, v),
    rgbColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`,
    colorHex = rgbToHex(rgb);

  let gradColor_1 = changeBrightness(100, hsvToRgb(h1, s, v)),
    gradColor_2 = changeBrightness(100, hsvToRgb(h, s, v)),
    gradColor_3 = changeBrightness(100, hsvToRgb(h2, s, v));
  gradientColorArr.push(gradColor_3);
  gradientColorArr.push(gradColor_2);
  gradientColorArr.push(gradColor_1);
  //gradientColorArr.push(rgbColor);

  return {
    selectedColor: colorHex,
    gradColorArr: gradientColorArr
  };
};

export { getSelectedGradientColors, changeBrightness };
