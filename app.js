$(function() {
  setUp();
  width=3;
  generateGrid(width);
  generateRandomPath(width);
  $('.gridsquare'+width).on('click', playGameClick);
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

//Need to put grid square the user chooses into an array
//This array can be compared with the randomPath array to see if a correct square
//has been chosen

var userMoves = [0];
var id        = 0;
var userLives = 10;
var userScore = 0;
var gridwidth;

  if (document.documentElement.clientWidth < 600) {
    gridwidth = 300;
  } else {
    gridwidth = 450;
  }

function setUp() {
  $('.chooseLevel').on("click", generateGridAndPath);
  $('#level-button').on('click',menuToggle);
  $('.chooseLevel').on('click',menuToggle);
  $('#instruction-button').on('click',menuToggle);
  $('#reset').on("click", reset); 
  $('#hint').on("click", getHint);  
}

// Need to compare user move to random path array to see if move is correct

var gridPositionsi = [0];
var gridPositionsj = [0];

function playGame() {
  var keypressed    = event.which;
  var gridPositioni = gridPositionsi[gridPositionsi.length-1];
  var gridPositionj = gridPositionsj[gridPositionsj.length-1];

  if (id < (Math.pow(width,2)-1) && gridPositionsj[gridPositionsj.length-1] !== width-1&& keypressed === 39) {
    id++;
    gridPositionj++;
    userMoves.push(id);
    gridPositionsj.push(gridPositionj);
    $('.cursor'+width).animate({left: "+="+((gridwidth/width))+"px"}, 100, 'swing');
    checkWin();

  } else if (id < (Math.pow(width,2)-1) && gridPositionsi[gridPositionsi.length-1] !== width-1 && keypressed === 40) {
    id+= width;
    gridPositioni++;
    userMoves.push(id);
    gridPositionsi.push(gridPositioni);
    $('.cursor'+width).animate({top: "+="+((gridwidth/width))+"px"}, 100, 'swing');
    checkWin();
    
  }
}

function playGameClick() {
  var $squareClicked = parseInt($(this).attr('id'));
  var difference     = ($squareClicked-userMoves[userMoves.length-1]);
  
  id+= difference;

  userMoves.push(id);

  if(difference < width) {
    $('.cursor'+width).animate({left: "+="+((gridwidth/width))+"px"}, 100, 'swing');
  } else {
    $('.cursor'+width).animate({top: "+="+((gridwidth/width))+"px"}, 100, 'swing');
  }

  checkWin();
}

function checkWin() {
  if (userMoves[userMoves.length-1] === randomPath[userMoves.length-1] && userMoves[userMoves.length-1] === grid[width-1][width-1]) {

    $('.cursor'+width).addClass('correct-square');
    $('#'+userMoves[userMoves.length-2]).addClass('correct-square');
      setTimeout(function() {
        $('#'+userMoves[userMoves.length-1]).addClass('correct-square');
      },200);

    userScore++;

    $('#score').text("Score: " + userScore);
    $('#score').addClass("correct");
      setTimeout(function() {
        $('#score').removeClass("correct");
      },1000);

    if (userLives < 10 && userScore % 3 === 0) {
      userLives++;

      // $('#lives').text("Lives: " + userLives);
      $('#lives').addClass("correct");
      setTimeout(function() {
        $('#lives').removeClass("correct");
      },1000);
    }
    setTimeout(resetGrid, 1000);

    generateRandomPath(width);

  } else if (userMoves[userMoves.length-1] === randomPath[userMoves.length-1]) {
    $('#'+userMoves[userMoves.length-2]).addClass('correct-square');
    $('.cursor'+width).addClass('correct-square');

  } else {
    userLives--;
    $('#lives').text("Lives: " + userLives);
    $('.cursor'+width).addClass('incorrect-square');
    $('.cursor'+width).addClass('animated shake');

    // $('#lives').text("Lives: " + userLives);
    $('#lives').addClass("incorrect");
      setTimeout(function() {
        $('.cursor'+width).addClass('animated shake');
        $('#lives').removeClass("incorrect");
      },500);

      if (userLives === 0) {
        for (var i=0; i <grid.length; i++) {
          for(var j=0; j<grid.length; j++) {
          $('#'+grid[i][j]).addClass('incorrect-square');
          }
        }
      setTimeout(reset, 2000);
      
      return generateRandomPath(width);
      }
    setTimeout(resetGrid, 500);
  }
  $('#lives').text("Lives: " + userLives);
}

//Need a function to reset the grid

function resetGrid() {
  gridPositionsi = [0];
  gridPositionsj = [0];
  userMoves = [0];
  id        =0;
  $('.gridsquare'+width).removeClass('cursor'+width);
  $('.gridsquare'+width).removeClass('correct-square')
  $('.gridsquare'+width).removeClass('incorrect-square');
  $('#0').html('<div class="cursor'+width+'"></div>');
  $('.cursor'+width).addClass('animated infinite pulse')
}

//Need a function to reset lives

function resetLives() {
  userLives = 10;
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
    $('.message').text("Not enough lives");
  return setTimeout(function() {$('.message').text("");},500)
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
  $('.cursor'+width).addClass('animated infinite pulse');

  generateGrid(width);
  generateRandomPath(width);
  $('.gridsquare'+width).on('click', playGameClick);
}

// Dyanamic menus
function menuToggle(){
  event.preventDefault();
  $(this).siblings().slideToggle();
}