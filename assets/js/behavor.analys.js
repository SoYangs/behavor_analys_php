(function(){
	//用户cookie
	document.cookie ="";
    //浏览器标识可以通过cookie等来实现，或者你们也许有更好的方案
    //document.statistics_browser_id = '';
})();

var second = 0;
window.setInterval(function () {
    second ++;
}, 1000);

//关闭、刷新页面之前，页面上埋点
window.onbeforeunload = function() {

    var dataArr = {
            'url' : location.href,
            'time' : second,
            'refer' : getReferrer(),
            'timeIn' : Date.parse(new Date()),
            'timeOut' : Date.parse(new Date()) + (second * 1000)
    };
    
    var params = {};
    if(dataArr){
    	params.url = location.href || '';
    	params.time = dataArr.time || '';
    	params.refer = getReferrer() || '';
    	params.timeIn = dataArr.timeIn || '';
    	params.timeOut = dataArr.timeOut || '';
    }
    //Document对象数据
    if (document) {
    	//每次拿取用户名称
    	params.username = document.cookie || '';
        params.domain = document.domain || '';
        params.title = document.title || '';
    }
    //navigator对象数据,获取用户的默认语言
    if (navigator) {
        params.lang = navigator.language || '';
    }
 
    //拼接参数串，内置函数查询到的信息
    var args = '';
    for (var i in params) {
        if (args != '') {
            args += '&';
        }
        args += i + '=' + params[i];
    }
    //通过Image对象请求后端脚本
    var img = new Image(1, 1);
    var src = '../../receive.php?args=' + encodeURIComponent(args);  //后台接口地址,在web目录可这么写
    img.src = src; 
};

function getReferrer() {
    var referrer = '';
    try {
        referrer = window.top.document.referrer;
    } catch(e) {
        if(window.parent) {
            try {
                referrer = window.parent.document.referrer;
            } catch(e2) {
                referrer = '';
            }
        }
    }
    if(referrer === '') {
        referrer = document.referrer;
    }
    return referrer;
}