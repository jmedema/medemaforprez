function games_oracle()
{
	var input = document.getElementById("games_oracle_input");
	var output = document.getElementById("games_oracle_response");
	if (input.value == "")
	{
		output.innerHTML = "Seriously, how do you expect me to answer this?";
		return;
	}
//	else
//	  { input.value = ""; }

	var responses = new Array();
	responses.push("System Error!");
	responses.push("Line Busy.");
	responses.push("Uhh...can you repeat that?");
	responses.push("Do I have to answer that?");
	responses.push("Are you sure you want to ask that?");
	responses.push("You'd know that better than I would...");
	responses.push("Don't insult my intelligence!");

	var now = new Date();
	var seed = now.getSeconds();
	responseIdx = Math.floor( Math.random(seed) * responses.length );
	output.innerHTML = responses[responseIdx];
}


// ready for this?  When setting "&nbsp;" in javascript,
// reading this value returns different values depending
// on the browser (for innerHTML only?!?).
// When setting to "&nbsp;":
// FF: reading returns "&nbsp;"
// IE: reading returns "&nbsp;"
// Opera: reading returns " "
//
// The moral of the story is that all web browsers suck.  In order
// to work around this, when writing values I am using "&nbsp;".
// Before reading any values, I use this function to determine
// what I should be looking for ("&nbsp;" or " ").
function games_getNBSP()
{
	var browserCheck = document.getElementById("games_browserCheck");
	browserCheck.innerHTML = "&nbsp;";
	return browserCheck.innerHTML;
}


function games_ttt_reset()
{
	var nbsp = games_getNBSP();
	var status = document.getElementById("games_ttt_status");
	status.innerHTML = "Player X's turn";
	var r0c0 = document.getElementById("games_ttt_r0c0");
	var r0c1 = document.getElementById("games_ttt_r0c1");
	var r0c2 = document.getElementById("games_ttt_r0c2");
	var r1c0 = document.getElementById("games_ttt_r1c0");
	var r1c1 = document.getElementById("games_ttt_r1c1");
	var r1c2 = document.getElementById("games_ttt_r1c2");
	var r2c0 = document.getElementById("games_ttt_r2c0");
	var r2c1 = document.getElementById("games_ttt_r2c1");
	var r2c2 = document.getElementById("games_ttt_r2c2");
	r0c0.innerHTML = "&nbsp;";
	r0c1.innerHTML = "&nbsp;";
	r0c2.innerHTML = "&nbsp;";
	r1c0.innerHTML = "&nbsp;";
	r1c1.innerHTML = "&nbsp;";
	r1c2.innerHTML = "&nbsp;";
	r2c0.innerHTML = "&nbsp;";
	r2c1.innerHTML = "&nbsp;";
	r2c2.innerHTML = "&nbsp;";
}

function games_ttt_checkForWinner(grid)
{
	var returnVal = false;
	var nbsp = games_getNBSP();
	var status = document.getElementById("games_ttt_status");

	if(
		(grid[0][0].innerHTML == "X" && grid[0][1].innerHTML == "X" && grid[0][2].innerHTML == "X") ||
		(grid[1][0].innerHTML == "X" && grid[1][1].innerHTML == "X" && grid[1][2].innerHTML == "X") ||
		(grid[2][0].innerHTML == "X" && grid[2][1].innerHTML == "X" && grid[2][2].innerHTML == "X") ||

		(grid[0][0].innerHTML == "X" && grid[1][0].innerHTML == "X" && grid[2][0].innerHTML == "X") ||
		(grid[0][1].innerHTML == "X" && grid[1][1].innerHTML == "X" && grid[2][1].innerHTML == "X") ||
		(grid[0][2].innerHTML == "X" && grid[1][2].innerHTML == "X" && grid[2][2].innerHTML == "X") ||

		(grid[0][0].innerHTML == "X" && grid[1][1].innerHTML == "X" && grid[2][2].innerHTML == "X") ||
		(grid[0][2].innerHTML == "X" && grid[1][1].innerHTML == "X" && grid[2][0].innerHTML == "X")
	  )
	{
		status.innerHTML = "Player X wins!";
		return true;
	}

	if(
		(grid[0][0].innerHTML == "O" && grid[0][1].innerHTML == "O" && grid[0][2].innerHTML == "O") ||
		(grid[1][0].innerHTML == "O" && grid[1][1].innerHTML == "O" && grid[1][2].innerHTML == "O") ||
		(grid[2][0].innerHTML == "O" && grid[2][1].innerHTML == "O" && grid[2][2].innerHTML == "O") ||

		(grid[0][0].innerHTML == "O" && grid[1][0].innerHTML == "O" && grid[2][0].innerHTML == "O") ||
		(grid[0][1].innerHTML == "O" && grid[1][1].innerHTML == "O" && grid[2][1].innerHTML == "O") ||
		(grid[0][2].innerHTML == "O" && grid[1][2].innerHTML == "O" && grid[2][2].innerHTML == "O") ||

		(grid[0][0].innerHTML == "O" && grid[1][1].innerHTML == "O" && grid[2][2].innerHTML == "O") ||
		(grid[0][2].innerHTML == "O" && grid[1][1].innerHTML == "O" && grid[2][0].innerHTML == "O")
	  )
	{
		status.innerHTML = "Player O wins!";
		return true;
	}


	// now that we know there is no definitive winner,
	// check for a tie game...
	var foundEmpty = false;
	var i, j;
	for(i=0; i<3; i++)
	{
	  for( j=0; j<3; j++)
	  {
		if( grid[i][j].innerHTML == nbsp )
		{
			foundEmpty = true;
			break;
		}
	  }
	  if( foundEmpty )
	    { break; }
	}
	if( ! foundEmpty )
	{
		status.innerHTML = "It's a tie!";
		return true;
	}
	return false;
}

function games_ttt_cellClicked(el)
{
	// pretend nothing happened if the cell has already been chosen
	var nbsp = games_getNBSP();
	if( el.innerHTML != nbsp )
	  { return; }

	var grid = new Array();
	var row = new Array();
	var status = document.getElementById("games_ttt_status");
	//status.innerHTML = el.id;
	row.push(document.getElementById("games_ttt_r0c0"));
	row.push(document.getElementById("games_ttt_r0c1"));
	row.push(document.getElementById("games_ttt_r0c2"));
	grid.push(row);
	row = new Array();
	row.push(document.getElementById("games_ttt_r1c0"));
	row.push(document.getElementById("games_ttt_r1c1"));
	row.push(document.getElementById("games_ttt_r1c2"));
	grid.push(row);
	row = new Array();
	row.push(document.getElementById("games_ttt_r2c0"));
	row.push(document.getElementById("games_ttt_r2c1"));
	row.push(document.getElementById("games_ttt_r2c2"));
	grid.push(row);
	row = new Array();

	// do nothing if the game is already over...
	var gameOver = games_ttt_checkForWinner(grid);
	if( gameOver )
	  { return; }

	// find out the turn by counting filled grids.
	var turnsToGo = 8;
	if( grid[0][0].innerHTML != nbsp )
	  { turnsToGo = turnsToGo - 1; }
	if( grid[0][1].innerHTML  != nbsp )
	  { turnsToGo = turnsToGo - 1; }
	if( grid[0][2].innerHTML != nbsp )
	  { turnsToGo = turnsToGo - 1; }
	if( grid[1][0].innerHTML != nbsp )
	  { turnsToGo = turnsToGo - 1; }
	if( grid[1][1].innerHTML != nbsp )
	  { turnsToGo = turnsToGo - 1; }
	if( grid[1][2].innerHTML!= nbsp )
	  { turnsToGo = turnsToGo - 1; }
	if( grid[2][0].innerHTML!= nbsp )
	  { turnsToGo = turnsToGo - 1; }
	if( grid[2][1].innerHTML!= nbsp )
	  { turnsToGo = turnsToGo - 1; }
	if( grid[2][2].innerHTML!= nbsp )
	  { turnsToGo = turnsToGo - 1; }
	if( (turnsToGo % 2) == 0 )
	{
		el.innerHTML = "X";
		status.innerHTML = "Player O's turn";
	}
	else
	{
		el.innerHTML = "O";
		status.innerHTML = "Player X's turn";
	}
/*
var debug = "";
var i, j;
for(i=0; i<3; i++)
{
  for( j=0; j<3; j++)
  {
    if( grid[i][j].innerHTML != nbsp )
      { debug += grid[i][j].innerHTML; }
	else
	  { debug += "*"; }
  }
  debug += "\n";
}
alert(debug);
*/
	gameOver = games_ttt_checkForWinner(grid);
	if( gameOver )
	  { return; }




	// only do this stuff in a single player game
	var singlePlayer = document.getElementById("games_ttt_singlePlayer");
	if(singlePlayer.checked)
	{
		//make a random choice for "2nd" player
		var autoEl;
		var now = new Date();
		var seed = now.getSeconds();
		// the number of empty boxes to skip before
		// making the auto-choice
		var boxIdx = Math.floor( Math.random(seed) * turnsToGo );
		var i, j;
		for(i=0; i<3; i++)
		{
		  for( j=0; j<3; j++)
		  {
			if( grid[i][j].innerHTML == nbsp )
			{
				if( boxIdx == 0 )
				{
					autoEl = grid[i][j];
					i = 999;
					j = 999;
				}
				boxIdx = boxIdx - 1;
			}
		  }
		}

		turnsToGo = turnsToGo - 1;
		if( (turnsToGo % 2) == 0 )
		{
			autoEl.innerHTML = "X";
			status.innerHTML = "Player O's turn";
		}
		else
		{
			autoEl.innerHTML = "O";
			status.innerHTML = "Player X's turn";
		}

		gameOver = games_ttt_checkForWinner(grid);
		if( gameOver )
		  { return; }
	}
}
function games_ttt_r0c0Clicked()
{
	var el = document.getElementById("games_ttt_r0c0");
	games_ttt_cellClicked(el);
}
function games_ttt_r0c1Clicked()
{
	var el = document.getElementById("games_ttt_r0c1");
	games_ttt_cellClicked(el);
}
function games_ttt_r0c2Clicked()
{
	var el = document.getElementById("games_ttt_r0c2");
	games_ttt_cellClicked(el);
}
function games_ttt_r1c0Clicked()
{
	var el = document.getElementById("games_ttt_r1c0");
	games_ttt_cellClicked(el);
}
function games_ttt_r1c1Clicked()
{
	var el = document.getElementById("games_ttt_r1c1");
	games_ttt_cellClicked(el);
}
function games_ttt_r1c2Clicked()
{
	var el = document.getElementById("games_ttt_r1c2");
	games_ttt_cellClicked(el);
}
function games_ttt_r2c0Clicked()
{
	var el = document.getElementById("games_ttt_r2c0");
	games_ttt_cellClicked(el);
}
function games_ttt_r2c1Clicked()
{
	var el = document.getElementById("games_ttt_r2c1");
	games_ttt_cellClicked(el);
}
function games_ttt_r2c2Clicked()
{
	var el = document.getElementById("games_ttt_r2c2");
	games_ttt_cellClicked(el);
}





