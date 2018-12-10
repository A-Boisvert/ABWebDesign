$(document).ready(function(){

	InitializeRoulette();

	$(".infoTitle").fitText(0.5);
	$('.dB2').text(' ' + currentWindowSize + " - " + $(window).width());
	
	/*$(window).bind('mousewheel DOMMouseScroll', function(event){
    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
		
		// scrolling up
    }
    else
	{
		// down
    }
	});*/
	
	window.setInterval(function(){
		// something
	}, 500);
	
	$(window).resize(function() {
		
		CheckWindowSize();
		
		waitForFinalEvent(function(){
			//alert('Resize...');
			
		}, 500, "some unique string");
	});
	
	$(".info").scroll(function(){
		SetScrollBar($(this));
	});
	
	$("#belowNavBar").scroll(function(){
		SetScrollBar($(this));
	});
	
	$(".mobile, .tablet, .dekstop, .largeDesktop").click(function()
	{
		console.log('current Offset is ' + currentShift);
	});

	
});

var scrollTop;
var scrollHeight = 0;
var outerHeight = 0;
var scrollPercentage = 0;

var imgListLength = 0;
var imageIndex = 0;

var pageID;
var fileExtension;
var imagePrefix;
var imageSuffix;
var folder;
var numberOfImages;

var isBroken = false;

var currentWindowSize = 0;

function SetScrollBar (target)
{
	scrollTop = target.scrollTop();
	
	scrollHeight = target.prop('scrollHeight');
	outerHeight = target.outerHeight();
	scrollPercentage = Math.min(scrollTop / (scrollHeight - outerHeight), 0.95);

	$('.customScrollBar').css('top', scrollTop);
	
	$('.scrollIndex').css('top', scrollPercentage * 100 + "%");
	
	$('.dB3').text("scrollTop: " + scrollTop + " OuterHeight: " + outerHeight + " /  ScrollHeight: " + scrollHeight + " /  percent: " + scrollPercentage + " / 	imgListLength: " + imgListLength + " /	imageIndex: " + imageIndex
	);
	
	if (imageIndex < 10)
	{
		$('.imgRoulette img').attr(
		'src', 
		folder + imagePrefix + "00" + imageIndex + imageSuffix + fileExtension);
	}
	else if (imageIndex < 100)
	{
		$('.imgRoulette img').attr(
		'src', 
		folder + imagePrefix + "0" + imageIndex + imageSuffix + fileExtension);
	}
	else
	{
		$('.imgRoulette img').attr(
		'src', 
		folder + imagePrefix + imageIndex + imageSuffix + fileExtension);
	}
	
	imageIndex = Math.round(scrollPercentage * imgListLength + 1);
}

function InitializeRoulette ()
{
	pageID = $('.ID').text();
	fileExtension = $('.fileExtension').text();
	imagePrefix = $('.imagePrefix').text();
	imageSuffix = $('.imageSuffix').text();
	numberOfImages = parseInt($('.numberOfImages').text()) + 1;
	
	folder = "../../../images/p4/" + pageID + "/";
	
	var imgList = [];
	var imgDir = new Image();
	imgListLength = 0;
	
	for	(i = 1; i < numberOfImages; i++)
	{
		if (i < 10)
		{
			imgDir.src = folder + imagePrefix + "00" + i + imageSuffix + fileExtension;
		}
		else if (i < 100)
		{
			imgDir.src = folder + imagePrefix + "0" + i + imageSuffix + fileExtension;
		}
		else 
		{
			imgDir.src = folder + imagePrefix + i + imageSuffix + fileExtension;
		}
		
		checkImage(imgDir.src, 
		function(){ AddToLength(); }, 
		function(){ SetBroken(); } 
		);
		
		if (isBroken)
		{
			break;
		}
		
		//console.log("run #" + i + " imgSrc: " + imgDir.src + " broken? - " + isBroken);
		
	}
	
	/*console.log(
	"page ID: " + pageID + " / " + 
	"folder: " + folder + " / " + 
	"imgList: " + imgList + " / " + 
	"imgList.length: " + imgList.length + " / " + 
	"imageIndex: " + imageIndex + " / " +
	"imageListLength: " + imgListLength
	);*/
}

function SetBroken ()
{
	console.log("broken set");
	isBroken = true;
}

function AddToLength ()
{
	imgListLength++;
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
	
	$('.dB2').text(currentWindowSize + " - " + $(window).width());
	
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

// gotten from https://stackoverflow.com/questions/18837735/check-if-image-exists-on-server-using-javascript
function checkImage(imageSrc, good, bad) {
    var img = new Image();
    img.onload = good; 
    img.onerror = bad;
    img.src = imageSrc;
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