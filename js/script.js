var keys = document.getElementsByClassName("key");
var display = document.getElementById("display_result_inline");
var keyCode = 0;
var key = '';
var firstNum = 0;
var secondNum = 0;
var operator = '';

for (var i = 0; i < keys.length; i++) {
	keys[i].addEventListener("click", function() {
		var elem = this;
		removeBoxShadow(elem);
		setTimeout(function(){ setBoxShadow(elem); }, 200);
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
	return ['', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].findIndex(function(arg) { return arg == key; }) > 0;
}

function isOperator() {
	return ['', '+', '-', '*', '/'].findIndex(function(arg) { return arg == key; }) > 0;
}

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

document.addEventListener("keypress", mainEvent);

function mainEvent(keyPressed = true) {
	if (keyPressed)
		keyCode = (window.event.keyCode || window.event.which);
	
	key = String.fromCharCode(keyCode).toUpperCase();
	
	if (isNumber()) {
		if (firstNum == 0) {
			firstNum = parseInt(key);
			display.innerHTML = firstNum;
		} else if (operator == '' && secondNum == 0) {
			firstNum *= 10;
			firstNum += parseInt(key);
			display.innerHTML = firstNum;
		} else if (operator != '' && secondNum == 0) {
			secondNum = parseInt(key);
			display.innerHTML = firstNum + " " + operator + " " + secondNum + " = " + getResult();
		} else if (firstNum != 0 && operator != '' && secondNum != 0) {
			secondNum *= 10;
			secondNum += parseInt(key);
			display.innerHTML = firstNum + " " + operator + " " + secondNum + " = " + getResult();
		}
	} else if (isOperator()) {
		operator = key;
		if (firstNum != 0 && secondNum == 0)
			display.innerHTML = firstNum + " " + operator;
		else if (firstNum != 0 && operator != '' && secondNum != 0)
			display.innerHTML = firstNum + " " + operator + " " + secondNum + " = " + getResult();
	} else if (key == 'E') {
		firstNum = 0;
		secondNum = 0;
		operator = '';
		display.innerHTML = "Result";
	} else if (key == 'U') {
		if (firstNum != 0 && operator != '' && secondNum != 0) {
			secondNum = Math.floor(secondNum / 10);
			if (secondNum == 0)
				display.innerHTML = firstNum + " " + operator;
			else
				display.innerHTML = firstNum + " " + operator + " " + secondNum + " = " + getResult();
		} else if (firstNum != 0 && operator != '') {
			operator = '';
			display.innerHTML = firstNum;
		} else {
			firstNum = Math.floor(firstNum/10);
			if (firstNum == 0)
				display.innerHTML = "Result";
			else
				display.innerHTML = firstNum;
		}
	}
}
