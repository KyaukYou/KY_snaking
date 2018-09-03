<template>
  <div class="index" id="index">
    <p class="index-row" >
      <i v-for="(item,index) in boxNumArr[1]">{{index}}</i>
    </p>
    <p class="index-col" >
      <i v-for="(item,index) in boxNumArr[0]">{{index}}</i>
    </p>

    <div class="wrap"  v-for="(item,index) in boxNumArr[0]">
      <div class="wrap-cut" v-for="(item,index) in boxNumArr[1]"></div>
    </div>

    <div class="btn-group">
      <button @click="handMove" data-type='left' >左转</button>
      <button @click="handMove" data-type='right' >右转</button>
      <button @click="handMove" data-type='move' >前进</button>
      <button @click="autoMove">自动</button>
      <button @click="pauseMove">暂停</button>  
      <button @click="clearAll">初始化</button>
      <input type="number" placeholder="行" v-bind:value="hang" v-on:input='changeHang'>
      *
      <input type="number" placeholder="高" v-bind:value="lie" v-on:input='changeLie' disabled>
      <button @click="changeBox">确定</button>
    </div>

  </div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return {
      boxNumArr: [22,22],  //行,列
      hang: 22,
      lie: 22,
      initArr: [0,0],
      foodArr: [0,0],
      snakeLength: 0,
      snakeRotate: 'rotate(0deg)',   //蛇的旋转角度 & 移动方向
      snakePrueRotate: 0,
      snakeColor: 'green',           //身体颜色
      snakeHColor: 'blue',           //头部颜色
      foodColor: '',
      autoTimer: null,
      eatBol: false,
      eatHang: [],
      eatLie: [],
      eatHD: 'none', 
      eatLD: 'none',
      eatRotate: 0  
    }
  },
  methods: {
    // 添加蛇身
    addSnakeBody: function() {
      console.log(this.initArr);
      var move = document.getElementsByClassName('wrap')[this.initArr[0]].getElementsByClassName('wrap-cut')[this.initArr[1]].getElementsByClassName('moveDiv')[0];
      var style = window.getComputedStyle(move,null).transform;
      console.log(style.substring(7,style.length-1));
      var styleArr = style.substring(7,style.length-1).split(',');
      console.log(styleArr);
      this.getmatrix(styleArr[0],styleArr[1],styleArr[2],styleArr[3],styleArr[4],styleArr[5])
      if(this.eatRotate == 0) {
        console.log('向上')
      }
      else if(this.eatRotate == 90) {
        console.log('向右')
      }
      else if(this.eatRotate == 180) {
        console.log('向下')
      }
      else if(this.eatRotate == 270) {
        console.log('向左')
      }
    },
    addDiv: function(val) {
      if(val == 0) {
        console.log('向上');
        //判断在不在最后一行
        if(this.initArr[0] == this.boxNumArr[0]) {
          if(this.initArr[1] == 0) {

          }
          else if(this.initArr[1] == this.boxNumArr[1]) {

          }
        }
      }
      else if(val == 90) {
        console.log('向右')
      }
      else if(val == 180) {
        console.log('向下')
      }
      else if(val == 270) {
        console.log('向左')
      }
    },
    getmatrix: function(a,b,c,d,e,f){  
      var aa=Math.round(180*Math.asin(a)/ Math.PI);  
      var bb=Math.round(180*Math.acos(b)/ Math.PI);  
      var cc=Math.round(180*Math.asin(c)/ Math.PI);  
      var dd=Math.round(180*Math.acos(d)/ Math.PI);  
      var deg=0;  
      if(aa==bb||-aa==bb){  
          deg=dd;  
      }else if(-aa+bb==180){  
          deg=180+cc;  
      }else if(aa+bb==180){  
          deg=360-cc||360-dd;  
      };
      console.log(deg);
      var my =  deg>=360?0:deg;  
      this.eatRotate = my;
      //return (aa+','+bb+','+cc+','+dd);  
    },
    // 初始化位置
    initFn: function() {
      //随机生成位置
      let x = parseInt(Math.random() * this.boxNumArr[0]);
      let y = parseInt(Math.random() * this.boxNumArr[1]);
      // console.log(x,y);
      this.initArr = [x,y];
      // console.log('she: '+ this.initArr);

      //创建move元素
      let moveDiv = document.createElement('div');
      moveDiv.className = 'moveDiv';
      // moveDiv.style.backgroundColor = this.snakeColor;
      moveDiv.style.transform = this.snakeRotate;

      let moveHead = document.createElement('div');
      moveHead.className = 'moveHead';
      // moveHead.style.backgroundColor = this.snakeHColor;

      let moveBody = document.createElement('div');
      moveBody.className = 'moveBody';

      var R = parseInt(Math.random() * 256);
      var G = parseInt(Math.random() * 256);
      var B = parseInt(Math.random() * 256);
      moveDiv.style.backgroundColor = 'rgb('+R+','+G+','+B+')';

      var R1 = parseInt(Math.random() * 256);
      var G1 = parseInt(Math.random() * 256);
      var B1 = parseInt(Math.random() * 256);
      moveHead.style.backgroundColor = 'rgb('+R1+','+G1+','+B1+')';
      this.snakeColor = 'rgb('+R+','+G+','+B+')';
      this.snakeHColor = 'rgb('+R1+','+G1+','+B1+')';


      moveDiv.appendChild(moveHead);
      moveDiv.appendChild(moveBody);

      document.getElementsByClassName('wrap')[x].getElementsByClassName('wrap-cut')[y].appendChild(moveDiv);
      // console.log(this.initArr)

    },
    // 初始化食物位置
    initFood: function() {
      // 初始化x,y 判断是否和蛇在一起
      let x = parseInt(Math.random() * this.boxNumArr[0]);
      let y = parseInt(Math.random() * this.boxNumArr[1]);
      if(x == this.initArr[0] && y == this.initArr[1]) {
        // console.log('food: '+ x,y)
        this.initFood();
      }
      else {
        this.foodArr = [x,y];
        // console.log('food: '+ this.foodArr)
        //创建move元素
        let foodDiv = document.createElement('div');
        foodDiv.className = 'foodDiv';

        var R = parseInt(Math.random() * 256);
        var G = parseInt(Math.random() * 256);
        var B = parseInt(Math.random() * 256);
        foodDiv.style.backgroundColor = 'rgb('+R+','+G+','+B+')';
        this.foodColor = 'rgb('+R+','+G+','+B+')';
        // console.log(this.foodColor)
        document.getElementsByClassName('wrap')[x].getElementsByClassName('wrap-cut')[y].appendChild(foodDiv)
      }
    },
    // 长度判断
    calLength: function() {
      // var snake = document.getElementsByClassName('moveDiv');
      // this.snakeLength = snake.length;

    },
    // 移动吃食物
    eatFood: function() {
      var snakeA = JSON.parse(JSON.stringify(this.initArr));
      var foodA = JSON.parse(JSON.stringify(this.foodArr));

      var snake = JSON.parse(JSON.stringify(this.initArr));
      var food = JSON.parse(JSON.stringify(this.foodArr));


      let rotate = this.snakePrueRotate;

      /*
        -90，270     向左
        -180， 180   向下
        -270，90     向右
         0           向上
      */
      if(rotate == -90 || rotate == 270) {
        if(snake[1] > 0) {
          snake[1] -= 1;
        }
      }
      else if(rotate == -180 || rotate == 180) {
        if(snake[0] < this.boxNumArr[0]-1) {
          snake[0] += 1;
        }
      }
      else if(rotate == -270 || rotate == 90) {
        if(snake[1] < this.boxNumArr[1]-1) {
          snake[1] += 1;
        }
      }
      else if(rotate == 0) {
        if(snake[0] > 0) {
          snake[0] -= 1;
        }
      }         
      this.initArr = snake;
      // console.log(snakeA,snake)
      
      let snakeDiv = document.getElementsByClassName('wrap')[snakeA[0]].getElementsByClassName('wrap-cut')[snakeA[1]].getElementsByClassName('moveDiv')[0];
      document.getElementsByClassName('wrap')[snakeA[0]].getElementsByClassName('wrap-cut')[snakeA[1]].removeChild(snakeDiv);

      // console.log(snakeDiv, snakeA);
      document.getElementsByClassName('wrap')[snake[0]].getElementsByClassName('wrap-cut')[snake[1]].appendChild(snakeDiv);
      // console.log(this.initArr, this.foodArr)
      if(this.initArr[0] == this.foodArr[0] && this.initArr[1] == this.foodArr[1]) {
        var foodDiv = document.getElementsByClassName('wrap')[foodA[0]].getElementsByClassName('wrap-cut')[foodA[1]].getElementsByClassName('foodDiv')[0];
        document.getElementsByClassName('wrap')[foodA[0]].getElementsByClassName('wrap-cut')[foodA[1]].removeChild(foodDiv);
        this.initFood();
      }

    },
    // 改变角度
    changeRotate: function(val) {
      if(val == 'left') {
        let rotateText = this.snakePrueRotate;
        rotateText -= 90;

        if(rotateText == -360) {
          rotateText = 0;
        }
        
        // document.getElementsByClassName('moveDiv')[0].style.transition =  'all .2s ease';
        // console.log(rotateText)
        this.snakePrueRotate = rotateText;
        this.snakeRotate = 'rotate('+ rotateText +'deg)';
        document.getElementsByClassName('moveDiv')[0].style.transform = this.snakeRotate;

          
      }
      else if(val == 'right') {
        let rotateText = this.snakePrueRotate;

        rotateText += 90;
        
        if(rotateText == 360) {
          rotateText = 0;
        }
        // console.log(rotateText)
        this.snakePrueRotate = rotateText;
        this.snakeRotate = 'rotate('+ rotateText +'deg)';
        document.getElementsByClassName('moveDiv')[0].style.transform = this.snakeRotate;
      }
    },
    // 手动控制
    handMove: function(e) {
      // console.log(e.target.dataset.type);
      let handType = e.target.dataset.type;

      if(handType == 'left') {
        this.changeRotate(handType);
      }
      else if(handType == 'right') {
        this.changeRotate(handType);
      }
      else if(handType == 'move') {
        this.eatFood();
      }
      
    },
    // 自动移动
    autoMove: function() {
      var that = this;
      clearInterval(this.autoTimer);
      var snakeB = JSON.parse(JSON.stringify(that.initArr));
      var foodB = JSON.parse(JSON.stringify(that.foodArr));
      //行数大于列数
      // if(Math.abs(snakeB[0] - foodB[0]) >= Math.abs(snakeB[1] - foodB[1]) ) {
        for(var i=0; i<Math.abs(snakeB[0] - foodB[0]); i++) {
          this.eatHang[i] = i;
        }
        if(snakeB[0] - foodB[0] < 0) {
          this.eatHD = 'right'
        }else {
          this.eatHD = 'left'
        }
      // }else {
        for(var i=0; i<Math.abs(snakeB[1] - foodB[1]); i++) {
          this.eatLie[i] = i;
        }
        if(snakeB[1] - foodB[1] < 0) {
          this.eatLD = 'bottom'
        }else {
          this.eatLD = 'top'
        }
      // }


      this.autoTimer = setInterval(function() {

        var snakeA = JSON.parse(JSON.stringify(that.initArr));
        var foodA = JSON.parse(JSON.stringify(that.foodArr));

        var snake = JSON.parse(JSON.stringify(that.initArr));
        var food = JSON.parse(JSON.stringify(that.foodArr));
        let rotate = that.snakePrueRotate;
        /*
          -90，270     向左
          -180， 180   向下
          -270，90     向右
          0           向上
        */    
        // console.log(that.eatHang,that.eatLie,that.eatHD,that.eatLD);

        if(that.eatHang.length > 0) {
          if(that.eatHD == 'right') {
            snake[0] += 1;
            that.eatHang.pop();
            that.snakePrueRotate = 180;
          }else {
            snake[0] -= 1;
            that.eatHang.pop();
            that.snakePrueRotate = 0;
          }
        }else {

          if(that.eatLie.length > 0) {
            if(that.eatLD == 'top') {
              snake[1] -= 1;
              that.eatLie.pop();
              that.snakePrueRotate = 270;
            }else {
              snake[1] += 1;
              that.eatLie.pop();
              that.snakePrueRotate = 90;
            }
          }
        }
        
        // console.log(that.snakePrueRotate);
        that.snakeRotate = 'rotate('+ that.snakePrueRotate +'deg)';
        document.getElementsByClassName('moveDiv')[0].style.transform = that.snakeRotate;

        that.initArr = snake;
        // console.log(snakeA,snake)
        
        let snakeDiv = document.getElementsByClassName('wrap')[snakeA[0]].getElementsByClassName('wrap-cut')[snakeA[1]].getElementsByClassName('moveDiv')[0];
        document.getElementsByClassName('wrap')[snakeA[0]].getElementsByClassName('wrap-cut')[snakeA[1]].removeChild(snakeDiv);

        // console.log(snakeDiv, snakeA);
        document.getElementsByClassName('wrap')[snake[0]].getElementsByClassName('wrap-cut')[snake[1]].appendChild(snakeDiv);
        // console.log(that.initArr, that.foodArr)
        if(that.initArr[0] == that.foodArr[0] && that.initArr[1] == that.foodArr[1]) {
          var foodDiv = document.getElementsByClassName('wrap')[foodA[0]].getElementsByClassName('wrap-cut')[foodA[1]].getElementsByClassName('foodDiv')[0];
          document.getElementsByClassName('wrap')[foodA[0]].getElementsByClassName('wrap-cut')[foodA[1]].removeChild(foodDiv);

          // var foodDivColor = footDiv.style.backgroundColor;
          // console.log(foodDiv.style.backgroundColor); 
          var foodColor =  foodDiv.style.backgroundColor;
          var bodyColor = document.getElementsByClassName('moveDiv')[0].style.backgroundColor;
          document.getElementsByClassName('moveDiv')[0].style.backgroundColor = foodColor;
          document.getElementsByClassName('moveDiv')[0].getElementsByClassName('moveHead')[0].style.backgroundColor = bodyColor;

          that.initFood();
          that.autoMove();
          that.addSnakeBody();
        }


      },300);
    },
    // 暂停移动
    pauseMove: function() {
      clearInterval(this.autoTimer);
    },
    // 初始化
    clearAll: function() {
      clearInterval(this.autoTimer);
      var wrap = document.getElementsByClassName('index')[0].getElementsByClassName('wrap');
      for(var i=0; i<wrap.length; i++) {
        for(var j=0; j<wrap[i].getElementsByClassName('wrap-cut').length; j++) {
          wrap[i].getElementsByClassName('wrap-cut')[j].innerHTML = '';
          // console.log(wrap[j].getElementsByClassName('wrap-cut')[j])
        }
      }
      this.initFn();
      this.initFood();
    },
    // 自定义行列
    changeHang: function(e) {
      // console.log(e);
      this.hang = e.target.value;
      this.lie = e.target.value;
    },
    changeLie: function(e) {
      // console.log(e);
      this.lie = e.target.value;
    },
    // 按钮确认修改
    changeBox: function() {
      var arr = [Number(this.hang),Number(this.lie)];
      // console.log(arr)
      this.boxNumArr = arr;
      // this.clearAll();
      // this.initFn();
      // this.initFood();
    }
  },
  mounted: function() {
    this.initFn();
    this.initFood();
    this.calLength();

  }
  
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index {
  width: 600px;
  height: 600px;
  /* background-color: antiquewhite; */
  margin: 100px auto;
  display: flex;
  flex-flow: column wrap;
  /* align-items: stretch; */
  position: relative;
}

