$(function() {
  console.log("working");
  generateGrid(width);
  console.log(grid);
  generateRandomPath(width);
  setUp();
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
var userLives = 3;
var userScore = 0;

function setUp() {
  $('.gridsquare').on("click", playGame);
  $('#reset').on("click", resetLives); 
  $('#reset').on("click", resetGrid);
  $('#reset').on("click", resetScore);
  $('#hint').on("click", getHint);
}

// Need to compare user move to random path array to see if move is correct

function playGame() {

  var $squareChosen = $(this);
  var $squareChosenId = parseInt($squareChosen.attr('id'));
  userMoves.push($squareChosenId);
  console.log(userMoves);

  if (userMoves[userMoves.length-1] === randomPath[userMoves.length-1] && userMoves[userMoves.length-1] === grid[width-1][width-1]) {
    $squareChosen.css('background', 'green');
    console.log("winner");
    userScore++;
    $('#score').text("Score: " + userScore)
    setTimeout(resetGrid, 1000);

    if (userLives < 3) {
    userLives++;
    }

    generateRandomPath(width);

  } else if (userMoves[userMoves.length-1] === randomPath[userMoves.length-1]) {
    $squareChosen.css('background', 'green');

  } else {
    $squareChosen.css('background', 'red');
    userLives--;
    // $('#lives').text("Lives: " + userLives);

    if (userLives === 0) {
      for (var i=0; i <grid.length; i++) {
        for(var j=0; j<grid.length; j++) {
        $('#'+grid[i][j]).css('background', 'red');
        }
      }
      console.log("Loser");
      setTimeout(resetGrid, 3000);
      setTimeout(resetLives, 500);
      generateRandomPath(width);
    }
    setTimeout(resetGrid, 500);
  }
  $('#lives').text("Lives: " + userLives);
}

//Need a function to reset the grid

function resetGrid() {
  userMoves = [0];
  $('li').css('background', 'white');
  $('#0').css('background', 'green');
}

//Need a function to reset lives

function resetLives() {
  userLives = 3;
  $('#lives').text("Lives: " + userLives);
}

//Need a function to reset score

function resetScore() {
  userScore = 0;
  $('#score').text("Score: " + userScore);
}


//Need a function that displays the path, a "hint" when user is stuck

function getHint() {
  userLives--;
  for (var i=0; i<randomPath.length; i++) {
  $('#'+randomPath[i]).css('background', 'green');
  setTimeout(resetGrid, 500);
 }
}