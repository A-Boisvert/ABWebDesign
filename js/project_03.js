// gotten from https://stackoverflow.com/questions/22678482/disable-horizontal-scroll-but-allow-vertical-scroll/29431155
$(function() {

    var $body = $(document);
    $body.bind('scroll', function() {
        // "Disable" the horizontal scroll.
        if ($body.scrollLeft() !== 0) {
            $body.scrollLeft(0);
        }
    });

}); 

$(document).ready(function(){

	currentShift = 0;
	CheckBackStem();

	$(window).resize(function() {
		$('.ThreePostHolder, .postSpreadGap').css('transition', 'all 0s linear');
		
		waitForFinalEvent(function(){
			//alert('Resize...');
			$('.ThreePostHolder, .postSpreadGap').css('transition', 'all .5s ease-out');
		}, 500, "some unique string");
	});
	
	$(".hamburger").click(function(){
		navToggle = !navToggle;
		console.log('navToggle is ' + navToggle);
		ExpandNavBar();
	});
	
	$(".dot").click(function(){
		ChooseShift($(this));
	});
	
	$(".mobile, .tablet, .dekstop, .largeDesktop").click(function()
	{
		console.log('current Offset is ' + currentShift);
	});
	
});

var navToggle = false;

var currentShift = 0;

var startingSpreadRight = -66;
var currentSpreadRight = startingSpreadRight;
var stepSize = 65;

function ExpandNavBar() {
	
	if (navToggle)
	{
		$('.fixedNavigationBar').css('height', '90vh');
		$('.fixedNavigationBar .fixedNavigationBarStem').css('top', '5%');
		$('.contentBelowNavigationBar').css({'top':'90vh', 'height':'10vh'});
	}
	else
	{
		$('.fixedNavigationBar').css('height', '10vh');
		$('.fixedNavigationBar .fixedNavigationBarStem').css('top', '80%');
		$('.contentBelowNavigationBar').css({'top':'10vh', 'height':'90vh'});
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
	$('.ThreePostHolder, .spaceBetweenThreePostHolders').css('right', currentSpreadRight + (direction * stepSize) + 'vw');
	currentSpreadRight += stepSize * direction;
	currentShift += direction;

	CheckBackStem();
}

function CheckBackStem ()
{
	
	if (currentShift != 0) //clicking off of 0
	{
		$('.backStem').css({'width':'0vh', 'transition':'all .1s cubic-bezier(1,.01,1,.01)'});		// og is 0
		$('.stemVertical').css('width', '1vh');
	}
	else	//shifting back to 0
	{
		$('.backStem').css({'width':'1vh', 'transition':'all .2s cubic-bezier(1,.01,1,.01) .2s'});
		$('.stemVertical').css('width', '0vh');
	}
	
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