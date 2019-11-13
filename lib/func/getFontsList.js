const getFontsFromCSS = str => {
  if (!str) return [];
  const regex = /(?<=font-family:\s")(.*?)(?=";)/g;
  const fonts = str.match(regex);
  return fonts ? fonts : [];
}

const getFontsList = (fonts, style) => {
  const styleFonts = getFontsFromCSS(style);
  const uniqueFonts = new Set([...fonts, ...styleFonts]);
  return Array.from(uniqueFonts)
}

export default getFontsList;