$(document).ready(function(){

	var OnColor;

	//ColorSchemeSwap();
	//ShuffleCells();
	
	$(window).resize(function() {
		$('.postSpread').css('transition', 'all 0s linear');
		
		waitForFinalEvent(function(){
			//alert('Resize...');
			$('.postSpread').css('transition', 'all .5s ease-out');
		}, 500, "some unique string");
	});

	
	$(".hambu").mouseenter(function(){
		$(document).bind("contextmenu",function(e){
			//return false;
		});
	});
	
	$(".hamburger").click(function(){
		navToggle = !navToggle;
		console.log('navToggle is ' + navToggle);
		ExpandNavBar();
	});
	
	$(".dot").click(function(){
		ChooseShift($(this));
	});
	
	$(".boardHolder").mouseleave(function() {
		//ShuffleCells();
	});
	
});

var navToggle = false;

var currentShift = {
        OneLeft: -1,
        Center: 0,
		OneRight: 1,
		TwoRight: 2
};

var startingSpreadRight = -66;
var currentSpreadRight = startingSpreadRight;
var stepSize = 65;

function ExpandNavBar() {
	
	if (navToggle)
	{
		$('.navBar').css('height', '90vh');
		$('.navBar .navBarStem').css('top', '5%');
		$('.container').css('top', '90vh');
	}
	else
	{
		$('.navBar').css('height', '10vh');
		$('.navBar .navBarStem').css('top', '80%');
		$('.container').css('top', '10vh');
	}
	
}

function ChooseShift(objectClicked) {
	console.log('shifting left: ' + currentSpreadRight);
		
		if (objectClicked.hasClass("right"))
		{
			Shift(1);	
		}
		else if (objectClicked.hasClass("left"))
		{
			Shift(-1);
		}
		
		objectClicked.toggleClass("right left");
}

function Shift (direction) {
	$('.postSpread').css('right', currentSpreadRight + (direction * stepSize) + 'vw');
	currentSpreadRight += stepSize * direction;
}

// gotten from https://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed
var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

function SwitchCell(target) {
	
}

function ColorSchemeSwap() {
	
}

function ColorUpdate() {
	
}