.index-row {
  position: absolute;
  left: -1px;
  right: 0;
  top: -31px;
  height: 30px;
  /* background-color: gray; */
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  border-bottom:  1px solid rgb(50, 60, 110);
  font-size: 0.7em;
}

.index-row i {
  flex: 1;
  /* display: block; */
  height: 100%;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.index-col {
  position: absolute;
  left: -30.5px;
  top: 0;
  bottom: 0;
  width: 30px;
  /* background-color: gray; */
  display: flex;
  flex-flow: column wrap;
  align-items: stretch;
  border-right:  1px solid rgb(50, 60, 110);
  font-size: 0.7em;
}

.index-col i {
  flex: 1;
  /* display: block; */
  height: 100%;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}


.wrap {
  width: auto;
  height: auto;
  flex: 1;
  /* background-color: aquamarine; */
  /* border-bottom:  1px solid rgb(50, 60, 110); */
  /*border-left:  1px solid rgb(50, 60, 110);*/
  /*border-right:  1px solid rgb(50, 60, 110); */
  /* box-sizing: border-box; */
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;

}


.wrap:nth-of-type(1) .wrap-cut{
  /* border-top:  1px solid rgb(50, 60, 110); */
}


.wrap-cut {
  height: 100%;
  width: auto;
  flex: 1;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: gray; */
  /* border-top:  1px solid rgb(50, 60, 110); */
  border-bottom:  1px solid rgb(50, 60, 110);  
  /* border-left:  1px solid rgb(50, 60, 110);  */
  border-right:  1px solid rgb(50, 60, 110);
  /* box-shadow: 0 0 0 0.3px rgb(50, 60, 110) inset; */
  position: relative;
  /* border-radius: 50%;
  overflow: hidden; */
  /* border-bottom: 1px solid rgb(50, 60, 110);  */
}

.moveDiv {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  /* width: 100%;
  height: 100%; */
  background-color: gray;
  /* position: relative; */
  /* transition: all .2s ease; */
  /* transform: rotate(90deg); */
}

.moveHead {
  position: absolute;
  width: 100%;
  height: 22%;
  left: 0;
  top: 0;
  background-color: lightcoral;
}

.moveBody {
  position: absolute;
  width: 100%;
  height: 78%;
  bottom: 0;
  left: 0;
}


.foodDiv {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  /* width: 100%;
  height: 100%; */
  background-color: pink;
}

.btn-group {
  position: absolute;
  bottom: -50px;
  height: 50px;
  width: 100%;
  /* background-color: gray; */
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.btn-group button {
  width: 42px;
  height: 26px;
  line-height: 22px;
  margin: 0 5px;
  font-size: 10px;
  outline: none;
  background-color: transparent;
  border: none;
  border: 2px solid rgb(16, 18, 29);
  color: rgb(16, 18, 29);
  cursor: pointer;
  text-align: center;
  padding: 0;
  transition: all .2s ease;
}

.btn-group button:hover {
  background-color: rgb(16, 18, 29);
  color: white;
}

.btn-group input {
  width: 42px;
  height: 26px;
  line-height: 22px;
  margin: 0 5px;
  font-size: 10px;
  outline: none;
  background-color: transparent;
  border: none;
  border: 2px solid rgb(16, 18, 29);
  color: rgb(16, 18, 29);
  cursor: pointer;
  text-align: center;
  padding: 0;
  transition: all .2s ease;
  box-sizing: border-box;
  cursor: text;
}

.wrap .wrap-cut:last-child {
  /* border: none; */
  /* border-right:  1px solid rgb(50, 60, 110); */
}

.wrap:first-of-type {
  /* border-left: none; */
  /* border-top: none; */
  /* border-right: none; */
}

.wrap {
  /* border-left: none; */
  /* border-bottom: none; */
  /* border-top: none;
  border-right: none; */
}

.wrap:first-of-type .wrap-cut {
  /* border-right: none; */
}

.wrap .wrap-cut:first-child {
  /* border:  */
}

</style>