function games_chess_setup_board(whichBoard)
{
	var dummy = "";
	if( whichBoard == "dummy" )
	  { dummy = "dummy_"; }

	var grid = new Array();
	row = new Array();
	row.push(document.getElementById("games_chess_" + dummy + "r0c0"));
	row.push(document.getElementById("games_chess_" + dummy + "r0c1"));
	row.push(document.getElementById("games_chess_" + dummy + "r0c2"));
	row.push(document.getElementById("games_chess_" + dummy + "r0c3"));
	row.push(document.getElementById("games_chess_" + dummy + "r0c4"));
	row.push(document.getElementById("games_chess_" + dummy + "r0c5"));
	row.push(document.getElementById("games_chess_" + dummy + "r0c6"));
	row.push(document.getElementById("games_chess_" + dummy + "r0c7"));
	grid.push(row);
	row = new Array();
	row.push(document.getElementById("games_chess_" + dummy + "r1c0"));
	row.push(document.getElementById("games_chess_" + dummy + "r1c1"));
	row.push(document.getElementById("games_chess_" + dummy + "r1c2"));
	row.push(document.getElementById("games_chess_" + dummy + "r1c3"));
	row.push(document.getElementById("games_chess_" + dummy + "r1c4"));
	row.push(document.getElementById("games_chess_" + dummy + "r1c5"));
	row.push(document.getElementById("games_chess_" + dummy + "r1c6"));
	row.push(document.getElementById("games_chess_" + dummy + "r1c7"));
	grid.push(row);
	row = new Array();
	row.push(document.getElementById("games_chess_" + dummy + "r2c0"));
	row.push(document.getElementById("games_chess_" + dummy + "r2c1"));
	row.push(document.getElementById("games_chess_" + dummy + "r2c2"));
	row.push(document.getElementById("games_chess_" + dummy + "r2c3"));
	row.push(document.getElementById("games_chess_" + dummy + "r2c4"));
	row.push(document.getElementById("games_chess_" + dummy + "r2c5"));
	row.push(document.getElementById("games_chess_" + dummy + "r2c6"));
	row.push(document.getElementById("games_chess_" + dummy + "r2c7"));
	grid.push(row);
	row = new Array();
	row.push(document.getElementById("games_chess_" + dummy + "r3c0"));
	row.push(document.getElementById("games_chess_" + dummy + "r3c1"));
	row.push(document.getElementById("games_chess_" + dummy + "r3c2"));
	row.push(document.getElementById("games_chess_" + dummy + "r3c3"));
	row.push(document.getElementById("games_chess_" + dummy + "r3c4"));
	row.push(document.getElementById("games_chess_" + dummy + "r3c5"));
	row.push(document.getElementById("games_chess_" + dummy + "r3c6"));
	row.push(document.getElementById("games_chess_" + dummy + "r3c7"));
	grid.push(row);
	row = new Array();
	row.push(document.getElementById("games_chess_" + dummy + "r4c0"));
	row.push(document.getElementById("games_chess_" + dummy + "r4c1"));
	row.push(document.getElementById("games_chess_" + dummy + "r4c2"));
	row.push(document.getElementById("games_chess_" + dummy + "r4c3"));
	row.push(document.getElementById("games_chess_" + dummy + "r4c4"));
	row.push(document.getElementById("games_chess_" + dummy + "r4c5"));
	row.push(document.getElementById("games_chess_" + dummy + "r4c6"));
	row.push(document.getElementById("games_chess_" + dummy + "r4c7"));
	grid.push(row);
	row = new Array();
	row.push(document.getElementById("games_chess_" + dummy + "r5c0"));
	row.push(document.getElementById("games_chess_" + dummy + "r5c1"));
	row.push(document.getElementById("games_chess_" + dummy + "r5c2"));
	row.push(document.getElementById("games_chess_" + dummy + "r5c3"));
	row.push(document.getElementById("games_chess_" + dummy + "r5c4"));
	row.push(document.getElementById("games_chess_" + dummy + "r5c5"));
	row.push(document.getElementById("games_chess_" + dummy + "r5c6"));
	row.push(document.getElementById("games_chess_" + dummy + "r5c7"));
	grid.push(row);
	row = new Array();
	row.push(document.getElementById("games_chess_" + dummy + "r6c0"));
	row.push(document.getElementById("games_chess_" + dummy + "r6c1"));
	row.push(document.getElementById("games_chess_" + dummy + "r6c2"));
	row.push(document.getElementById("games_chess_" + dummy + "r6c3"));
	row.push(document.getElementById("games_chess_" + dummy + "r6c4"));
	row.push(document.getElementById("games_chess_" + dummy + "r6c5"));
	row.push(document.getElementById("games_chess_" + dummy + "r6c6"));
	row.push(document.getElementById("games_chess_" + dummy + "r6c7"));
	grid.push(row);
	row = new Array();
	row.push(document.getElementById("games_chess_" + dummy + "r7c0"));
	row.push(document.getElementById("games_chess_" + dummy + "r7c1"));
	row.push(document.getElementById("games_chess_" + dummy + "r7c2"));
	row.push(document.getElementById("games_chess_" + dummy + "r7c3"));
	row.push(document.getElementById("games_chess_" + dummy + "r7c4"));
	row.push(document.getElementById("games_chess_" + dummy + "r7c5"));
	row.push(document.getElementById("games_chess_" + dummy + "r7c6"));
	row.push(document.getElementById("games_chess_" + dummy + "r7c7"));
	grid.push(row);

	return grid;
}


// Another gem...  When reading/setting a color, each main browser
// (FF, Opera, and IE) each store the values in a different fashion.
// When setting to a color code (ex. "white"):
// FF: reading returns "white"
// IE: reading returns "white"
// Opera: reading returns "#ffffff"
//
// When setting to a hex value (ex. "#ffffff"):
// FF: reading returns "RGB: (FF, FF, FF)"
// IE: reading returns "#ffffff"
// Opera reading returns "#ffffff"
//
// The moral of the story is that all web browsers suck.  In order
// to work around this, when writing values I am using color codes.
// Before reading any color codes, I use this function to determine
// what I should be looking for (hex value or color code).  So in
// this program, when reading values can be tricky, but I am *always*
// writing the values using color codes.
function games_chess_getColors()
{
	var returnArray = new Array();
	var browserCheck = document.getElementById("games_browserCheck");
	browserCheck.style.color = "white";
	if( browserCheck.style.color == "white" )
	{
		returnArray.push("white");
		returnArray.push("black");
	}
	else if( browserCheck.style.color == "#ffffff" )
	{
		returnArray.push("#ffffff");
		returnArray.push("#000000");
	}
	return returnArray;
}


