import { Hct, sourceColorFromImage, themeFromSourceColor } from "@material/material-color-utilities";
// #adc6ff
const color = Hct.fromInt(0xffadc6ff);
console.log(`Hue: ${color.hue}`);
console.log(`Chrome: ${color.chroma}`);
console.log(`Tone: ${color.tone}`);
console.log(themeFromSourceColor(0xffadc6ff).schemes.dark.toJSON());