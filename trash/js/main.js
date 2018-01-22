
/*创建进度条，数量100*/
function CreateSchedule() {
    this.number = 100;
    this.rotateNum = 360 / this.number;
    this.parentNode = getDom('.soft-info-schedule')[0];
    for(var i=0; i<this.number; i++) {
        var smSchedule = document.createElement('div');
        smSchedule.className = 'soft-info-schedule-tra';
        smSchedule.style.webkitTransform = 'rotate(' + i * this.rotateNum + 'deg)';
        this.parentNode.appendChild(smSchedule);
    }
}
new CreateSchedule();

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
function initSchedlue(per,ele,ms) {
    if(per == 0) {
        loadingAnimate(100,per,ele,ms)
    }else if(per == 1) {
        loadingAnimate(100,per,ele,ms)
    }else {
        loadingAnimate(100,per,ele,ms)
    }
    
}

/*动画执行*/
function loadingAnimate(num,per,ele,ms) {
    let timer1 = null;
    let timer2 = null;
    per = per * 100; 
    clearInterval(timer1);
    clearInterval(timer2);
    console.log(per,oldPer)
    /*增加*/
    if(per > oldPer) {
        timer1 = setInterval(function() {
            if(per >= oldPer) {
                if(oldPer == 100) {
                    oldPer = 99;
                    getDom('#soft-info-perText').innerHTML = '100%';
                    ele.children[99].className = 'soft-info-schedule-white';
                    clearInterval(timer1);
                    return;                    
                }
                getDom('#soft-info-perText').innerHTML = oldPer + '%';
                ele.children[oldPer].className = 'soft-info-schedule-white';
            }else {
                oldPer = per;
                clearInterval(timer1);
                return;
            }
            oldPer++;
        },ms);
     }
    else {
        /*减少*/
        timer2 = setInterval(function() {
            if(oldPer >= per) {
                getDom('#soft-info-perText').innerHTML = oldPer + '%';
                ele.children[oldPer].className = 'soft-info-schedule-tra';
            }else {
                oldPer = per;
                clearInterval(timer2); 
                return;   
            }
            oldPer--;
        },ms)
    }
}


/*点击事件 获得input输入值*/
getDom('#soft-info-changePer').addEventListener('tap',function() {
    changeValue()
});

function changeValue() {
    let ele = getDom('.soft-info-schedule')[0];
    getDom('#soft-info-perText').innerHTML = '0%';
    var value = getDom('#soft-info-inputPer').value;
    initSchedlue(value,ele,30);
}



