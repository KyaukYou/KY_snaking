/*创建进度条，数量100*/
function CreateSchedule(num, ele, clas) {
    this.number = num;
    this.rotateNum = 360 / this.number;
    this.parentNode = ele;
    for (var i = 0; i < this.number; i++) {
        var smSchedule = document.createElement('div');
        smSchedule.className = clas;
        smSchedule.style.webkitTransform = 'rotate(' + i * this.rotateNum + 'deg)';
        this.parentNode.appendChild(smSchedule);
    }
}

/*初始化进度条进度*/
/*
    per 百分比参数
    ele 进度条元素
    ms  控制进度加载速度
    有三种情况
      1. 为0 
      2. 为1
      3. 0~1
    还需要实时记录进度，不能每次都让进度条重新加载，影响观感和代码的执行速度   
*/
/*监测上一次的进度百分比*/
var oldPer = 0;
var oldTemp = 0;

/*
    因为进度条无法精确到小数点
    所以这里需要保存一个真实的
    温度数据
*/
var trueTemp = 0;

function initSchedlue(per, ele, ms, clas1, clas2, temp, type) {
    per = per || 0;
    if (per == 0) {
        loadingAnimate(100, per, ele, ms, clas1, clas2, temp, type)
    } else if (per == 1) {
        loadingAnimate(100, per, ele, ms, clas1, clas2, temp, type)
    } else {
        loadingAnimate(100, per, ele, ms, clas1, clas2, temp, type)
    }
}

/*动画执行*/
function loadingAnimate(num, per, ele, ms, clas1, clas2, innerText, type) {
    var timer1 = null;
    var timer2 = null;
    var timer3 = null;
    var timer4 = null;
    per = per * 100-1;
    clearInterval(timer1);
    clearInterval(timer2);
    clearInterval(timer3);
    clearInterval(timer4);

    if (type == 1) {
        /*增加*/
        if (per > oldPer) {
            timer1 = setInterval(function () {
                if (per >= oldPer) {
                    getDom(innerText).innerHTML = oldPer+1 + '%';
                    ele.getElementsByTagName('div')[oldPer].className = clas1;
                    // console.log(oldPer)
                } else {
                    oldPer = per;
                    var a = oldPer;
                    getDom(innerText).innerHTML = a+1 + '%';
                    ele.getElementsByTagName('div')[oldPer].className = clas1;
                    clearInterval(timer1);
                    return;
                }
                
                oldPer++;
            }, ms);
        }
        else {
            /*减少*/           
            timer2 = setInterval(function () {
                if (oldPer >= per) {
                    // console.log(oldPer)
                    if(oldPer <=0 ) {
                        oldPer = 0;
                        clearInterval(timer2);
                        getDom(innerText).innerHTML = 0 + '%';
                        ele.getElementsByTagName('div')[oldPer].className = clas2;
                        return;
                    }
                    getDom(innerText).innerHTML = oldPer+1 + '%';
                    ele.getElementsByTagName('div')[oldPer].className = clas2;
                } else {
                    oldPer = per;
                    getDom(innerText).innerHTML = oldPer+1 + '%';
                    ele.getElementsByTagName('div')[oldPer].className = clas1;
                    clearInterval(timer2);
                    return;
                }
                oldPer--;
            }, ms)
        }
    } else if (type == 2) {
        /*增加*/
        if (per > oldTemp) {
            timer3 = setInterval(function () {
                console.log(oldTemp)
                if (per >= oldTemp) {
                    getDom(innerText).innerHTML = oldTemp+1 + '℃';
                    ele.getElementsByTagName('div')[oldTemp].className = clas2;
                    // console.log(ele.getElementsByTagName('div')[oldTemp])
                } else {
                    oldTemp = per;
                    var a = oldTemp;
                    getDom(innerText).innerHTML = trueTemp + '℃';
                    ele.getElementsByTagName('div')[oldTemp].className = clas2;
                    clearInterval(timer3);
                    return;
                }
                
                oldTemp++;
            }, ms);
        }
        else {
            /*减少*/           
            timer4 = setInterval(function () {
                if (oldTemp >= per) {
                    console.log(oldTemp)
                    if(oldTemp <=0 ) {
                        oldTemp = 0;
                        clearInterval(timer4);
                        getDom(innerText).innerHTML = 0 + '℃';
                        ele.getElementsByTagName('div')[oldTemp].className = clas1;
                        return;
                    }
                    getDom(innerText).innerHTML = oldTemp+1 + '℃';
                    ele.getElementsByTagName('div')[oldTemp].className = clas1;
                } else {
                    oldTemp = per;
                    getDom(innerText).innerHTML = trueTemp + '℃';
                    ele.getElementsByTagName('div')[oldTemp].className = clas2;
                    clearInterval(timer4);
                    return;
                }
                oldTemp--;
            }, ms)
        }
    }
}


/*点击事件 获得input输入值*/
// getDom('#soft-info-changePer').addEventListener('tap', function () {
//     changeValue()
// });

function changeValue() {
    var ele = getDom('.soft-info-schedule')[0];
    var value = getDom('#soft-info-inputPer').value;
    var value1 = getDom('#soft-info-inputPer1').value;
    trueTemp = value1;
    value = Math.round(parseFloat(value) * 100) / 100;
    value1 = Math.round(parseFloat(value1) * 100) / 100;
    initSchedlue(value, ele, 20, 'soft-info-schedule-white', 'soft-info-schedule-tra', '#soft-info-perText',1);
    initSchedlue(value1, getDom('.soft-info-temp')[0], 30,'soft-info-temp-tra','soft-info-temp-orange','#soft-info-temp',2);
}


// var tabArr = ['当前已用容量','当前设备温度'];
var infoIndex = 0;
getDom('#soft-info-top').addEventListener('tap', function () {
    if (infoIndex == 0) {
        infoIndex = 1;
    } else {
        infoIndex--;
    }
    scrollInfo(infoIndex);
})
getDom('#soft-info-bottom').addEventListener('tap', function () {
    if (infoIndex == 1) {
        infoIndex = 0;
    } else {
        infoIndex++;
    }
    scrollInfo(infoIndex);
})

/*滚动函数*/
function scrollInfo(index) {
    getDom('.soft-info-log')[0].style.transform = "translateY(" + -index * 33.33333333 + "%)";
}

/*ajax获取数据检测，每隔3s检测一次*/
function softAjax() {
    //创建ajax对象
    var xhr = new XMLHttpRequest();
}

function ajaxGetInfo() {

}