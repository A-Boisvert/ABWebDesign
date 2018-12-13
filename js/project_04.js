$(document).ready(function(){

	InitializeRoulette();
	CheckWindowSize();

	$(".infoTitle").fitText(1);
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
		
		
		//$('#imageScroll .heightToScroll').css('height', scrollHeightMultiplier * numberOfImages + outerHeight + 'px');
		//scrollBarLimit = parseInt($('#imageScroll .scrollBarPercentLimit').height);
		
		waitForFinalEvent(function(){
			//alert('Resize...');
			
		}, 500, "some unique string");
	});
	
	$('#imageScroll .scrollIndex').mousedown(function() {
		
		$('.scrollWarning').css({'opacity':'1', 'right':'0', 'z-index':'5'});
	
	});
	
	/*$('#details .imgRoulette').mouseenter(function() {
		
		$('#imageScroll .scrollIndex').css('background-color', '#2b2b2b');
	
	});
	
	$('#details .imgRoulette').mouseleave(function() {
		
		$('#imageScroll .scrollIndex').css('background-color', '#6ff0e6');
	
	});*/
	
	$(".info").scroll(function(){
		MatchCustomScrollBar($(this));
	});
	
	$("#belowNavBar").scroll(function(){
		MatchCustomScrollBar($(this));
	});
	
	$("#imageScroll .window .offset").scroll(function(){
		MatchCustomScrollBar($(this));
		MatchImageToScroll();
		$('.scrollWarning').css({'opacity':'0', 'right':'-500%'});
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
var scrollHeightMultiplier;
var scrollBarLimit = 96;

var isBroken = false;

var currentWindowSize = 0;

function AdjustSrcURL (index, directory)
{
	if (index < 10)
	{
		directory.src = folder + imagePrefix + "00" + index + imageSuffix + fileExtension;
	}
	else if (index < 100)
	{
		directory.src = folder + imagePrefix + "0" + index + imageSuffix + fileExtension;
	}
	else 
	{
		directory.src = folder + imagePrefix + index + imageSuffix + fileExtension;
	}
}

function MatchCustomScrollBar (target)
{
	scrollTop = target.scrollTop();
	
	scrollHeight = target.prop('scrollHeight');
	outerHeight = target.outerHeight();
	scrollPercentage = Math.min(Math.round(100 * scrollTop / (scrollHeight - outerHeight)) / 100, 0.95);

	target.find('.customScrollBar').css('top', scrollTop);
	
	//scrollPercentage = Math.round(100 * imageIndex / numberOfImages) / 100;
	target.find('.scrollIndex').css('top', scrollPercentage * scrollBarLimit + "%");
	//target.find('.scrollIndex').css('top', imageIndex / numberOfImages * 100 + "%");
	
	$('.dB3').text("scrollTop: " + scrollTop + " OuterHeight: " + outerHeight + " /  ScrollHeight: " + scrollHeight + " /  percent: " + scrollPercentage + " / 	imgListLength: " + imgListLength + " /	imageIndex: " + imageIndex + " / " + 
	"ScrollBarLimit: " + scrollBarLimit
	);
}

function MatchImageToScroll ()
{
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
	//imageIndex = Math.round(scrollTop / 100) + 1;
}

function InitializeRoulette ()
{
	pageID = $('.ID').text();
	fileExtension = $('.fileExtension').text();
	imagePrefix = $('.imagePrefix').text();
	imageSuffix = $('.imageSuffix').text();
	numberOfImages = parseInt($('.numberOfImages').text()) + 1;
	scrollHeightMultiplier = parseInt($('.imageScrollMultiplier').text());
	scrollBarLimit = 96;
	
	folder = "../../../images/p4/" + pageID + "/";
	$('#imageScroll .heightToScroll').css('height', (100 / scrollHeightMultiplier) * numberOfImages + outerHeight + 'px');
	
	var imgList = [];
	var imgDir = new Image();
	imgListLength = 0;
	
	for	(i = 1; i < numberOfImages; i++)
	{
		AdjustSrcURL(i, imgDir);
		
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
	{
		currentWindowSize = 4;
		scrollBarLimit = 96;
	}
	if ($(window).width() <= 1024)
	{
		currentWindowSize = 3;
		scrollBarLimit = 96;
	}
	if ($(window).width() <= 768)
	{
		currentWindowSize = 2;
		scrollBarLimit = 100;
	}
	if ($(window).width() <= 482)
	{
		currentWindowSize = 1;
		scrollBarLimit = 100;
	}
	
	if ($(".infoBody").css('height') < $(".info").css('height'))
	{
		$(".infoFullStretch .customScrollBar .scrollIndex").css('opacity', '0');
	}
	else
	{
		$(".infoFullStretch .customScrollBar .scrollIndex").css('opacity', '1.0');
	}
	
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