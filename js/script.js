//set up global variables
var keys = document.getElementsByClassName("key");
var display = document.getElementById("display_result_inline");
var keyCode = 0;
var key = '';
var firstNum = 0;
var secondNum = 0;
var operator = '';

for (var i = 0; i < keys.length; i++) {
	keys[i].addEventListener("click", function() {
		//when a button is clicked, activate shadow effect
		var elem = this;
		removeBoxShadow(elem);
		setTimeout(function(){ setBoxShadow(elem); }, 200);
		
		//set keyCode to visible contents of the button to directly
		//get either the ASCII code of number or the operator clicked
		keyCode = this.innerHTML.charCodeAt(0);
		mainEvent(false);
	});
}

function removeBoxShadow(div){
	div.style.boxShadow = "none";
}

function setBoxShadow(div) {
	div.style.boxShadow = "2px 2px 5px 2px orange";
}

function isNumber() {
	return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].findIndex(function(arg) { return arg == key; }) != -1;
}

function isOperator() {
	return ['+', '-', '*', '/'].findIndex(function(arg) { return arg == key; }) != -1;
}

//Returns the result of the computation based on the three global variables
function getResult() {
	switch (operator) {
	case '+':
		return firstNum + secondNum;
		break;
	case '-':
		return firstNum - secondNum;
		break;
	case '*':
		return firstNum * secondNum;
		break;
	case '/':
		return firstNum / secondNum;
		break;
	}
}

//Every keypress will fire mainEvent with keyPressed defaulting to true
document.addEventListener("keypress", mainEvent);

function mainEvent(keyPressed = true) {
	//If the function is called from the document's event listener, keyCode will be set to the window event's key code
	if (keyPressed)
		keyCode = (window.event.keyCode || window.event.which);
	
	//key is derived from the key keycode. toUpperCase is called to turn 'e' to 'E' and 'u' to 'U'
	key = String.fromCharCode(keyCode).toUpperCase();
	
	if (isNumber()) { //if key holds a numeric value...
		if (firstNum == 0) {
			//if firstNum doesn't have a value yet, set it
			firstNum = parseInt(key);
			display.innerHTML = firstNum;
		} else if (operator == '' && secondNum == 0) {
			//If firstNum has a value and operator doesn't and secondNum doesn't,
			//the user is adding a digit to firstNum
			firstNum *= 10;
			firstNum += parseInt(key);
			display.innerHTML = firstNum;
		} else if (operator != '' && secondNum == 0) {
			//If firstNum and operator have values but secondNum doesn't, set secondNum
			secondNum = parseInt(key);
			display.innerHTML = firstNum + " " + operator + " " + secondNum + " = " + getResult();
		} else if (firstNum != 0 && operator != '' && secondNum != 0) {
			//If all three have values, user is adding a digit to secondNum
			secondNum *= 10;
			secondNum += parseInt(key);
			display.innerHTML = firstNum + " " + operator + " " + secondNum + " = " + getResult();
		}
	} else if (isOperator()) { //if key holds an operator...
		operator = key;
		if (firstNum != 0 && secondNum == 0) //firstNum has value and secondNum doesn't so set the operator
			display.innerHTML = firstNum + " " + operator;
		else if (firstNum != 0 && operator != '' && secondNum != 0) //all three have value, switch operator and get new value
			display.innerHTML = firstNum + " " + operator + " " + secondNum + " = " + getResult();
	} else if (key == 'E') { //reset output
		firstNum = 0;
		secondNum = 0;
		operator = '';
		display.innerHTML = "Result";
	} else if (key == 'U') { //user is trying to undo
		if (firstNum != 0 && operator != '' && secondNum != 0) { //if all three have values...
			secondNum = Math.floor(secondNum / 10); //remove digit from secondNum
			if (secondNum == 0) //if secondNum was 1 digit, it's now 0. remove it from output
				display.innerHTML = firstNum + " " + operator;
			else //otherwise, get new result
				display.innerHTML = firstNum + " " + operator + " " + secondNum + " = " + getResult();
		} else if (firstNum != 0 && operator != '') { //if firstNum and operator have values...
			//reset operator and remove it from output
			operator = '';
			display.innerHTML = firstNum;
		} else { //if operator and secondNum both don't have values...
			firstNum = Math.floor(firstNum/10); //remove digit from firstNum
			if (firstNum == 0) //if it was 1 digit, it's now 0. remove it from output
				display.innerHTML = "Result";
			else //otherwise, display firstNum
				display.innerHTML = firstNum;
		}
		// change result by clicking on ["+", "-", "*", "/"] operators
		if(["+", "-", "*", "/"].indexOf(pressed_key) != -1) {
			switch(pressed_key) {
				case "+":
					result=firstNo+secondNo;
					break;
				case "-":
					result=firstNo-secondNo;
					break;
				case "/":
					if(secondNo != 0) result=firstNo/secondNo;
					break;
				case "*":
					result=firstNo*secondNo;
					break;
			}
			display.innerHTML=firstNo + " " + pressed_key + " " + secondNo + " = " + result;
		}
	}
}
