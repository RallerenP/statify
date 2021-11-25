const colors = [
  "#4dc9f6",
  "#f67019",
  "#f53794",
  "#537bc4",
  "#acc236",
  "#166a8f",
  "#00a950",
  "#58595b",
  "#8549ba",
];

export function generateColors(rounds) {
  let pickedColors = [];
  for (let i = 0; i < rounds; i++) {
    pickedColors.push(colors[i % colors.length]);
  }
  return pickedColors;
};