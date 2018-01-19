function getDom(ele) {
    var symbol = ele.charAt(0);
    var trueEle = ele.substr(1);
    if(symbol === '.') {
        return document.getElementsByClassName(trueEle);
    }
    else if(symbol === '#') {
        return document.getElementById(trueEle);
    }
    else {
        return document.getElementsByTagName(ele);
    }
}