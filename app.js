$(function() {
  console.log("working");
  generateGrid(width);
  console.log(grid);
  generateRandomPath(width);
  getUserMove();
})

//Need to generate a grid, of any size, to play the maze game on
var grid  = [];
var width = 3;

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

//Need to generate a random path across a grid of any size, starting in the north-west corner
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
  }
  return randomPath; 
}

//Need to write up function to set up the grid on the screen
//The grid should load dynamically when difficulty level button is pressed
//Grid should always be of the same total size but contain varying number of grid squares.

//Need to put grid square the user chooses into an array
//This array can be compared with the randomPath array to see if a correct square
//has been chosen

var userMoves = [0];

function getUserMove() {
  $('.gridsquare').on("click", playGame); 
}

// Need to compare user move to random path array to see if move is correct

function playGame() {

  var $squareChosen = $(this);
  var $squareChosenId = $squareChosen.attr('id');
  userMoves.push($squareChosenId);
  console.log(userMoves);

  if ( userMoves[userMoves.length-1] == randomPath[userMoves.length-1] && userMoves[userMoves.length-1] == grid[width-1][width-1]) {
    $squareChosen.css('background', 'green');
    console.log("winner");
    userMoves = [0];
    setTimeout(function() {
      $('li').css('background', 'white');
      $('#0').css('background', 'green');
    }, 1000);
    generateRandomPath(width);
    console.log(randomPath);
  } else if (userMoves[userMoves.length-1] == randomPath[userMoves.length-1]) {
    $squareChosen.css('background', 'green');
  } else {
    $squareChosen.css('background', 'red');
    userMoves = [0];
    console.log(userMoves);
    setTimeout(function() {
      $('li').css('background', 'white');
      $('#0').css('background', 'green');
    }, 1000);
  }


}