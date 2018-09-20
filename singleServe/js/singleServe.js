
$(document).ready(function(){

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
	
	$(".boardHolder").mouseenter(function() {
		//FirstShuffle();
	});
	
	$(".boardHolder").mouseleave(function() {
		//ShuffleCells();
	});
	
	$(".innerCell, .cellOn, .cellOff").mouseenter(function(){	
		if ($(this).hasClass("cellOff"))
		{
			//$(this).prop("class", "cellOn");
			$(this).removeClass("cellOff");
			$(this).addClass("cellOn");
		}
		else if ($(this).hasClass("cellOn"))
		{
			//$(this).prop("class", "cellOff");
			$(this).removeClass("cellOn");
			$(this).addClass("cellOff");
		}
		
		var onCells = $(".cellOn");
		var offCells = $(".cellOff");
		
		//$(".debug").text("Off: " + offCells.length + " On: " + onCells.length);
	});
	
	$(".innerCell").click(function(){
		return false;			// to do: disable left click? The game can be cheated with quick click + drag
	});
	
});

function FirstShuffle() {
		var cells = $(".innerCell");

		var i;
		for (i = 0; i < cells.length; ++i) {
			$(cells[i]).prop("class", "cellOff");
		}
		
		var randNum = Math.floor(Math.random() * 300) + 250  
		
		var randomCells = getRandomArrayElements(cells, randNum);
		
		var j;
		for (j = 0; j < randomCells.length; ++j) {
			$(randomCells[j]).prop("class", "cellOn");
		}
		
		//$(".debug").text("Total cells: " + cells.length + " Randomly Set On: " + randNum);
		
		//$('.innerCell').prop("class", "cellOff");
}

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
}

function SwitchCell() {
	
	//$(this).toggleClass("cellOff cellOn");
	
	if($(this).hasClass("cellOff"))
	{
		$(this).removeClass("cellOff");
		$(this).addClass("cellOn");
	}
	if($(this).hasClass("cellOn"))
	{
		$(this).removeClass("cellOn");
		$(this).addClass("cellOff");	
	}
	
	var onCells = $(".cellOn");
	var offCells = $(".cellOff");
	
	$(".debug").text("Off: " + offCells.length + " On: " + onCells.length);
}

function ColorSchemeSwap() {
	var r = Math.floor(156 * Math.random() + 50);
	var g = Math.floor(100 * Math.random() + 50);
	var b = Math.floor(156 * Math.random() + 50);
	var color = 'rgb(' + r + ',' + g + ',' + b + ')';
	//alert(r +" " + g + " " + b);
	//alert(color.color);
	
	$(".cellOff").prop("background-color", "red");
	//$("body").css("background-color", color);
	//$(".boardHolder").css("background-color", color);
	//$(".innerCell").css("background-color", color);
	//$(".cellOff").css("background-color", color);
	//$(".cellOn").css("background-color", "red");
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