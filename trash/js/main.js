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

var oldPer = 0.8;

function CreateBar(num, parentNode, per, ms) {
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
    var beginShow = 0;
    var countNum = needShow / that.per; 
    console.log(needShow)
    var countText = 0;
    if(per == 0) {
        console.log(oldPer)
        thisPer = oldPer * 100;
        timer = setInterval(function() {
            if(thisPer >=0 ){
                getDom('#soft-info-perText').innerHTML = thisPer + '%';
                that.parentNode.children[20].className = 'soft-info-schedule-sm';
            }
            thisPer--;
            console.log(thisPer)
        },100)
    }else if(per == 1){

    }else {
    timer = setInterval(function() {
        countText += countNum;
        beginShow++;   
        if(beginShow < needShow){
            getDom('#soft-info-perText').innerHTML = countText.toFixed(1) + '%';
            that.parentNode.children[beginShow].className = 'soft-info-schedule-white'
        }
    },ms)
    console.log(1);
    }
}

getDom('#soft-info-changePer').addEventListener('tap',function() {
    throttle(chnageValue)
});

function chnageValue() {
    getDom('.soft-info-schedule')[0].innerHTML = '';
    getDom('#soft-info-perText').innerHTML = '0%';
    var value = getDom('#soft-info-inputPer').value;
    // value = value.split(',');
    // oldPer = value-0;
    console.log(oldPer)
    var createBar2 = new CreateBar(100, getDom('.soft-info-schedule')[0],value-0,10)
}

function throttle(method,context){
    clearTimeout(method.tId);
    method.tId=setTimeout(function(){
        method.call(context);
    },10);
}

var createBar1 = new CreateBar(100, getDom('.soft-info-schedule')[0], 0.8, 20);