function games_chess_reset()
{
	var nbsp = games_getNBSP();
	var white, black;
	var colorArray = games_chess_getColors();
	white = colorArray[0];
	black = colorArray[1];
	var status = document.getElementById("games_chess_status");
	status.innerHTML = "White's turn";
	var turn = document.getElementById("games_chess_turn");
	var mode = document.getElementById("games_chess_mode");
	var positionSelectedStorage = document.getElementById("games_chess_positionSelectedStorage");
	var gameOver = document.getElementById("games_chess_gameOver");

	// for en passant - see Wikipedia "chess" entry
	var lastPiece = document.getElementById("games_chess_lastPiece");
	var lastPieceStart = document.getElementById("games_chess_lastPieceStart");
	var lastPieceEnd = document.getElementById("games_chess_lastPieceEnd");

	// for castling - see Wikipedia "chess" entry
	var whiteR1Moved = document.getElementById("games_chess_whiteR1Moved");
	var whiteR2Moved = document.getElementById("games_chess_whiteR2Moved");
	var whiteKMoved = document.getElementById("games_chess_whiteKMoved");
	var blackR1Moved = document.getElementById("games_chess_blackR1Moved");
	var blackR2Moved = document.getElementById("games_chess_blackR2Moved");
	var blackKMoved = document.getElementById("games_chess_blackKMoved");

	var grid = games_chess_setup_board("");
	mode.value = "startTurn";
	turn.value = white;
	positionSelectedStorage.value = "";
	gameOver.value = 0;

	// for en passant - see Wikipedia "chess" entry
	lastPiece.value = "";
	lastPieceStart.value = "";
	lastPieceEnd.value = "";

	// for castling - see Wikipedia "chess" entry
	whiteR1Moved.value = "0";
	whiteR2Moved.value = "0";
	whiteKMoved.value = "0";
	blackR1Moved.value = "0";
	blackR2Moved.value = "0";
	blackKMoved.value = "0";

	grid[0][0].innerHTML = "R";
	grid[0][0].style.color = "black";
	grid[1][0].innerHTML = "N";
	grid[1][0].style.color = "black";
	grid[2][0].innerHTML = "B";
	grid[2][0].style.color = "black";
	grid[3][0].innerHTML = "K";
	grid[3][0].style.color = "black";
	grid[4][0].innerHTML = "Q";
	grid[4][0].style.color = "black";
	grid[5][0].innerHTML = "B";
	grid[5][0].style.color = "black";
	grid[6][0].innerHTML = "N";
	grid[6][0].style.color = "black";
	grid[7][0].innerHTML = "R";
	grid[7][0].style.color = "black";
	grid[0][1].innerHTML = "P";
	grid[0][1].style.color = "black";
	grid[1][1].innerHTML = "P";
	grid[1][1].style.color = "black";
	grid[2][1].innerHTML = "P";
	grid[2][1].style.color = "black";
	grid[3][1].innerHTML = "P";
	grid[3][1].style.color = "black";
	grid[4][1].innerHTML = "P";
	grid[4][1].style.color = "black";
	grid[5][1].innerHTML = "P";
	grid[5][1].style.color = "black";
	grid[6][1].innerHTML = "P";
	grid[6][1].style.color = "black";
	grid[7][1].innerHTML = "P";
	grid[7][1].style.color = "black";

	var i, j;
	for( i=0; i<8; i++ )
	{
		for( j=2; j<6; j++ )
		{
			grid[i][j].innerHTML = "&nbsp;";
			grid[i][j].style.color = grid[i][j].style.backgroundColor;
			grid[i][j].className = "";
		}
	}

	for( i=0; i<8; i++ )
	{
		grid[i][0].className = "";
		grid[i][1].className = "";
		grid[i][6].className = "";
		grid[i][7].className = "";
	}

	grid[0][7].innerHTML = "R";
	grid[0][7].style.color = "white";
	grid[1][7].innerHTML = "N";
	grid[1][7].style.color = "white";
	grid[2][7].innerHTML = "B";
	grid[2][7].style.color = "white";
	grid[3][7].innerHTML = "K";
	grid[3][7].style.color = "white";
	grid[4][7].innerHTML = "Q";
	grid[4][7].style.color = "white";
	grid[5][7].innerHTML = "B";
	grid[5][7].style.color = "white";
	grid[6][7].innerHTML = "N";
	grid[6][7].style.color = "white";
	grid[7][7].innerHTML = "R";
	grid[7][7].style.color = "white";
	grid[0][6].innerHTML = "P";
	grid[0][6].style.color = "white";
	grid[1][6].innerHTML = "P";
	grid[1][6].style.color = "white";
	grid[2][6].innerHTML = "P";
	grid[2][6].style.color = "white";
	grid[3][6].innerHTML = "P";
	grid[3][6].style.color = "white";
	grid[4][6].innerHTML = "P";
	grid[4][6].style.color = "white";
	grid[5][6].innerHTML = "P";
	grid[5][6].style.color = "white";
	grid[6][6].innerHTML = "P";
	grid[6][6].style.color = "white";
	grid[7][6].innerHTML = "P";
	grid[7][6].style.color = "white";



/**********jm***************/
/*
// TESTING
for( i=0; i<8; i++ )
{
	for( j=0; j<8; j++ )
	{
		grid[i][j].innerHTML = "&nbsp;";
		grid[i][j].style.color = grid[i][j].style.backgroundColor;
	}
}

grid[3][7].innerHTML = "K";
grid[3][7].style.color = "white";
grid[3][0].innerHTML = "K";
grid[3][0].style.color = "black";
grid[1][6].innerHTML = "N";
grid[1][6].style.color = "white";
grid[0][7].innerHTML = "R";
grid[0][7].style.color = "white";
grid[7][7].innerHTML = "R";
grid[7][7].style.color = "white";
grid[0][0].innerHTML = "R";
grid[0][0].style.color = "black";
grid[7][0].innerHTML = "R";
grid[7][0].style.color = "black";
grid[7][6].innerHTML = "B";
grid[7][6].style.color = "black";

grid[5][3].innerHTML = "P";
grid[5][3].style.color = "white";
grid[4][1].innerHTML = "P";
grid[4][1].style.color = "black";
grid[5][1].innerHTML = "P";
grid[5][1].style.color = "black";
grid[6][1].innerHTML = "P";
grid[6][1].style.color = "black";
grid[7][1].innerHTML = "P";
grid[7][1].style.color = "black";
*/
}

function games_chess_checkForWinner(grid)
{
	var returnVal = false;
	var nbsp = games_getNBSP();
	var white, black;
	var colorArray = games_chess_getColors();
	white = colorArray[0];
	black = colorArray[1];
	var status = document.getElementById("games_chess_status");
	var whiteKingFound = 0;
	var blackKingFound = 0;

	var i, j;
	for(i=0; i<8; i++)
	{
	  for( j=0; j<8; j++)
	  {
	    if( grid[i][j].innerHTML == "K" && grid[i][j].style.color == white )
	      { whiteKingFound = 1; }
	    if( grid[i][j].innerHTML == "K" && grid[i][j].style.color == black )
	      { blackKingFound = 1; }
	  }
	}


	if( ! blackKingFound )
	{
		status.innerHTML = "<strong>WHITE WINS!</strong>";
		return true;
	}

	if( ! whiteKingFound )
	{
		status.innerHTML = "<strong>BLACK WINS!</strong>";
		return true;
	}
	return false;
}

function games_chess_checkForCheck(kingColor, grid)
{
	var white, black;
	var colorArray = games_chess_getColors();
	white = colorArray[0];
	black = colorArray[1];
	var kingRow;
	var kingCol;
	var i, j;
	for(i=0; i<8; i++)
	{
		for(j=0; j<8; j++)
		{
			if( grid[i][j].innerHTML == "K" && grid[i][j].style.color == kingColor )
			{
				kingRow = i;
				kingCol = j;
			}
		}
	}

	var moveList;
	var potentialMove;
	var k;
	for(i=0; i<8; i++)
	{
		for(j=0; j<8; j++)
		{
			if((kingColor == black && grid[i][j].style.color == white) ||
			   (kingColor == white && grid[i][j].style.color == black))
			{
				moveList = games_chess_findValidMoves(grid[i][j], grid, false);
				for(k=0; k<moveList.length; k++)
				{
					potentialMove = moveList[k];
					if( potentialMove[0] == kingRow && potentialMove[1] == kingCol )
					  { return true; }
				}
			}
		}
	}
	return false;
}


