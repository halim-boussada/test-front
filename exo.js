var WATER_POINT_TYPE = "WATER";
var EARTH_POINT_TYPE = "EARTH";
var POINT_TYPES = [WATER_POINT_TYPE, EARTH_POINT_TYPE];

var DEFAULT_WATER_COLOR = [30, 144, 255];
var DEFAULT_EARTH_COLOR = [105, 105, 105];
var DEFAULT_COLORS = {
  [WATER_POINT_TYPE]: DEFAULT_WATER_COLOR, // blue
  [EARTH_POINT_TYPE]: DEFAULT_EARTH_COLOR, // dark grey
};

function generateRandomInteger(max) {
  return Math.floor(Math.random() * max);
}

class Map {
  constructor(height, width) {
    var map = [];
    for (var i = 0; i < height; i++) {
      var row = [];
      for (var j = 0; j < width; j++) {
        row.push(this.generatePointType());
      }
      map.push(row);
    }
    this.map = map;
  }

  generatePointType() {
    return POINT_TYPES[generateRandomInteger(2)];
  }

  generateRandomColor() {
    var color = undefined;
    while (!color || Object.keys(DEFAULT_COLORS).includes(color)) {
      color = [];
      for (var i = 0; i < 3; i++) {
        color.push(generateRandomInteger(256));
      }
    }
    return color;
  }

  getRawMap() {
    var rawMap = [];
    for (var i = 0; i < this.map.length; i++) {
      var row = [];
      for (var j = 0; j < this.map[i].length; j++) {
        row.push(DEFAULT_COLORS[this.map[i][j]]);
      }
      rawMap.push(row);
    }
    return rawMap;
  }

  getColoredMap() {
    var earth = this.map.map((data) => [...data]);
    // check earth coardinations
    const isEarth = (x, y) => {
      return (
        x >= 0 &&
        y >= 0 &&
        x < earth.length &&
        y < earth[x].length &&
        earth[x][y] === EARTH_POINT_TYPE
      );
    };
    // color earth blocks
    const colorblock = (x, y, color) => {
      if (isEarth(x, y)) {
        earth[x][y] = color;
        colorblock(x + 1, y, color); // color top
        colorblock(x, y + 1, color); // color right
        colorblock(x - 1, y, color); // color bottom
        colorblock(x, y - 1, color); // color left
      }
    };
    // iturate over map
    earth.forEach((e, i) => {
      e.forEach((block, j) => {
        if (block == WATER_POINT_TYPE) {
          block = DEFAULT_COLORS[block];
        } else if (block == EARTH_POINT_TYPE) {
          colorblock(i, j, this.generateRandomColor());
        }
      });
    });
    return earth;
  }
}
