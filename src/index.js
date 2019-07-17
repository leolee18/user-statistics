console.log('index.js!');

import "./base.css";
import uSta from "./userStat.js";

var mbody = document.getElementById('mbody');

var img33 = document.getElementById('img33');
img33.addEventListener('click',function(e){
	uSta.uc(e,'leolee');
	console.log('mObjss');
})