function games_chess_checkForCastling(kingColor, whichRook, grid)
{
	// none of the involved pieces should have moved beforehand
	var nbsp = games_getNBSP();
	var white, black;
	var colorArray = games_chess_getColors();
	white = colorArray[0];
	black = colorArray[1];
	var kMoved, rMoved;

	if( kingColor == white )
	{
		kMoved = document.getElementById("games_chess_whiteKMoved");
		if( whichRook == "short" )
		  { rMoved = document.getElementById("games_chess_whiteR1Moved"); }
		else if( whichRook == "long" )
		  { rMoved = document.getElementById("games_chess_whiteR2Moved"); }
	}
	else if( kingColor == black )
	{
		kMoved = document.getElementById("games_chess_blackKMoved");
		if( whichRook == "short" )
		  { rMoved = document.getElementById("games_chess_blackR1Moved"); }
		else if( whichRook == "long" )
		  { rMoved = document.getElementById("games_chess_blackR2Moved"); }
	}

	if( kMoved.value == "1" || rMoved.value == "1" )
	  { return false; }

	var colorSide;
	if( kingColor == white )
	  { colorSide = 7; }
	else if ( kingColor == black )
	  { colorSide = 0; }

	// no intervening pieces
	if( whichRook == "short" )
	{
		if(grid[1][colorSide].innerHTML != nbsp || grid[2][colorSide].innerHTML != nbsp )
		  { return false; }
	}
	if( whichRook == "long" )
	{
		if(grid[4][colorSide].innerHTML != nbsp || grid[5][colorSide].innerHTML != nbsp || grid[6][colorSide].innerHTML != nbsp )
		  { return false; }
	}

	// king cannot currently be in check
 	if( games_chess_checkForCheck(kingColor, grid) )
	  { return false; }

	// king cannot cross any space that would put him in check,
	// including end position.
	var kingMoves = new Array();
	if( whichRook == "short" )
	{
		kingMoves.push(games_chess_createPosition(1, colorSide));
		kingMoves.push(games_chess_createPosition(2, colorSide));
	}
	if( whichRook == "long" )
	{
		kingMoves.push(games_chess_createPosition(4, colorSide));
		kingMoves.push(games_chess_createPosition(5, colorSide));
	}

	//Set up the hypothetical board.
	var modifiedGrid = games_chess_setup_board("dummy");

	var k;
	for( k=0; k<kingMoves.length; k++)
	{
		// 1) set up the hypothetical board for this potential move
		potentialElRow = kingMoves[k][0];
		potentialElCol = kingMoves[k][1];
		for( i=0; i<8; i++ )
		{
			for( j=0; j<8; j++ )
			{
				modifiedGrid[i][j].innerHTML = grid[i][j].innerHTML;
				modifiedGrid[i][j].style.color = grid[i][j].style.color;
				modifiedGrid.className = "";
			}
		}

		// 2)make the potential move on the copied board
		// (do not need to worry about "en passant" (yay!))
		modifiedGrid[potentialElRow][potentialElCol].innerHTML = "K";
		modifiedGrid[potentialElRow][potentialElCol].style.color = kingColor;
		modifiedGrid[3][potentialElCol].innerHTML = "&nbsp;";
		modifiedGrid[3][potentialElCol].style.color = modifiedGrid[3][potentialElCol].style.backgroundColor;

		// 3) check to see if this potential move would put our king in check
		if( games_chess_checkForCheck(kingColor, modifiedGrid) )
		  { return false; }
	}


	// king cannot castle with a promoted pawn
	// (inherently covered, do nothing)

	// OK, I guess it is safe to castle...
	return true;
}

function games_chess_createPosition(row, col)
{
	var temp = new Array();
	temp.push(row);
	temp.push(col);
	return temp;
}

