var test1 = document.getElementById('test1');
var test2 = document.getElementById('test2');
var test3 = document.getElementById('test3');
var test4 = document.getElementById('test4');
var test5 = document.getElementById('test5');
var test6 = document.getElementById('test6');

// 获得wifi状态
function loadWifiInfo() {
	//主窗体
	var MainActivity = plus.android.runtimeMainActivity();

	//上下文
	var Context = plus.android.importClass('android.content.Context');

	//导入WIFI管理 和 WIFI信息 的class
	plus.android.importClass('android.net.wifi.WifiManager');
	plus.android.importClass('android.net.wifi.WifiInfo');
	plus.android.importClass('android.net.wifi.ScanResult');
	plus.android.importClass('java.util.ArrayList');

	//获取WIFI管理实例
	var wifiManager = MainActivity.getSystemService(Context.WIFI_SERVICE);

	//获取当前连接的WIFI信息
	var info = wifiManager.getConnectionInfo();

	//获取当前WIFI连接的SSID(WIFI名称)
	var ssid = info.getSSID();

	//这里获取到的名称是带双引号的 如 'cmcc'
	//所以我们这里处理一下
	 ssid = ssid.replace(/(^\"*)|(\"*$)/g,'');

	//打开wifi,false为关闭	
	wifiManager.setWifiEnabled(true);

	//开始扫描	
	wifiManager.startScan();

	//获得wifi结果
	var resultList = wifiManager.getScanResults();
	// console.log(resultList);
	var len = resultList.size();
	var text1 = '';
	for(var i=0; i<len; i++) {
		//console.log(resultList.get[i].plusGetAttribute('SSID'));
		text1 += ((i+1) + '：'+ resultList.get(i).plusGetAttribute('SSID') + '<br>');
	}
	test1.innerHTML = text1;
	test2.innerHTML = wifiManager;
	test3.innerHTML = resultList;
	test4.innerHTML = info + '<br>' + ssid;
}

//获得总内存和剩余内存
function getFileReader() {
	var localFileReader = plus.android.newObject('java.io.fileReader','/proc/meminfo');
	var localBufferedReader = plus.android.newObject('java.io.BufferReader',localFileReader,8192);
	var str1 = localBufferedReader.readLine().toString();
	document.getElementById('test1').innerHTML = str1;
}

//获取手机内存信息
function getMemorySize() {
	var memoryInfo = '';
	if(plus.os.name == 'Android') {
		var Context = plus.android.importClass('android.content.Context');
		var ActivityManager = plus.android.importClass('android.app.ActivityManager');
		var mi = new ActivityManager.MemoryInfo();
		var activityService = plus.android.runtimeMainActivity().getSystemService(Context.ACTIVITY_SERVICE);
		activityService.getMemoryInfo(mi);
		memoryInfo = mi.plusGetAttribute('availMem')
	}
	test5.innerHTML = memoryInfo;
	return memoryInfo;
}

//打开相机
function getCamera() {
	var IntentMana = plus.android.importClass('android.content.Intent');
	var MediaStore = plus.android.importClass('android.provider.MediaStore');
	var App = plus.android.runtimeMainActivity();
	var Uri = plus.android.importClass('android.net.Uri');
	var FILE = plus.android.importClass('java.io.File');
	var intent = new IntentMana(MediaStore.ACTION_IMAGE_CAPTURE);
	var vfile = new FILE('/storage/emulated/0/my/test/img.jpg');
	if(!vfile.exists()) {
		var vDirPath = vfile.getParentFile();
		vDirPath.mkdirs();
	}else {
		alert('文件存在')
	}
	var uri = Uri.fromFile(vfile);
	intent.putExtra(MediaStore.EXTRA_OUTPUT,uri);
	App.startActivityForResult(intent,100);
}

//获得cpu信息
function getCpuInfo() {
	var cpuInfo = '/proc/cpuinfo';
	var temp = '';
	var cpuHardware;
	var fileReader = plus.android.importClass('java.io.FileReader');
	var bufferedReader = plus.android.importClass('java.io.BufferedReader');
	var FileReader = new fileReader(cpuInfo);
	var BufferedReader = new bufferedReader(FileReader,8192);
	while((temp = BufferedReader.readLine()) != null) {
		if(-1 != temp.indexOf('Hardware')) {
			cpuHardware = temp.substr(parseInt(temp.indexOf(':')) + 1);
		}
	}
	test6.innerHTML = cpuHardware;
	return cpuHardware;
}

//获得cpu核数
function getCpuCount() {
	var Runtime = plus.android.importClass('java.lang.Runtime');
	var cpuCount = Runtime.getRuntime().availableProcessors();

	var text2 = test6.innerHTML;
	test6.innerHTML = text2 + '<br>' + cpuCount
	return cpuCount;
}

document.getElementById('btn').addEventListener('tap',function() {
	loadWifiInfo()
	// getFileReader();
//	getCamera();
	getMemorySize();
	getCpuInfo();
	getCpuCount();
	document.getElementsByClassName('soft-container')[0].style.opacity = 1;
}) 

//var mask = mui.createMask();
//mui.alert('弹窗',function() {
//	alert('你关闭了弹窗')
//	mask.close();
//})
//
//
//mask.show();
