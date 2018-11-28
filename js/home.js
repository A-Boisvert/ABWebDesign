$(document).ready(function(){
	
	$(".block").click(function() {
		
		UnClick($(".clicked"));
		$(".clicked").removeClass(".clicked");
		
		Click($(this));
		
		console.log("clicked");
		
		
	});
	
});

function Click(target)
{
	target.css('background-color', '#295499');
	target.css('height', '30vh');
	target.find("div").children().css('display', 'block');
	
	target.addClass("clicked");
}

function UnClick (target)
{
	//console.log("mouse left");
		
	target.css('background-color', '#2b2b2b');
	target.css('height', '10vh');
	
	target.find("div").children().css('display', 'none');
		
	target.removeClass(".clicked");
}