const origins = {
  colorless: [0, 0, 0],
  white: [0, 100, 0],
  blue: [95, 31, 0],
  black: [-59, -81, 0],
  red: [59, -81, 0],
  green: [-95, 31, 0],
};

const isColorless = (colorIdentity) => {
  if (colorIdentity.length === 0) {
    return true;
  } else {
    return false;
  }
};

// Converts colorIdentitly into a posArray(s).
// The array(s) contain X and Z coordinates to be used in determining the cards position,
// based on the card's color origin(s)
export const convertColorIdsToPosArrays = (colorIdArray) => {
  let posArrays = [];

  if (isColorless(colorIdArray)) {
    posArrays.push(origins.colorless);
  } else {
    colorIdArray.forEach((color) => {
      switch (color) {
        case "W":
          posArrays.push(origins.white);
          break;
        case "U":
          posArrays.push(origins.blue);
          break;
        case "B":
          posArrays.push(origins.black);
          break;
        case "R":
          posArrays.push(origins.red);
          break;
        case "G":
          posArrays.push(origins.green);
          break;
      }
    });
  }

  return posArrays;
};

export const convertCmcToYValue = (cmcData) => {
  let zValue = (cmcData + 0.1) * 10;
  return zValue;
};

// Returns color strings in ThreeJS-usable format for displaying object colors
export const normalizeColors = (colorIdentity) => {
  let normalizedColors;
  console.log(colorIdentity);

  if (isColorless(colorIdentity)) {
    normalizedColors = "gray";
  } else {
    colorIdentity.forEach((color) => {
      switch (color) {
        case "W":
          normalizedColors = "white";
          break;
        case "U":
          normalizedColors = "blue";
          break;
        case "B":
          normalizedColors = "black";
          break;
        case "R":
          normalizedColors = "red";
          break;
        case "G":
          normalizedColors = "green";
          break;
      }
    });
  }
  return normalizedColors;
};

export const calcAvgPos = (coordArrays) => {
  let avgCoords;
  // If card is not multicolored, use the color origin.
  //Otherwise, calculate the middle point by averaging the coords of it's color origins
  if (coordArrays.length === 1) {
    avgCoords = coordArrays[0];
  } else {
    let xValues = [];
    let yValues = [];
    coordArrays.forEach((coordArray) => xValues.push(coordArray[0]));
    coordArrays.forEach((coordArray) => yValues.push(coordArray[1]));
    xValues = xValues.sort();
    yValues = yValues.sort();

    const sumValues = (array) => {
      let sum = 0;
      array.forEach((value) => (sum = sum + value));
      return sum;
    };
    avgCoords = [
      sumValues(xValues) / xValues.length,
      sumValues(yValues) / yValues.length,
    ];
  }
  return avgCoords;
};
