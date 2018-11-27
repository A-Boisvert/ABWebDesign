$(document).ready(function(){
	
	colorA = GetRandomColor();
	colorB = GetRandomColor();
	SetRandomColor($('#a'), colorA);
	SetRandomColor($('#b'), colorB);
	
	AddMixColors();
	
	$(".debugBox").css("background-color", solutionString);
	
	// Gotten from https://stackoverflow.com/questions/14806200/disable-some-characters-from-input-field
	$("input").keypress( function(e) 
	{
		var chr = String.fromCharCode(e.which);
		if ("#abcdefABCDEF0123456789".indexOf(chr) < 0)
			return false;
	});
	
	// Gotten from https://stackoverflow.com/questions/477691/submitting-a-form-by-pressing-enter-without-a-submit-button
    $('input').each(function() 
	{
        $(this).keypress(function(e) 
		{
            // Enter pressed?
            if(e.which == 10 || e.which == 13) 
			{
				userInputString = $('input').val().toUpperCase();
				console.log("color input: " + userInputString);
				
				Grade();
            }
        });

        $(this).find('input[type=submit]').hide();
    });
	
});

var colorA, colorB, solutionInt, solutionString = '#';
var userInputString = "#";
var intListA = [0, 0, 0, 0, 0, 0, 0];
var intListB = [0, 0, 0, 0, 0, 0, 0];
var wrongCounter = 0;

function AddMixColors()
{
	for (var i = 0; i < colorA.length; i++) 
	{
		var currCharA = colorA.charAt(i);
		
		if (isLetter(currCharA))
		{
			//console.log(currCharA + " is a Letter!");
			AlphaToNumerical(true, currCharA, i);
		}
		
		else if (isNumber(currCharA))
		{
			//console.log(currCharA + " is a Number!");
			intListA[i] = currCharA;
		}
		
		//console.log("int List A (Run " + (i + 1) + "): " + intListA);
	}
	
	//console.log("int List A (Run " + (i) + "): " + intListA);
	
	for (var j = 0; j < colorB.length; j++) 
	{
		var currCharB = colorB.charAt(j);
		
		if (isLetter(currCharB))
		{
			//console.log(currCharB + " is a Letter!");
			AlphaToNumerical(false, currCharB, j);
		}
		
		else if (isNumber(currCharB))
		{
			//console.log(currCharB + " is a Number!");
			intListB[j] = currCharB;
		}
		
		//console.log("int List B (Run " + (j + 1) + "): " + intListB);
	}
	
	//console.log("int List B (Run " + (j) + "): " + intListB);
	
	solutionInt = AddIntLists(intListA, intListB);
	//console.log(solutionInt);
	
	for (var k = 1; k < solutionInt.length; k++) 
	{
		var currInt = solutionInt[k];
		
		NumericalToAlpha(currInt, k);
		
		//console.log("solution Int (Run " + (k + 1) + "): " + currInt);
	}
	
	console.log("solution string: " + solutionString);
}

function Grade()
{
	//console.log("user entered: " + userInputString + " vs. " + solutionString + " wrong counter: " + wrongCounter);
	console.log("user entered: " + userInputString);
	
	if (userInputString == solutionString)
	{
		$('#c').css('background-color', solutionString);
		$('#c').css({'border-style':'solid','border-width':'0', 'border-color':'green'});
		$('body').css('background-color', '#227722');
		$('.hint').text("Nice work!");
		wrongCounter = 0;
	}
	else
	{
		$('#c').css('background-color', userInputString);
		$('#c').css({'border-style':'solid','border-width':'1vh', 'border-color':'red'});
		$('body').css('background-color', '#772222');
		wrongCounter = wrongCounter + 1;
		
		switch(wrongCounter)
		{
			case 1:
			$('.hint').text("Hint 1/4: This is additive blending which can be achieved by dividing the sum of two colors by 2. When dealing with fractions, round down for this site.");
			break;
			
			case 2:
			$('.hint').append("<br><br>Hint 2/4: The letters of these Hexadecimal colors could be considered 'overflows' of the numbers. In the terms of math, 'A' can be considered as '10', etc.");
			break;
			
			case 3:
			$('.hint').append("<br><br>Hint 3/4: Right Click > Inspect > Click Console Tab > Copy the 'solutionString' for the answer<br>The next hint will just be the answer");
			break;
			
			case 4:
			$('.hint').append("<br><br>Hint 4/4: " + solutionString);
			break;
			
			case 5:
			$('.hint').append("<br><br>The answer is: " + solutionString);
			break;
		}
	}
}

function AddIntLists(list1, list2)
{
	var sum = [0, 0, 0, 0, 0, 0, 0];
	
	for (var g = 0; g < sum.length; g++) 
	{
		sum[g] = Math.floor((parseInt(list1[g]) + parseInt(list2[g])) / 2);
		//console.log("sum: " + sum[g] + " / 1: " + list1[g] + " / 2: " + list2[g]);
	}
	
	return sum;
}

function AlphaToNumerical(isListA, inputChar, index)
{
	var pointIndex;
	
	if (isListA == true)
	{
		pointIndex = intListA[index];
	}
	else
	{
		pointIndex = intListB[index];
	}
	
	switch(inputChar)
	{
	case 'A':
	pointIndex = 10;
	break;
	
	case 'B':
	pointIndex = 11;
	break;
	
	case 'C':
	pointIndex = 12;
	break;
	
	case 'D':
	pointIndex = 13;
	break;
	
	case 'E':
	pointIndex = 14;
	break;
	
	case 'F':
	pointIndex = 15;
	break;
	}
	
	if (isListA == true)
	{
		intListA[index] = pointIndex;
	}
	else
	{
		intListB[index] = pointIndex;
	}
}

function NumericalToAlpha(inputInt, index)
{
	if (inputInt >= 10)
	{
		switch(inputInt)
		{
		case 10:
		solutionString += 'A';
		break;
		
		case 11:
		solutionString += 'B';
		break;
		
		case 12:
		solutionString += 'C';
		break;
		
		case 13:
		solutionString += 'D';
		break;
		
		case 14:
		solutionString += 'E';
		break;
		
		case 15:
		solutionString += 'F';
		break;
		}
	}
	else
		solutionString += inputInt.toString();
	
}

// Gotten from https://stackoverflow.com/questions/9862761/how-to-check-if-character-is-a-letter-in-javascript
function isLetter(str) 
{
  return str.length === 1 && str.match(/[a-f]/i);
}

function isNumber(str) 
{
  return str.length === 1 && str.match(/[0-9]/i);
}

//Gotten from https://stackoverflow.com/questions/1484506/random-color-generator
function GetRandomColor() 
{
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function SetRandomColor(target, colorString) 
{
	//console.log("random col: " + colorString + " sib: " + target.parent().next().children().text());
	target.parent().next().children().text(colorString);
	target.css("background-color", colorString);
}
