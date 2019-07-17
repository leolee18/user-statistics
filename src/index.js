console.log('index.js!');

import "./base.css";
import uSta from "./userStat.js";

var mbody = document.getElementById('mbody');


var img2 = document.getElementById('img2');
img2.addEventListener('click',function(e){
	location.hash = "part5";
})

var img33 = document.getElementById('img33');
img33.addEventListener('click',function(e){
	uSta.uc(e,'leolee');
	console.log('mObjss');
})


