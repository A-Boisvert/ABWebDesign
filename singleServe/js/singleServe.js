
$(document).ready(function(){

	var OnColor;
	var OffColor;

	ColorSchemeSwap();
	ShuffleCells();

	$(".boardHolder").mouseenter(function(){
		$(document).bind("contextmenu",function(e){
			//return false;
		});
	});
	
	$(".button1").click(function(){
		CheckerBoard();
		ColorSchemeSwap();
	});
	
	$(".button2").click(function(){
		ShuffleCells();
		ColorSchemeSwap();
	});
	
	$(".boardHolder").mouseleave(function() {
		//ShuffleCells();
	});
	
	$(".innerCell, .cellOn, .cellOff").mouseenter(function(){	
		SwitchCell($(this));
	});
	
	$(".innerCell").click(function(){
		return false;			// to do: disable left click? The game can be cheated with quick click + drag
	});
	
});

function ShuffleCells() {
	var cells = $(".innerCell, .cellOn, .cellOff");
	var OnCells = $(".cellOn");
	
	var i;
	for (i = 0; i < cells.length; ++i) {
		$(cells[i]).removeClass("cellOn");
		$(cells[i]).addClass("cellOff");
	}
	
	//$(".debug").text("On Cells: " + OnCells.length);
	
	var randNum = Math.floor(Math.random() * 300) + 250  
	
	var randomCells = getRandomArrayElements(cells, randNum);
	
	var j;
	for (j = 0; j < randomCells.length; ++j) {
		//$(randomCells[j]).prop("class", "cellOn");
		$(randomCells[j]).removeClass("cellOff");
		$(randomCells[j]).addClass("cellOn");
	}
	
	//$(".debug").text("Total cells: " + cells.length + " Randomly Set On: " + randNum);
	
	//$('.innerCell').prop("class", "cellOff");
	
	ColorUpdate();
}

function CheckerBoard () {
	var bibble = 
	$(".row:nth-child(even) .cell:nth-child(odd) .innerCell:nth-child(even), .row:nth-child(odd) .cell:nth-child(odd) .innerCell:nth-child(odd), .row:nth-child(odd) .cell:nth-child(even) .innerCell:nth-child(even), .row:nth-child(even) .cell:nth-child(even) .innerCell:nth-child(odd)")
	
	var allCells = $(".innerCell");
	
	var notBibble = 
	$(".row:nth-child(even) .cell:nth-child(odd) .innerCell:nth-child(odd), .row:nth-child(odd) .cell:nth-child(odd) .innerCell:nth-child(even), .row:nth-child(odd) .cell:nth-child(even) .innerCell:nth-child(odd), .row:nth-child(even) .cell:nth-child(even) .innerCell:nth-child(even)")
	
	var i;
	for (i = 0; i < allCells.length; ++i) {
		//$(bibble[i]).prop("class", "cellOff");
		$(allCells[i]).removeClass("cellOff cellOn");
		$(allCells[i]).addClass("cellOff");
		//$(bibble[i]).css("background-color", color);			to do: get this working
	}
	for (i = 0; i < notBibble.length; ++i) {
			//$(notBibble[i]).prop("class", "cellOn");
			$(notBibble[i]).removeClass("cellOff cellOn");
			$(notBibble[i]).addClass("cellOn");
		}
		
	ColorUpdate();
}

function SwitchCell(target) {
	
	//$(this).toggleClass("cellOff cellOn");
	
	if (target.hasClass("cellOff"))
	{
		//$(this).prop("class", "cellOn");
		target.removeClass("cellOff");
		target.addClass("cellOn");
		//$(this).css("background-color", OnColor);
	}
	else if (target.hasClass("cellOn"))
	{
		//$(this).prop("class", "cellOff");
		target.removeClass("cellOn");
		target.addClass("cellOff");
		//$(this).css("background-color", OffColor);
	}
		
	var onCells = $(".cellOn");
	var offCells = $(".cellOff");
	
	//$(".debug").text("Off: " + offCells.length + " On: " + onCells.length);
	
	ColorUpdate();
}

function ColorSchemeSwap() {
	var r1 = Math.floor(128 * Math.random());
	var g1 = Math.floor(128 * Math.random());
	var b1 = Math.floor(128 * Math.random());
	
	var r2 = Math.floor(128 * Math.random() + 128);
	var g2 = Math.floor(128 * Math.random() + 128);
	var b2 = Math.floor(128 * Math.random() + 128);
	
	OnColor = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')';
	OffColor = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';

	ColorUpdate();
}

function ColorUpdate() {
	$(".button1 p, .button2 p").css("color", OnColor);
	$(".button1, .button2, .cellOn").css("background-color", OnColor);
	$("body, .cellOff, .row").css("background-color", OffColor);
}

function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}