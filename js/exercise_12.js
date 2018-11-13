$(document).ready(function(){

	SetBotValues();

	$(document).mousemove(function( event ) 
	{
		UpdateColor();
	});
	
	$(document).click(function()
	{
		h += 1;
		if (h > 3)
		{
			h = 1;
		}
	});
	
	$('.container').click(function()
	{
		//ResetHeights();
	});

	$('.boxBase').on({
	
		mouseenter: function(){
			$(this).css({"bottom":"15vh", "border":"solid 2px white"});
		},
		
		mouseleave: function(){
			ResetBotValues();
			$(this).css({"border":"solid 2px black"});
		},
		
		click: function(){
			ResetHeights();
			$(this).css({"height":"160vh"});
			$(this).find('a').removeClass("linkOff");
			
		}
		
		
	});
	
});

var bot1, bot2, bot3, bot4, bot5;
var index1, index2, index3, index4, index5;
var hexX, hexY;
var h = 1;
var currColor = 'rgb(50,50,50)';
var currRGB = 0;
var r = 0, g = 0, b = 0;
var stepSize = 25;

function UpdateColor()
{
	hexX = Math.round(event.pageX / $(window).width() * 255);
	hexY = Math.round(event.pageY / $(window).height() * 255);
		
	$( "#log" ).text( "pageX: " + event.pageX + ", pageY: " + event.pageY + ", windowWidth: " + $(window).width() + ", windowHeight: " + $(window).height() + ", hexX: " + hexX + ", hexY: " + hexY + " hValue: " + h + " currCol: " + currColor + " currRGB: " + r + "," + g + "," + b);
	
	currColor = $('.container').css('background-color');
	currRGB = getRGBValues(currColor);

	$('.container').css('background-color', 'rgb(' + (hexX + 20) + ',' + 0 + ',' + (hexY + 20) + ')');	
	
	$('.box1').css('background-color', 'rgb(' + (hexX + stepSize) + ',' + (hexX + stepSize) + ',' + (hexX + stepSize) + ')');

	$('.box2').css('background-color', 'rgb(' + (hexX + 1.5*stepSize) + ',' + (hexX + 1.5*stepSize) + ',' + (hexX + 1.5*stepSize) + ')');	
	
	$('.box3').css('background-color', 'rgb(' + (hexX + 2*stepSize) + ',' + (hexX + 2*stepSize) + ',' + (hexX + 2*stepSize) + ')');
	
	$('.box4').css('background-color', 'rgb(' + (hexX + 2.5*stepSize) + ',' + (hexX + 2.5*stepSize) + ',' + (hexX + 2.5*stepSize) + ')');
	
	$('.box5').css('background-color', 'rgb(' + (hexX + 3*stepSize) + ',' + (hexX + 3*stepSize) + ',' + (hexX + 3*stepSize) + ')');



	//$('.container').css('background-color', rgb());
}

// gotten from https://stackoverflow.com/questions/34980574/how-to-extract-color-values-from-rgb-string-in-javascript
function getRGBValues(str) {
  var vals = str.substring(str.indexOf('(') + 1, str.length -1).split(', ');
  r = vals[0];
  g = vals[1];
  b = vals[2];
}

function SetBotValues() 
{
	bot1 = $('.box1').css('bottom');
	bot2 = $('.box2').css('bottom');
	bot3 = $('.box3').css('bottom');
	bot4 = $('.box4').css('bottom');
	bot5 = $('.box5').css('bottom');
}

function ResetBotValues(target) 
{

	$('.box1').css('bottom', bot1);
	$('.box2').css('bottom', bot2);
	$('.box3').css('bottom', bot3);
	$('.box4').css('bottom', bot4);
	$('.box5').css('bottom', bot5);
}

function ResetHeights()
{
	$('.box1, .box2, .box3, .box4, .box5').css('height', '70vh');
	$('.box1 a, .box2 a, .box3 a, .box4 a, .box5 a').removeClass('linkOff');
	$('.box1 a, .box2 a, .box3 a, .box4 a, .box5 a').addClass('linkOff');
}
