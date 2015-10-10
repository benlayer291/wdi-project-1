//Need to generate a grid, of variable size, to play the maze game on
var grid  = [];
var width = 5;

function generateGrid(width) {
  var size = Math.pow(width,2); 
  var initialGrid;
  initialGrid = Array.apply(null, {length: size}).map(Number.call, Number);
  console.log(initialGrid);
  for (i=0; i<width; i++) {
    var j   = 0; 
    grid[i] = initialGrid.splice(j,width);
    j+=width;
  }

  return grid;
}

//Need to generate a random path across the grid, starting in the north-west corner
//and finishing in the south-east corner of the grid

var randomPath = [];

function generateRandomPath(width) {
  var i = 0, j=0, k = 0;
  var move;

  randomPath[k] = grid[i][j];
  k++;
  

  while (i < (width-1) || j < (width-1)) {
    move = Math.floor(Math.random()*2);
    
    if (i === (width-1)) {
      randomPath[k] = grid[i][j+1]; //on bottom of grid, moves across the grid
      
      j++;
      k++;
    } else if (j === (width-1)) {
      randomPath[k] = grid[i+1][j]; //on side of grid, moves down the grid
      
      i++;
      k++;
    } else if (move === 0) {
      randomPath[k] = grid[i+1][j]; //moves down the grid
      
      i++;
      k++;
    } else if (move === 1) {
      randomPath[k] = grid[i][j+1]; //moves across the grid
      
      j++;
      k++;
    } 
    // randomPath[k] = grid[i][j];
  }
  return randomPath; 
}


