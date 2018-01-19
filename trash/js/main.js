//var footer = document.getElementById('footer');
//var lis = footer.getElementsByTagName('li');
//for(var i=0; i<lis.length; i++) {
//	lis[i].addEventListener('tap',function() {
//		
//		for(var j=0; j<lis.length; j++) {
//			lis[j].className = '';
//		}
//		this.className = 'current';
//	})
//}

//for(var i=0; i<document.getElementsByTagName('a').length; i++) {
//	document.getElementsByTagName('a')[0].addEventListener('tap',function(e) {
//		e.preventDefault(); 
//	})
//}

function CreateBar(num, parentNode, per) {
    parentNode.innerHTML = '';
    getDom('#soft-info-perText').innerHTML = '0%';
    this.number = num;
    this.per = num * per;
    this.rotateNum = 360 / this.number;
    this.parentNode = parentNode;
    var that = this;
    var timer = null;
    clearInterval(timer);
    for (var i = 0; i < this.number; i++) {
        var infoSchedule = document.createElement('div');
        infoSchedule.className = 'soft-info-schedule-sm';
        infoSchedule.style.webkitTransform = 'rotate(' + i * that.rotateNum + 'deg)';
        that.parentNode.appendChild(infoSchedule)
    }
    var needShow = Math.round(that.per);
    var beginShow = -1;
    var countNum = needShow / that.per; 
    console.log(needShow)
    var countText = 0;
    timer = setInterval(function() {
        countText += countNum;
        beginShow++;   
        if(beginShow < needShow) {
            getDom('#soft-info-perText').innerHTML = countText.toFixed(1) + '%';
            that.parentNode.children[beginShow].className = 'soft-info-schedule-white'
        }else {
            getDom('#soft-info-perText').innerHTML = (per * 100).toFixed(1) + '%';
            that.parentNode.children[needShow-1].className = 'soft-info-schedule-white'
            clearInterval(timer);
        }
    },20)
}

getDom('#soft-info-changePer').addEventListener('tap',function() {
    throttle(chnageValue)
});

function chnageValue() {
    getDom('.soft-info-schedule')[0].innerHTML = '';
    getDom('#soft-info-perText').innerHTML = '0%';
    var value = getDom('#soft-info-inputPer').value;
    value = value.split(',');
    var createBar2 = new CreateBar(value[0]-0, getDom('.soft-info-schedule')[0],value[1]-0)
}

function throttle(method,context){
    clearTimeout(method.tId);
    method.tId=setTimeout(function(){
        method.call(context);
    },10);
}

var createBar1 = new CreateBar(10, getDom('.soft-info-schedule')[0], 0.8);