// finds all valid moves for the piece on the <el> position of board <grid>.
// checkForCastle is a boolean that will determine if we should bother
// checking to see if a Castle move is valid for this piece.
function games_chess_findValidMoves(el, grid, checkForCastle)
{
	var white, black;
	var colorArray = games_chess_getColors();
	white = colorArray[0];
	black = colorArray[1];
	var turn = el.style.color;
	var elRow = parseInt(el.id.substr(el.id.length-3,1));
	var elCol = parseInt(el.id.substr(el.id.length-1,1));
	var returnVals = new Array();

	// Pawn
	if( el.innerHTML == "P" )
	{
		// for en passant - see Wikipedia "chess" entry
		var lastPiece = document.getElementById("games_chess_lastPiece");
		var lastPieceStart = document.getElementById("games_chess_lastPieceStart");
		var lastPieceStartRow = parseInt(lastPieceStart.value.substr(lastPieceStart.value.length-3,1));
		var lastPieceStartCol = parseInt(lastPieceStart.value.substr(lastPieceStart.value.length-1,1));
		var lastPieceEnd = document.getElementById("games_chess_lastPieceEnd");
		var lastPieceEndRow = parseInt(lastPieceEnd.value.substr(lastPieceEnd.value.length-3,1));
		var lastPieceEndCol = parseInt(lastPieceEnd.value.substr(lastPieceEnd.value.length-1,1));

		if( turn == white )
		{
			// basic move
			if( elCol != 0 && grid[elRow][elCol-1].style.color != white && grid[elRow][elCol-1].style.color != black )
			  { returnVals.push(games_chess_createPosition(elRow, elCol-1)); }

			// optional first move
			if( elCol == 6 &&
				grid[elRow][5].style.color != white && grid[elRow][5].style.color != black &&
				grid[elRow][4].style.color != white && grid[elRow][4].style.color != black )
			  { returnVals.push(games_chess_createPosition(elRow, 4)); }

			// basic attack
			if( elCol != 0 && elRow != 0 && grid[elRow-1][elCol-1].style.color == black )
			  { returnVals.push(games_chess_createPosition(elRow-1, elCol-1)); }
			if( elCol != 0 && elRow != 7 && grid[elRow+1][elCol-1].style.color == black )
			  { returnVals.push(games_chess_createPosition(elRow+1, elCol-1)); }

			// en passant
			if( elCol == 3 && elRow != 0 && lastPiece.value == "P" &&
				(elRow-1)==lastPieceStartRow && lastPieceStartCol == 1 && lastPieceEndCol == 3)
			  { returnVals.push(games_chess_createPosition(elRow-1, 2)); }
			if( elCol == 3 && elRow != 7 && lastPiece.value == "P" &&
				(elRow+1)==lastPieceStartRow && lastPieceStartCol == 1 && lastPieceEndCol == 3)
			  { returnVals.push(games_chess_createPosition(elRow+1, 2)); }
		}
		else if( turn == black )
		{
			// basic move
			if( elCol != 7 && grid[elRow][elCol+1].style.color != white && grid[elRow][elCol+1].style.color != black )
			  { returnVals.push(games_chess_createPosition(elRow, elCol+1)); }

			// optional first move
			if( elCol == 1 &&
				grid[elRow][3].style.color != white && grid[elRow][3].style.color != black &&
				grid[elRow][2].style.color != white && grid[elRow][2].style.color != black )
			  { returnVals.push(games_chess_createPosition(elRow, 3)); }

			// basic attack
			if( elCol != 7 && elRow != 0 && grid[elRow-1][elCol+1].style.color == white )
			  { returnVals.push(games_chess_createPosition(elRow-1, elCol+1)); }
			if( elCol != 7 && elRow != 7 && grid[elRow+1][elCol+1].style.color == white )
			  { returnVals.push(games_chess_createPosition(elRow+1, elCol+1)); }

			// en passant
			if( elCol == 4 && elRow != 0 && lastPiece.value == "P" &&
				(elRow-1)==lastPieceStartRow && lastPieceStartCol == 6 && lastPieceEndCol == 4)
			  { returnVals.push(games_chess_createPosition(elRow-1, 5)); }
			if( elCol == 4 && elRow != 7 && lastPiece.value == "P" &&
				(elRow+1)==lastPieceStartRow && lastPieceStartCol == 6 && lastPieceEndCol == 4)
			  { returnVals.push(games_chess_createPosition(elRow+1, 5)); }
		}
	}

	// Rook
	if( el.innerHTML == "R" )
	{
		// find all valid up moves
		possibleRow = elRow;
		possibleCol = elCol;
		while(true)
		{
			possibleRow--;
			if( possibleRow < 0 )
			  { break; }
			if( grid[possibleRow][possibleCol].style.color == turn )
			  { break; }
			else if ( (grid[possibleRow][possibleCol].style.color == white && turn == black) ||
					  (grid[possibleRow][possibleCol].style.color == black && turn == white) )
			{
				returnVals.push(games_chess_createPosition(possibleRow, possibleCol));
				break;
			}
			else
			  { returnVals.push(games_chess_createPosition(possibleRow, possibleCol)); }
		}
		// find all valid right moves
		possibleRow = elRow;
		possibleCol = elCol;
		while(true)
		{
			possibleCol++;
			if( possibleCol > 7 )
			  { break; }
			if( grid[possibleRow][possibleCol].style.color == turn )
			  { break; }
			else if ( (grid[possibleRow][possibleCol].style.color == white && turn == black) ||
					  (grid[possibleRow][possibleCol].style.color == black && turn == white) )
			{
				returnVals.push(games_chess_createPosition(possibleRow, possibleCol));
				break;
			}
			else
			  { returnVals.push(games_chess_createPosition(possibleRow, possibleCol)); }
		}
		// find all valid down moves
		possibleRow = elRow;
		possibleCol = elCol;
		while(true)
		{
			possibleRow++;
			if( possibleRow > 7 )
			  { break; }
			if( grid[possibleRow][possibleCol].style.color == turn )
			  { break; }
			else if ( (grid[possibleRow][possibleCol].style.color == white && turn == black) ||
					  (grid[possibleRow][possibleCol].style.color == black && turn == white) )
			{
				returnVals.push(games_chess_createPosition(possibleRow, possibleCol));
				break;
			}
			else
			  { returnVals.push(games_chess_createPosition(possibleRow, possibleCol)); }
		}
		// find all valid left moves
		possibleRow = elRow;
		possibleCol = elCol;
		while(true)
		{
			possibleCol--;
			if( possibleCol < 0 )
			  { break; }
			if( grid[possibleRow][possibleCol].style.color == turn )
			  { break; }
			else if ( (grid[possibleRow][possibleCol].style.color == white && turn == black) ||
					  (grid[possibleRow][possibleCol].style.color == black && turn == white) )
			{
				returnVals.push(games_chess_createPosition(possibleRow, possibleCol));
				break;
			}
			else
			  { returnVals.push(games_chess_createPosition(possibleRow, possibleCol)); }
		}

		// Castling?
		if( checkForCastle )
		{
			var colorSide;
			if( turn == white )
			  { colorSide = 7; }
			if( turn == black )
			  { colorSide = 0; }

			if( grid[3][colorSide].innerHTML == "K" && grid[3][colorSide].style.color == turn )
			{
				var castleType;
				if( elRow == 0 && elCol == colorSide )
				  { castleType = "short"; }
				if( elRow == 7 && elCol == colorSide )
				  { castleType = "long"; }
				if( castleType == "long" || castleType == "short" )
				{
					if(games_chess_checkForCastling(turn, castleType, grid))
					  { returnVals.push(games_chess_createPosition(3,colorSide)); }
				}
			}
		}
	}

	// Knight
	if( el.innerHTML == "N" )
	{
		if( (elRow-2) >= 0 && (elCol-1) >= 0 && turn != grid[elRow-2][elCol-1].style.color )
		  { returnVals.push(games_chess_createPosition(elRow-2, elCol-1)); }

		if( (elRow-2) >= 0 && (elCol+1) <= 7 && turn != grid[elRow-2][elCol+1].style.color )
		  { returnVals.push(games_chess_createPosition(elRow-2, elCol+1)); }

		if( (elRow-1) >= 0 && (elCol-2) >= 0 && turn != grid[elRow-1][elCol-2].style.color )
		  { returnVals.push(games_chess_createPosition(elRow-1, elCol-2)); }

		if( (elRow-1) >= 0 && (elCol+2) <= 7 && turn != grid[elRow-1][elCol+2].style.color )
		  { returnVals.push(games_chess_createPosition(elRow-1, elCol+2)); }

		if( (elRow+1) <= 7 && (elCol-2) >= 0 && turn != grid[elRow+1][elCol-2].style.color )
		  { returnVals.push(games_chess_createPosition(elRow+1, elCol-2)); }

		if( (elRow+1) <= 7 && (elCol+2) <= 7 && turn != grid[elRow+1][elCol+2].style.color )
		  { returnVals.push(games_chess_createPosition(elRow+1, elCol+2)); }

		if( (elRow+2) <= 7 && (elCol-1) >= 0 && turn != grid[elRow+2][elCol-1].style.color )
		  { returnVals.push(games_chess_createPosition(elRow+2, elCol-1)); }

		if( (elRow+2) <= 7 && (elCol+1) <= 7 && turn != grid[elRow+2][elCol+1].style.color )
		  { returnVals.push(games_chess_createPosition(elRow+2, elCol+1)); }
	}

	// Bishop
	if( el.innerHTML == "B" )
	{
		// find all valid up/left moves
		possibleRow = elRow;
		possibleCol = elCol;
		while(true)
		{
			possibleRow--;
			possibleCol--;
			if( possibleRow < 0 || possibleCol < 0 )
			  { break; }
			if( grid[possibleRow][possibleCol].style.color == turn )
			  { break; }
			else if ( (grid[possibleRow][possibleCol].style.color == white && turn == black) ||
			          (grid[possibleRow][possibleCol].style.color == black && turn == white) )
			{
				returnVals.push(games_chess_createPosition(possibleRow, possibleCol));
				break;
			}
			else
			  { returnVals.push(games_chess_createPosition(possibleRow, possibleCol)); }
		}
		// find all valid up/right moves
		possibleRow = elRow;
		possibleCol = elCol;
		while(true)
		{
			possibleRow--;
			possibleCol++;
			if( possibleRow < 0 || possibleCol > 7 )
			  { break; }
			if( grid[possibleRow][possibleCol].style.color == turn )
			  { break; }
			else if ( (grid[possibleRow][possibleCol].style.color == white && turn == black) ||
			          (grid[possibleRow][possibleCol].style.color == black && turn == white) )
			{
				returnVals.push(games_chess_createPosition(possibleRow, possibleCol));
				break;
			}
			else
			  { returnVals.push(games_chess_createPosition(possibleRow, possibleCol)); }
		}
		// find all valid down/left moves
		possibleRow = elRow;
		possibleCol = elCol;
		while(true)
		{
			possibleRow++;
			possibleCol--;
			if( possibleRow > 7 || possibleCol < 0 )
			  { break; }
			if( grid[possibleRow][possibleCol].style.color == turn )
			  { break; }
			else if ( (grid[possibleRow][possibleCol].style.color == white && turn == black) ||
			          (grid[possibleRow][possibleCol].style.color == black && turn == white) )
			{
				returnVals.push(games_chess_createPosition(possibleRow, possibleCol));
				break;
			}
			else
			  { returnVals.push(games_chess_createPosition(possibleRow, possibleCol)); }
		}
		// find all valid down/right moves
		possibleRow = elRow;
		possibleCol = elCol;
		while(true)
		{
			possibleRow++;
			possibleCol++;
			if( possibleRow > 7 || possibleCol > 7 )
			  { break; }
			if( grid[possibleRow][possibleCol].style.color == turn )
			  { break; }
			else if ( (grid[possibleRow][possibleCol].style.color == white && turn == black) ||
			          (grid[possibleRow][possibleCol].style.color == black && turn == white) )
			{
				returnVals.push(games_chess_createPosition(possibleRow, possibleCol));
				break;
			}
			else
			  { returnVals.push(games_chess_createPosition(possibleRow, possibleCol)); }
		}
	}

	// Queen
	if( el.innerHTML == "Q" )
	{
		// find all valid up moves
		possibleRow = elRow;
		possibleCol = elCol;
		while(true)
		{
			possibleRow--;
			if( possibleRow < 0 )
			  { break; }
			if( grid[possibleRow][possibleCol].style.color == turn )
			  { break; }
			else if ( (grid[possibleRow][possibleCol].style.color == white && turn == black) ||
					  (grid[possibleRow][possibleCol].style.color == black && turn == white) )
			{
				returnVals.push(games_chess_createPosition(possibleRow, possibleCol));
				break;
			}
			else
			  { returnVals.push(games_chess_createPosition(possibleRow, possibleCol)); }
		}
		// find all valid right moves
		possibleRow = elRow;
		possibleCol = elCol;
		while(true)
		{
			possibleCol++;
			if( possibleCol > 7 )
			  { break; }
			if( grid[possibleRow][possibleCol].style.color == turn )
			  { break; }
			else if ( (grid[possibleRow][possibleCol].style.color == white && turn == black) ||
					  (grid[possibleRow][possibleCol].style.color == black && turn == white) )
			{
				returnVals.push(games_chess_createPosition(possibleRow, possibleCol));
				break;
			}
			else
			  { returnVals.push(games_chess_createPosition(possibleRow, possibleCol)); }
		}
		// find all valid down moves
		possibleRow = elRow;
		possibleCol = elCol;
		while(true)
		{
			possibleRow++;
			if( possibleRow > 7 )
			  { break; }
			if( grid[possibleRow][possibleCol].style.color == turn )
			  { break; }
			else if ( (grid[possibleRow][possibleCol].style.color == white && turn == black) ||
					  (grid[possibleRow][possibleCol].style.color == black && turn == white) )
			{
				returnVals.push(games_chess_createPosition(possibleRow, possibleCol));
				break;
			}
			else
			  { returnVals.push(games_chess_createPosition(possibleRow, possibleCol)); }
		}
		// find all valid left moves
		possibleRow = elRow;
		possibleCol = elCol;
		while(true)
		{
			possibleCol--;
			if( possibleCol < 0 )
			  { break; }
			if( grid[possibleRow][possibleCol].style.color == turn )
			  { break; }
			else if ( (grid[possibleRow][possibleCol].style.color == white && turn == black) ||
					  (grid[possibleRow][possibleCol].style.color == black && turn == white) )
			{
				returnVals.push(games_chess_createPosition(possibleRow, possibleCol));
				break;
			}
			else
			  { returnVals.push(games_chess_createPosition(possibleRow, possibleCol)); }
		}

		// find all valid up/left moves
		possibleRow = elRow;
		possibleCol = elCol;
		while(true)
		{
			possibleRow--;
			possibleCol--;
			if( possibleRow < 0 || possibleCol < 0 )
			  { break; }
			if( grid[possibleRow][possibleCol].style.color == turn )
			  { break; }
			else if ( (grid[possibleRow][possibleCol].style.color == white && turn == black) ||
			          (grid[possibleRow][possibleCol].style.color == black && turn == white) )
			{
				returnVals.push(games_chess_createPosition(possibleRow, possibleCol));
				break;
			}
			else
			  { returnVals.push(games_chess_createPosition(possibleRow, possibleCol)); }
		}
		// find all valid up/right moves
		possibleRow = elRow;
		possibleCol = elCol;
		while(true)
		{
			possibleRow--;
			possibleCol++;
			if( possibleRow < 0 || possibleCol > 7 )
			  { break; }
			if( grid[possibleRow][possibleCol].style.color == turn )
			  { break; }
			else if ( (grid[possibleRow][possibleCol].style.color == white && turn == black) ||
			          (grid[possibleRow][possibleCol].style.color == black && turn == white) )
			{
				returnVals.push(games_chess_createPosition(possibleRow, possibleCol));
				break;
			}
			else
			  { returnVals.push(games_chess_createPosition(possibleRow, possibleCol)); }
		}
		// find all valid down/left moves
		possibleRow = elRow;
		possibleCol = elCol;
		while(true)
		{
			possibleRow++;
			possibleCol--;
			if( possibleRow > 7 || possibleCol < 0 )
			  { break; }
			if( grid[possibleRow][possibleCol].style.color == turn )
			  { break; }
			else if ( (grid[possibleRow][possibleCol].style.color == white && turn == black) ||
			          (grid[possibleRow][possibleCol].style.color == black && turn == white) )
			{
				returnVals.push(games_chess_createPosition(possibleRow, possibleCol));
				break;
			}
			else
			  { returnVals.push(games_chess_createPosition(possibleRow, possibleCol)); }
		}
		// find all valid down/right moves
		possibleRow = elRow;
		possibleCol = elCol;
		while(true)
		{
			possibleRow++;
			possibleCol++;
			if( possibleRow > 7 || possibleCol > 7 )
			  { break; }
			if( grid[possibleRow][possibleCol].style.color == turn )
			  { break; }
			else if ( (grid[possibleRow][possibleCol].style.color == white && turn == black) ||
			          (grid[possibleRow][possibleCol].style.color == black && turn == white) )
			{
				returnVals.push(games_chess_createPosition(possibleRow, possibleCol));
				break;
			}
			else
			  { returnVals.push(games_chess_createPosition(possibleRow, possibleCol)); }
		}
	}

	// King
	if( el.innerHTML == "K" )
	{
		if( (elRow-1) >= 0 && (elCol-1) >= 0 && turn != grid[elRow-1][elCol-1].style.color )
		  { returnVals.push(games_chess_createPosition(elRow-1, elCol-1)); }

		if( (elRow-1) >= 0 && (elCol+0) <= 7 && turn != grid[elRow-1][elCol+0].style.color )
		  { returnVals.push(games_chess_createPosition(elRow-1, elCol+0)); }

		if( (elRow-1) >= 0 && (elCol+1) <= 7 && turn != grid[elRow-1][elCol+1].style.color )
		  { returnVals.push(games_chess_createPosition(elRow-1, elCol+1)); }

		if( (elRow+0) >= 0 && (elCol-1) >= 0 && turn != grid[elRow+0][elCol-1].style.color )
		  { returnVals.push(games_chess_createPosition(elRow+0, elCol-1)); }

		if( (elRow+0) <= 7 && (elCol+1) <= 7 && turn != grid[elRow+0][elCol+1].style.color )
		  { returnVals.push(games_chess_createPosition(elRow+0, elCol+1)); }

		if( (elRow+1) <= 7 && (elCol-1) >= 0 && turn != grid[elRow+1][elCol-1].style.color )
		  { returnVals.push(games_chess_createPosition(elRow+1, elCol-1)); }

		if( (elRow+1) <= 7 && (elCol+0) >= 0 && turn != grid[elRow+1][elCol+0].style.color )
		  { returnVals.push(games_chess_createPosition(elRow+1, elCol+0)); }

		if( (elRow+1) <= 7 && (elCol+1) <= 7 && turn != grid[elRow+1][elCol+1].style.color )
		  { returnVals.push(games_chess_createPosition(elRow+1, elCol+1)); }

		// Castling?
		if( checkForCastle )
		{
			var colorSide;
			if( turn == white )
			  { colorSide = 7; }
			if( turn == black )
			  { colorSide = 0; }

			if( elRow == 3 && elCol == colorSide )
			{
				// check top rook
				if( grid[0][colorSide].innerHTML == "R" && grid[0][colorSide].style.color == turn )
				{
					if(games_chess_checkForCastling(turn, "short", grid))
					  { returnVals.push(games_chess_createPosition(0,colorSide)); }
				}

				// check bottom rook
				if( grid[7][colorSide].innerHTML == "R" && grid[7][colorSide].style.color == turn )
				{
					if(games_chess_checkForCastling(turn, "long", grid))
					  { returnVals.push(games_chess_createPosition(7,colorSide)); }
				}
			}
		}
	}
	return returnVals;
}


