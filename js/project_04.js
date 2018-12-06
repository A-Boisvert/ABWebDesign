$(document).ready(function(){

	$(".title").fitText(0.5);
	
	$(window).resize(function() {
		
		
		waitForFinalEvent(function(){
			//alert('Resize...');
			
		}, 500, "some unique string");
	});
	
	$(".details").scroll(function(){
		console.log("ggg");
	});
	
	
	$(".mobile, .tablet, .dekstop, .largeDesktop").click(function()
	{
		console.log('current Offset is ' + currentShift);
	});
	
});

var currentWindowSize = 0;


function CheckBackStem ()
{
	
}

function CheckWindowSize()
{
	if ($(window).width() > 1024)
		currentWindowSize = 4;
	else if ($(window).width() <= 1024)
		currentWindowSize = 3;
	if ($(window).width() <= 768)
		currentWindowSize = 2;
	if ($(window).width() <= 482)
		currentWindowSize = 1;
	
	//$('.debugBlock').text(' ' + currentWindowSize);
	
	AdjustWindowSensitiveVariables();
}

function AdjustWindowSensitiveVariables()
{
	switch (currentWindowSize){
		
		case 1:
			
		break;
		
		case 2:
			
		break;
		
		case 3:
			
		break;
		
		case 4:
			
		break;
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