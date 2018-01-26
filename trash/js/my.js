// var myNumber = getDom('.soft-my-number')[0];
// var myPassword = getDom('.soft-my-password');
// var myCode = getDom('.soft-my-code')[0];
// var getCode = getDom('#getCode');
var codeNum = 60;
var codeBol = true;



//账号判断
function numberTest(phone) {
    var reg = /^1[0-9]{10}$/;
    return reg.test(phone);
}

//密码判断
function passwordTest(pas) {
    if(pas.length<6) {
        return '密码长度过短'
    }else if(pas.length > 20){
        return '密码长度过长'
    }else {
        return '密码格式正确'
    }
}

//验证码判断 
function codeTest(code) {
    var reg = /^\d{6}\b/;
    return reg.test(code);
}