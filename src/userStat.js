var useObj = null;

var sendMsg = (obj,mType) => {
	console.log(mType)
  console.log(JSON.stringify(obj));
}
var useClick = (e)=>{
	var ev = e || window.event;
	var target = ev.target || ev.srcElement;
	//console.log(ev);
	if( ev && ev.stopPropagation ){
		ev.stopPropagation();
	}else{
		ev.cancelBubble = true; 
	}
	
	var mSend = {
		rand:useObj.rand,
		point:{
			x:ev.pageX,
			y:ev.pageY
		}
	};
	if (target.className.toLowerCase().indexOf('st-click') != -1) {
		if(target.onclick){
			mSend.onclick = target.getAttribute('onclick');
		}
		if(target.id){
			mSend.id = target.getAttribute('id');
		}
		if(target.href){
			mSend.href = target.getAttribute('href');
		}
		mSend.dv = getPoint(target);
		mSend.dvwh = {
			w:target.width,
			h:target.height
		};
		if(ev.ctype){
			mSend.ctype = ev.ctype;
		}
		if(target.dataset.ustp){
			mSend.ustp = target.dataset.ustp;
		}
		mSend.etype = target.tagName;
		mSend.ele = target.innerHTML;
	  sendMsg(mSend,'click');
	}
}

window.onload = () => {
  var pageName = window.location.href;
  useObj = {
		rand:randomString(),
    pageName: pageName,
    startTime: new Date().getTime(),
    cookie: document.cookie,
		w:getCWH(),
		userAgent:navigator.userAgent.toLowerCase()
  }
	document.onclick = useClick;
	sendMsg(useObj,'load');
}

window.onhashchange = ()=>{
	var pageName = window.location.href;
	var mSend = {
		rand:useObj.rand,
		pageName: pageName,
		hashTime: new Date().getTime()
	};
	sendMsg(mSend,'hashchange');
}

window.onbeforeunload = function () {
  useObj.endTime = new Date().getTime()
  useObj.watchTime = useObj.endTime - useObj.startTime
  sendMsg(useObj,'unload');
}

function getCWH(){
	return {
		w:document.documentElement.clientWidth || document.body.clientWidth,
		h:document.documentElement.clientHeight || document.body.clientHeight
	}
}
function getPoint(mEle){
    let t = mEle.offsetTop;
		let l = mEle.offsetLeft;
    while (mEle = mEle.offsetParent) { 
      t += mEle.offsetTop;
			l += mEle.offsetLeft;
    }
    return {t,l};
}
function randomString(len) {
　　len = len || 32;
　　let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
　　let maxPos = $chars.length;
　　let pwd = '';
　　for (let i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}

function uc(e,ctype){
	e.ctype = ctype;
	useClick(e);
}
export default {uc};