import {hsvToRgb, changeColorBrigntess, hexToRgb, rgbToHex} from './colorPicker/ColorUtil';

const changeBrightness = (value, rgb)=>{
    let hexColor = rgbToHex(rgb),
     brightenColor = changeColorBrigntess(hexColor, value),
     rgbColor = hexToRgb(brightenColor);
    return `rgb(${rgbColor.r},${rgbColor.g},${rgbColor.b})`;
}

const getSelectedGradientColors = (color) => {
    let {h,s,v} = color, gradientColorArr = [];
    if(h < 0){
         h = 360 + h;   
    }
    let rgb = hsvToRgb(h,s,v),
        rgbColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`,
        colorHex = rgbToHex(rgb);
    let gradColor_1 = changeBrightness(30, rgb),
        gradColor_2 = changeBrightness(50, rgb),
        gradColor_3 = changeBrightness(70, rgb);
    gradientColorArr.push(gradColor_3);
    gradientColorArr.push(gradColor_2);
    gradientColorArr.push(gradColor_1);
    gradientColorArr.push(rgbColor); 
    
    return {
        selectedColor: colorHex,
        gradColorArr: gradientColorArr
    }
}

export{
    getSelectedGradientColors,
    changeBrightness
}