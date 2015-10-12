$(function() {
  console.log("working");
  setUp();
  width=3;
  generateGrid(width);
  generateRandomPath(width);
  $(document).on("keyup", playGame);
})

//Need to generate a grid, of any size, to play the maze game on
var grid  = [];
var width;

function generateGrid(width) {
  var size = Math.pow(width,2); 
  var initialGrid;
  initialGrid = Array.apply(null, {length: size}).map(Number.call, Number);

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
var id=0;
var userLives = 10;
var userScore = 0;

function setUp() {
  $('.chooseLevel').on("click", generateGridAndPath);
  $('#reset').on("click", reset); 
  $('#hint').on("click", getHint);
}

// Need to compare user move to random path array to see if move is correct

function playGame() {
console.log("keyed");
console.log(width);
  var keypressed = event.which;

  if(id < (Math.pow(width,2)-1) && keypressed === 39) {
    id+=1;
    console.log(id);
    userMoves.push(id);
    $('.cursor'+width).animate({left: "+="+((450/width)-2)+"px"}, 100, 'swing');
    checkWin();

  } else if (id < (Math.pow(width,2)-1) && keypressed === 40) {
    id+=width;
    console.log(id);
    userMoves.push(id);
    $('.cursor'+width).animate({top: "+="+((450/width)-2)+"px"}, 100, 'swing');
    checkWin();

  }
}



function checkWin() {
  if (userMoves[userMoves.length-1] === randomPath[userMoves.length-1] && userMoves[userMoves.length-1] === grid[width-1][width-1]) {
    $('.cursor'+width).addClass('correct');
    $('#'+userMoves[userMoves.length-2]).addClass('correct-square');
    $('#'+userMoves[userMoves.length-1]).addClass('correct-square');
    userScore++;
    $('#score').text("Score: " + userScore);
    $('#score').addClass("correct-square");
    setTimeout(function() {
      $('#score').removeClass("correct-square");
    },1000);

    setTimeout(resetGrid, 1000);
    console.log(userMoves);

    if (userLives < 5 && userScore % 3 === 0) {
    userLives++;
    }

    generateRandomPath(width);

  } else if (userMoves[userMoves.length-1] === randomPath[userMoves.length-1]) {
    $('#'+userMoves[userMoves.length-2]).addClass('correct-square');
    $('.cursor'+width).addClass('correct');

  } else {
    $('.cursor'+width).addClass('incorrect');
    userLives--;
    $('#lives').text("Lives: " + userLives);
    $('#lives').addClass("incorrect-square");
    setTimeout(function() {
      $('#lives').removeClass("incorrect-square");
    },500);

    if (userLives === 0) {

      for (var i=0; i <grid.length; i++) {
        for(var j=0; j<grid.length; j++) {
        $('#'+grid[i][j]).addClass('incorrect-square');
        }
      }

      console.log("Loser");
      setTimeout(reset, 2000);
      return generateRandomPath(width);

    }

    setTimeout(resetGrid, 500);
  }
  $('#lives').text("Lives: " + userLives);
}

//Need a function to reset the grid

function resetGrid() {
  userMoves = [0];
  id=0;
  $('.gridsquare'+width).removeClass('cursor'+width);
  $('.gridsquare'+width).removeClass('correct-square')
  $('.gridsquare'+width).removeClass('incorrect-square');
  $('#0').html('<div class="cursor'+width+'"></div>');
  $('.gridsquare'+width).css('background','#D8DBE2;');
  console.log(userMoves);
}

//Need a function to reset lives

function resetLives() {
  userLives = 5;
  $('#lives').text("Lives: " + userLives);
}

//Need a function to reset score

function resetScore() {
  userScore = 0;
  $('#score').text("Score: " + userScore);
}

//Total reset function required

function reset() {
  resetGrid();
  resetLives();
  resetScore();
  generateRandomPath(width);
}

//Need a function that displays the path, a "hint" when user is stuck

function getHint() {
  if (userLives === 1) {
    return console.log("not enough lives");
  }
  userLives--;
  $('#lives').text("Lives: " + userLives);
  for (var i=0; i<randomPath.length; i++) {
  $('#'+randomPath[i]).addClass('correct-square');
  setTimeout(resetGrid, 500);
 }
}

//Need to be able to dynamically create grids of different sizes on the page

function generateGridAndPath() {
  $('.grid').empty();
  width = parseInt($(this).val());

  for (var i=0; i < Math.pow(width,2); i++) {
    var $gridsquare = $('<li></li>').addClass("gridsquare"+width);
    $('.grid').append($gridsquare.attr("id", i));
  }
  $('#0').html('<div class="cursor'+width+'"></div>');
  generateGrid(width);
  generateRandomPath(width);
}


