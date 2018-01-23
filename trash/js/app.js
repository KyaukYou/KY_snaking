//定义变量
var refresh = document.getElementById('cylinder-refresh');


//自定义函数
function softEvent(ele,event,fn) {
	ele.addEventListener(event,fn)	
}


softEvent(refresh,'tap',function() {
	var that = this;
	var timer = null;
	clearTimeout(timer);
	this.classList.add('cylinder-refresh-animation');	
	timer = setTimeout(function() {
		that.classList.remove('cylinder-refresh-animation');		
	},4600);
})