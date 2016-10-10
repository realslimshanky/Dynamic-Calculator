var key=document.getElementsByClassName("key");
var display=document.getElementById("display_result_inline");
var firstNo = 0;
var secondNo = 0;
var operator=false;
var result = 0;

function remove_box_shadow(div){
	div.style.boxShadow="none";
}

function set_box_shadow(div){
	div.style.boxShadow="2px 2px 5px 2px orange";
}

for(var i=0; i<key.length; i++)
{
	//console.log(i);
	key[i].addEventListener("click",function(){
		var a = this;
		main_action(a);
	});

}

document.addEventListener("keypress",function(){
	var key_code=(window.event.which || window.event.keyCode);
	main_action(false,key_code);

});

function main_action(a,key_code=false){

	var pressed_key=false;
	if(key_code==false)
	{
		remove_box_shadow(a);
		setTimeout(function(){set_box_shadow(a)},200);
		pressed_key = a.innerHTML;
		//alert(pressed_key);
	}
	else{
			pressed_key = String.fromCharCode(key_code);
			if(pressed_key=='u')
				pressed_key='U';
			if(pressed_key=='e')
				pressed_key='E';
			if(!isNaN(parseInt(pressed_key))){
				a=document.getElementById(pressed_key);
				remove_box_shadow(a);
				setTimeout(function(){set_box_shadow(a)},200);
			}
			else if(pressed_key=='E'){
				a=document.getElementById("erase");
				remove_box_shadow(a);
				setTimeout(function(){set_box_shadow(a)},200);
			}
			else if(pressed_key=='U'){
				a=document.getElementById("undo");
				remove_box_shadow(a);
				setTimeout(function(){set_box_shadow(a)},200);
			}
			else if(pressed_key=='+'){
				a=document.getElementById("plus1");
				remove_box_shadow(a);
				setTimeout(function(){set_box_shadow(a)},200);
				a=document.getElementById("plus2");
				remove_box_shadow(a);
				setTimeout(function(){set_box_shadow(a)},200);
			}
			else if(pressed_key=='-'){
				a=document.getElementById("minus1");
				remove_box_shadow(a);
				setTimeout(function(){set_box_shadow(a)},200);
				a=document.getElementById("minus2");
				remove_box_shadow(a);
				setTimeout(function(){set_box_shadow(a)},200);
			}
			else if(pressed_key=='*'){
				a=document.getElementById("star1");
				remove_box_shadow(a);
				setTimeout(function(){set_box_shadow(a)},200);
				a=document.getElementById("star2");
				remove_box_shadow(a);
				setTimeout(function(){set_box_shadow(a)},200);
			}
			else if(pressed_key=='/'){
				a=document.getElementById("slash1");
				remove_box_shadow(a);
				setTimeout(function(){set_box_shadow(a)},200);
				a=document.getElementById("slash2");
				remove_box_shadow(a);
				setTimeout(function(){set_box_shadow(a)},200);
			}
	}
	function checkifno(a){
		//alert(parseInt(pressed_key));
		return a==parseInt(pressed_key);
	}
	function checkifoperator(a){
		//alert(a);
		return a==pressed_key;
	}
	if((operator==false)){
		if(['10','1','2','3','4','5','6','7','8','9','0'].findIndex(checkifno)>0){
			//alert(['10','1','2','3','4','5','6','7','8','9','0'].findIndex(checkifno));
			firstNo*=10;
			firstNo+=parseInt(pressed_key);
			display.innerHTML=firstNo;
		}
		if(pressed_key=='U'){
			firstNo=Math.floor(firstNo/10);
			display.innerHTML=firstNo;
		}
		if(pressed_key=='E'){
			firstNo=0;
			display.innerHTML=firstNo;
		}
		if(['1','+','-','*','/'].findIndex(checkifoperator)>0 && firstNo!=0){
			//alert();
			operator=pressed_key;
			display.innerHTML=firstNo + " " + operator;
		}
	}

	else{
		if(pressed_key=='U' && secondNo==0){
			operator=false;
			display.innerHTML=firstNo;
		}
		if(pressed_key=='E'){
			operator=false;
			firstNo=0;
			secondNo=0;
			display.innerHTML=firstNo;
		}
		if(['10','1','2','3','4','5','6','7','8','9','0'].findIndex(checkifno)>0){
			//alert(['10','1','2','3','4','5','6','7','8','9','0'].findIndex(checkifno));
			secondNo*=10;
			secondNo+=parseInt(pressed_key);
			if(operator=="+"){
				result=firstNo+secondNo;
			}
			else if(operator=="-"){
				result=firstNo-secondNo;
			}
			else if(operator=="*"){
				result=firstNo*secondNo;
			}
			else if(operator=="/"){
				result=firstNo/secondNo;
			}
			display.innerHTML=firstNo + " " + operator + " " + secondNo + " = " + result;
		}
		if(pressed_key=='U' && secondNo!=0){
			secondNo=Math.floor(secondNo/10);
			if(operator=="+"){
				result=firstNo+secondNo;
			}
			else if(operator=="-"){
				result=firstNo-secondNo;
			}
			else if(operator=="*"){
				result=firstNo*secondNo;
			}
			else if(operator=="/"){
				result=firstNo/secondNo;
			}
			display.innerHTML=firstNo + " " + operator + " " + secondNo + " = " + result;
		}
	}
}