function games_chess_cellClicked(el)
{
	var nbsp = games_getNBSP();
	var white, black;
	var colorArray = games_chess_getColors();
	white = colorArray[0];
	black = colorArray[1];

	var status = document.getElementById("games_chess_status");
	var turn = document.getElementById("games_chess_turn");
	var mode = document.getElementById("games_chess_mode");
	var positionSelectedStorage = document.getElementById("games_chess_positionSelectedStorage");
	if( mode.value == "pieceSelected" )
	  { var positionSelected = document.getElementById(positionSelectedStorage.value); }
	var gameOver = document.getElementById("games_chess_gameOver");

	// the last piece that was moved (of any color)
	// for en passant - see Wikipedia "chess" entry
	var lastPiece = document.getElementById("games_chess_lastPiece");
	var lastPieceStart = document.getElementById("games_chess_lastPieceStart");
	var lastPieceEnd = document.getElementById("games_chess_lastPieceEnd");
	var grid = games_chess_setup_board("");


	// bail under certain conditions...
	if( gameOver.value == 1 )
	{
		return;
	}
	// must select a piece of your own color to start a turn
	else if ( mode.value == "startTurn" && el.style.color != turn.value )
	{
		return;
	}
	// cannot take one of your own pieces, unless cancelling your move
	else if ( mode.value == "pieceSelected" && el.style.color == turn.value && el.id != positionSelected.id )
	{
		// another exception is castling
		if( el.innerHTML == "K" && positionSelected.innerHTML == "R" && positionSelected.style.color == turn.value )
		  {}
		else if( el.innerHTML == "R" && positionSelected.innerHTML == "K" && positionSelected.style.color == turn.value )
		  {}
		else
		  { return; }
	}

	if( mode.value == "startTurn" )
	{
		// create the hypothetical board for potential moves
		var modifiedGrid = games_chess_setup_board("dummy");
		var potentialElRow;
		var potentialElCol;
		var elRow = parseInt(el.id.substr(el.id.length-3,1));
		var elCol = parseInt(el.id.substr(el.id.length-1,1));


		var validMoves = games_chess_findValidMoves(el, grid, true);
		if( validMoves.length == 0 )
		  { return; }

		// make sure none of these moves will compromise your king
		var i, j, k;
		for( k=0; k<validMoves.length; k++ )
		{
			potentialElRow = validMoves[k][0];
			potentialElCol = validMoves[k][1];

			// 0) if this validMove is a castling move, then skip this
			// iteration - findValidMoves()/checkForCastle() inherently
			// runs checkForCheck().
			if( turn.value == white )
			{
				if( el.innerHTML == "K" && elRow == 3 && elCol == 7 && (potentialElRow == 0 || potentialElRow == 7) && potentialElCol == 7 )
				  { continue; }
				if( el.innerHTML == "R" && grid[3][7].innerHTML == "K" && (elRow == 0 || elRow == 7) && elCol == 7 && potentialElRow == 3 && potentialElCol == 7 )
				  { continue; }
			}
			if( turn.value == black )
			{
				if( el.innerHTML == "K" && elRow == 3 && elCol == 0 && (potentialElRow == 0 || potentialElRow == 7) && potentialElCol == 0 )
				  { continue; }
				if( el.innerHTML == "R" && grid[3][0].innerHTML == "K" && (elRow == 0 || elRow == 7) && elCol == 0 && potentialElRow == 3 && potentialElCol == 0 )
				  { continue; }
			}

			// 1) set up the hypothetical board for this potential move
			for( i=0; i<8; i++ )
			{
				for( j=0; j<8; j++ )
				{
					modifiedGrid[i][j].innerHTML = grid[i][j].innerHTML;
					modifiedGrid[i][j].style.color = grid[i][j].style.color;
					modifiedGrid.className = "";
				}
			}

			// 2)make the potential move on the copied board
			// 2a) if the piece being moved is a pawn, check to see if we are
			// doing an "en passant".  If so, passively kill the speedy pawn.
			// NOTE: this is coded from a different perspective from the
			// other "en passant" code check (from the pieceSelected mode).
			// In the section here elRow is where our potential piece starts, and
			// potentialElRow is where the piece will end up.
			// In the section below elRow is where the piece will end up, and
			// positionSelected is where the piece started the turn at.
			if( el.innerHTML == "P" && lastPiece.value == "P" )
			{
				var lastPieceStartRow = parseInt(lastPieceStart.value.substr(lastPieceStart.value.length-3,1));
				var lastPieceStartCol = parseInt(lastPieceStart.value.substr(lastPieceStart.value.length-1,1));
				var lastPieceEndRow = parseInt(lastPieceEnd.value.substr(lastPieceEnd.value.length-3,1));
				var lastPieceEndCol = parseInt(lastPieceEnd.value.substr(lastPieceEnd.value.length-1,1));
				if( el.style.color == white )
				{
					if( elCol == 3 && elRow != 0 &&	(elRow-1)==lastPieceStartRow &&
						lastPieceStartCol == 1 && lastPieceEndCol == 3 &&
						potentialElRow == lastPieceStartRow && potentialElCol == 2 )
					{
						modifiedGrid[lastPieceEndRow][lastPieceEndCol].innerHTML = "&nbsp;";
						modifiedGrid[lastPieceEndRow][lastPieceEndCol].style.color = modifiedGrid[lastPieceEndRow][lastPieceEndCol].style.backgroundColor;
					}
					if( elCol == 3 && elRow != 7 &&	(elRow+1)==lastPieceStartRow &&
						lastPieceStartCol == 1 && lastPieceEndCol == 3 &&
						potentialElRow == lastPieceStartRow && potentialElCol == 2 )
					{
						modifiedGrid[lastPieceEndRow][lastPieceEndCol].innerHTML = "&nbsp;";
						modifiedGrid[lastPieceEndRow][lastPieceEndCol].style.color = modifiedGrid[lastPieceEndRow][lastPieceEndCol].style.backgroundColor;
					}
				}
				else if( el.style.color == black )
				{
					if( elCol == 4 && elRow != 0 && (elRow-1)==lastPieceStartRow &&
						lastPieceStartCol == 6 && lastPieceEndCol == 4 &&
						potentialElRow == lastPieceStartRow && potentialElCol == 5 )
					{
						modifiedGrid[lastPieceEndRow][lastPieceEndCol].innerHTML = "&nbsp;";
						modifiedGrid[lastPieceEndRow][lastPieceEndCol].style.color = modifiedGrid[lastPieceEndRow][lastPieceEndCol].style.backgroundColor;
					}
					if( elCol == 4 && elRow != 7 && (elRow+1)==lastPieceStartRow &&
						lastPieceStartCol == 6 && lastPieceEndCol == 4 &&
						potentialElRow == lastPieceStartRow && potentialElCol == 5 )
					{
						modifiedGrid[lastPieceEndRow][lastPieceEndCol].innerHTML = "&nbsp;";
						modifiedGrid[lastPieceEndRow][lastPieceEndCol].style.color = modifiedGrid[lastPieceEndRow][lastPieceEndCol].style.backgroundColor;
					}
				}
			}


			// 2b) make the potential move on the hypothetical board
			modifiedGrid[potentialElRow][potentialElCol].innerHTML = el.innerHTML;
			modifiedGrid[potentialElRow][potentialElCol].style.color = el.style.color;
			modifiedGrid[elRow][elCol].innerHTML = "&nbsp;";
			modifiedGrid[elRow][elCol].style.color = modifiedGrid[elRow][elCol].style.backgroundColor;

			// 2c) (note) In theory, we should forge the lastPiece data, but
			// it is only used by findValidMoves for "en passant" checks.
			// This lack of forging causes games_chess_checkForCheck to possibly
			// count extra valid moves for pawns on rare occasions, but in each
			// case these extra valid moves do not have any bearing on avenues
			// of attack on the King, so we do not have to worry.

			// 3) check to see if this potential move would put our king in check
			if( games_chess_checkForCheck(turn.value, modifiedGrid) )
			{
				validMoves.splice(k,1);
				k--;
			}
		}  // end for()


		// now that we are done finding valid moves, display them to the user
		if( validMoves.length == 0 )
		  { return; }

		// loop through each row/col pair returned by function
		var row;
		var col;
		var i;
		for(i=0; i<validMoves.length; i++)
		{
			row = validMoves[i][0];
			col = validMoves[i][1];
			grid[row][col].className = "games_chess_cell_div_potential_move";
		}
		positionSelectedStorage.value = el.id;
		el.className = "games_chess_cell_div_selected";
		mode.value = "pieceSelected";
	}
	else if( mode.value == "pieceSelected" )
	{
		// check if the move was cancelled
		if( el.id == positionSelected.id && el.style.color == turn.value )
		{
			// start turn over
			var i, j;
			for( i=0; i<8; i++ )
			{
				for( j=0; j<8; j++ )
				{
					// clear the mid-turn highlights
					grid[i][j].className = "";
				}
			}
			positionSelectedStorage.value = "";
			mode.value = "startTurn";
			return;
		}
		// make sure the position clicked is a valid destination
		if( el.className != "games_chess_cell_div_potential_move" )
		  { return; }


		// if the piece being moved is a pawn, check to see if we are
		// doing an "en passant".  If so, passively kill the speedy pawn
		// NOTE: this is coded from a different perspective from the
		// other "en passant" code check (from the startTurn mode).
		// In the section above elRow is where our potential piece starts, and
		// potentialElRow is where the piece will end up.
		// In the section here elRow is where the piece will end up, and
		// positionSelected is where the piece started the turn at.
		if( positionSelected.innerHTML == "P" && lastPiece.value == "P" )
		{
			var elRow = parseInt(el.id.substr(el.id.length-3,1));
			var elCol = parseInt(el.id.substr(el.id.length-1,1));
			var positionSelectedRow = parseInt(positionSelected.id.substr(positionSelected.id.length-3,1));
			var positionSelectedCol = parseInt(positionSelected.id.substr(positionSelected.id.length-1,1));
			var lastPieceStartRow = parseInt(lastPieceStart.value.substr(lastPieceStart.value.length-3,1));
			var lastPieceStartCol = parseInt(lastPieceStart.value.substr(lastPieceStart.value.length-1,1));
			var lastPieceEndRow = parseInt(lastPieceEnd.value.substr(lastPieceEnd.value.length-3,1));
			var lastPieceEndCol = parseInt(lastPieceEnd.value.substr(lastPieceEnd.value.length-1,1));
			if( positionSelected.style.color == white )
			{
				if( positionSelectedCol == 3 && positionSelectedRow != 0 &&
					(positionSelectedRow-1)==lastPieceStartRow &&
					lastPieceStartCol == 1 && lastPieceEndCol == 3 &&
					elRow == lastPieceStartRow && elCol == 2 )
				{
					grid[lastPieceEndRow][lastPieceEndCol].innerHTML = "&nbsp;";
					grid[lastPieceEndRow][lastPieceEndCol].style.color = grid[lastPieceEndRow][lastPieceEndCol].style.backgroundColor;
				}
				if( positionSelectedCol == 3 && positionSelectedRow != 7 &&
					(positionSelectedRow+1)==lastPieceStartRow &&
					lastPieceStartCol == 1 && lastPieceEndCol == 3 &&
					elRow == lastPieceStartRow && elCol == 2 )
				{
					grid[lastPieceEndRow][lastPieceEndCol].innerHTML = "&nbsp;";
					grid[lastPieceEndRow][lastPieceEndCol].style.color = grid[lastPieceEndRow][lastPieceEndCol].style.backgroundColor;
				}
			}
			else if( positionSelected.style.color == black )
			{
				if( positionSelectedCol == 4 && positionSelectedRow != 0 &&
					(positionSelectedRow-1)==lastPieceStartRow &&
					lastPieceStartCol == 6 && lastPieceEndCol == 4 &&
					elRow == lastPieceStartRow && elCol == 5 )
				{
					grid[lastPieceEndRow][lastPieceEndCol].innerHTML = "&nbsp;";
					grid[lastPieceEndRow][lastPieceEndCol].style.color = grid[lastPieceEndRow][lastPieceEndCol].style.backgroundColor;
				}
				if( positionSelectedCol == 4 && positionSelectedRow != 7 &&
					(positionSelectedRow+1)==lastPieceStartRow &&
					lastPieceStartCol == 6 && lastPieceEndCol == 4 &&
					elRow == lastPieceStartRow && elCol == 5 )
				{
					grid[lastPieceEndRow][lastPieceEndCol].innerHTML = "&nbsp;";
					grid[lastPieceEndRow][lastPieceEndCol].style.color = grid[lastPieceEndRow][lastPieceEndCol].style.backgroundColor;
				}
			}
		}


		// if anything moves onto or off of these spots, that means that
		// the the original piece has been been moved (or killed, which is
		// just as good for determining if a castle is allowed with
		// this piece).
		if( el.id == "games_chess_r3c0" || positionSelected.id == "games_chess_r3c0" )
		{
			kMoved = document.getElementById("games_chess_blackKMoved");
			kMoved.value = "1";
		}
		if( el.id == "games_chess_r0c0" || positionSelected.id == "games_chess_r0c0" )
		{
			r1Moved = document.getElementById("games_chess_blackR1Moved");
			r1Moved.value = "1";
		}
		if( el.id == "games_chess_r7c0" || positionSelected.id == "games_chess_r7c0" )
		{
			r2Moved = document.getElementById("games_chess_blackR2Moved");
			r2Moved.value = "1";
		}
		if( el.id == "games_chess_r3c7" || positionSelected.id == "games_chess_r3c7" )
		{
			kMoved = document.getElementById("games_chess_whiteKMoved");
			kMoved.value = "1";
		}
		if( el.id == "games_chess_r0c7" || positionSelected.id == "games_chess_r0c7" )
		{
			r1Moved = document.getElementById("games_chess_whiteR1Moved");
			r1Moved.value = "1";
		}
		if( el.id == "games_chess_r7c7" || positionSelected.id == "games_chess_r7c7" )
		{
			r2Moved = document.getElementById("games_chess_whiteR2Moved");
			r2Moved.value = "1";
		}


		// check to see if this move is a castle
		var castleBlackR1 = false;
		var castleBlackR2 = false;
		var castleWhiteR1 = false;
		var castleWhiteR2 = false;
		if( el.style.color == turn.value && el.style.color == positionSelected.style.color )
		{
			if( turn.value == black )
			{
				if( el.id == "games_chess_r3c0" && positionSelected.id == "games_chess_r0c0" )
				  { castleBlackR1 = true; }
				if( el.id == "games_chess_r0c0" && positionSelected.id == "games_chess_r3c0" )
				  { castleBlackR1 = true; }

				if( el.id == "games_chess_r3c0" && positionSelected.id == "games_chess_r7c0" )
				  { castleBlackR2 = true; }
				if( el.id == "games_chess_r7c0" && positionSelected.id == "games_chess_r3c0" )
				  { castleBlackR2 = true; }
			}
			else if( turn.value == white )
			{
				if( el.id == "games_chess_r3c7" && positionSelected.id == "games_chess_r0c7" )
				  { castleWhiteR1 = true; }
				if( el.id == "games_chess_r0c7" && positionSelected.id == "games_chess_r3c7" )
				  { castleWhiteR1 = true; }

				if( el.id == "games_chess_r3c7" && positionSelected.id == "games_chess_r7c7" )
				  { castleWhiteR2 = true; }
				if( el.id == "games_chess_r7c7" && positionSelected.id == "games_chess_r3c7" )
				  { castleWhiteR2 = true; }
			}
		}

		// actually move the piece(s)
		if( castleBlackR1 )
		{
			lastPiece.value = "K";
			lastPieceStart.value = "games_chess_r3c0";
			lastPieceEnd.value = "games_chess_r1c0";
			grid[1][0].innerHTML = "K";
			grid[1][0].style.color = "black";
			grid[2][0].innerHTML = "R";
			grid[2][0].style.color = "black";
			grid[0][0].innerHTML = "&nbsp;";
			grid[0][0].style.color = grid[0][0].style.backgroundColor;
			grid[3][0].innerHTML = "&nbsp;";
			grid[3][0].style.color = grid[3][0].style.backgroundColor;
			positionSelectedStorage.value = "";
		}
		else if( castleBlackR2 )
		{
			lastPiece.value = "K";
			lastPieceStart.value = "games_chess_r3c0";
			lastPieceEnd.value = "games_chess_r1c0";
			grid[5][0].innerHTML = "K";
			grid[5][0].style.color = "black";
			grid[4][0].innerHTML = "R";
			grid[4][0].style.color = "black";
			grid[7][0].innerHTML = "&nbsp;";
			grid[7][0].style.color = grid[0][0].style.backgroundColor;
			grid[3][0].innerHTML = "&nbsp;";
			grid[3][0].style.color = grid[3][0].style.backgroundColor;
			positionSelectedStorage.value = "";
		}
		else if( castleWhiteR1 )
		{
			lastPiece.value = "K";
			lastPieceStart.value = "games_chess_r3c7";
			lastPieceEnd.value = "games_chess_r1c7";
			grid[1][7].innerHTML = "K";
			grid[1][7].style.color = "white";
			grid[2][7].innerHTML = "R";
			grid[2][7].style.color = "white";
			grid[0][7].innerHTML = "&nbsp;";
			grid[0][7].style.color = grid[0][7].style.backgroundColor;
			grid[3][7].innerHTML = "&nbsp;";
			grid[3][7].style.color = grid[3][7].style.backgroundColor;
			positionSelectedStorage.value = "";
		}
		else if( castleWhiteR2 )
		{
			lastPiece.value = "K";
			lastPieceStart.value = "games_chess_r3c7";
			lastPieceEnd.value = "games_chess_r1c7";
			grid[5][7].innerHTML = "K";
			grid[5][7].style.color = "white";
			grid[4][7].innerHTML = "R";
			grid[4][7].style.color = "white";
			grid[7][7].innerHTML = "&nbsp;";
			grid[7][7].style.color = grid[0][7].style.backgroundColor;
			grid[3][7].innerHTML = "&nbsp;";
			grid[3][7].style.color = grid[3][7].style.backgroundColor;
			positionSelectedStorage.value = "";
		}
		else
		{
			// normal move
			lastPiece.value = positionSelected.innerHTML;
			lastPieceStart.value = positionSelected.id;
			lastPieceEnd.value = el.id;
			el.innerHTML = positionSelected.innerHTML;
			el.style.color = positionSelected.style.color;
			positionSelected.innerHTML = "&nbsp;";
			positionSelected.style.color = positionSelected.style.backgroundColor;
			positionSelectedStorage.value = "";
		}

		mode.value = "startTurn";
		if( turn.value == white )
		{
			status.innerHTML = "Black's turn";
			turn.value = black;
		}
		else
		{
			status.innerHTML = "White's turn";
			turn.value = white;
		}

		if( castleWhiteR1 || castleWhiteR2 || castleBlackR1 || castleBlackR2 )
		  { status.innerHTML = status.innerHTML + "<br/>Castle!"; }


		// if a pawn has moved all the way across the board,
		// convert to another piece - default to Queen for now.
		// Someone might want to promote to a knight, but I
		// simply cannot think of a good way to provide
		// an interface for that...
		var i, j;
		for( i=0; i<8; i++ )
		{
			if( grid[i][0].innerHTML == "P" && grid[i][0].style.color == white )
			{
				grid[i][0].innerHTML = "Q";
				status.innerHTML = status.innerHTML + "<br/>Pawn Promotion!";
			}
			if( grid[i][7].innerHTML == "P" && grid[i][7].style.color == black )
			{
				grid[i][7].innerHTML = "Q";
				status.innerHTML = status.innerHTML + "<br/>Pawn Promotion!";
			}
		}


		// clean up
		var i, j;
		for( i=0; i<8; i++ )
		{
			for( j=0; j<8; j++ )
			{
				// clear the mid-turn highlights
				grid[i][j].className = "";
			}
		}

		if( games_chess_checkForCheck(turn.value, grid) )
		{
			status.innerHTML += "<br/><strong>CHECK</strong>";
		}

		if( games_chess_checkForWinner(grid) )
		{
			gameOver.value = 1;
		}
	}
/*
var debug = "";
var i, j;
for(i=0; i<8; i++)
{
  for( j=0; j<8; j++)
  {
    if( grid[i][j].innerHTML != nbsp )
      { debug += grid[i][j].innerHTML; }
	else
	  { debug += "*"; }
  }
  debug += "\n";
}
alert(debug);
*/
}
function games_chess_r0c0Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r0c1Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r0c2Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r0c3Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r0c4Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r0c5Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r0c6Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r0c7Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r1c0Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r1c1Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r1c2Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r1c3Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r1c4Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r1c5Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r1c6Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r1c7Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r2c0Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r2c1Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r2c2Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r2c3Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r2c4Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r2c5Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r2c6Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r2c7Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r3c0Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r3c1Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r3c2Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r3c3Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r3c4Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r3c5Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r3c6Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r3c7Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r4c0Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r4c1Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r4c2Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r4c3Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r4c4Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r4c5Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r4c6Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r4c7Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r5c0Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r5c1Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r5c2Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r5c3Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r5c4Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r5c5Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r5c6Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r5c7Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r6c0Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r6c1Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r6c2Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r6c3Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r6c4Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r6c5Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r6c6Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r6c7Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r7c0Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r7c1Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r7c2Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r7c3Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r7c4Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r7c5Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r7c6Clicked(el)
{
	games_chess_cellClicked(el);
}
function games_chess_r7c7Clicked(el)
{
	games_chess_cellClicked(el);
}



/*
window.onload = function ()
{
	// set up IE hover
	parseStylesheets();

	// prep chess game
	games_chess_reset();

	// final display prep
	menuSummaryClicked();
}
*/