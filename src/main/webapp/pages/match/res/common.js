'use strict';

var DMS = {};

var browser = {
	versions: function(){
		var u = navigator.userAgent, app = navigator.appVersion;
		return {
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
			qq: u.match(/\sQQ/i) == " qq" //是否QQ
		};
	}(),
	language:(navigator.browserLanguage || navigator.language).toLowerCase()
};

DMS.getToken = function() {
	return DMS.utlis.cookie.get('csrf_token');
};

DMS.utlis = {
	cookie: {
		//sMainName： Cookie名；sSubName：Cookie子键名，留空表示单值Cookie
		get: function (sMainName, sSubName) {
			var re = new RegExp((sSubName ? sMainName + "=(?:.*?&)*?" + sSubName + "=([^&;$]*)" : sMainName + "=([^;$]*)"), "i");
			return re.test(unescape(document.cookie)) ? RegExp["$1"] : "";
		},
		set: function (name, value, expiresSeconds, path, domain) {
			var expires;
			if (typeof (expiresSeconds) == "undefined" || (expiresSeconds == null)) {
				expires = new Date(new Date().getTime() + 24 * 3600 * 1000);
			} else {
				expires = new Date(new Date().getTime() + expiresSeconds * 1000);
			}
			document.cookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path : "; path=/") + ((domain) ? ";domain=" + domain : "");
		},
		clear: function (name, path, domain) {
			if (this.get(name)) {
				document.cookie = name + "=" + ((path) ? "; path=" + path : "; path=/") + ((domain) ? "; domain=" + domain : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
			}
		}
	},
	// 获取当前定位信息 （json） From Sina API
	getLocation: function (callback) {
		var cookieName = "locationinfo",
			json = { province: DMS.utlis.cookie.get(cookieName, "province"), city: DMS.utlis.cookie.get(cookieName, "city") };
		if (json.province == "" || json.city == "") {
			$.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function () {
				if (remote_ip_info && remote_ip_info.ret == 1) {
					json.province = remote_ip_info.province;
					json.city = remote_ip_info.city;
					var area = "province=" + json.province + "&city=" + json.city;
					DMS.utlis.cookie.set(cookieName, area, null, "", null);  // cookie time : 24hour
					if (callback != null) {
						callback(json);
					}
				}
			});
		} else {
			if (callback != null) {
				callback(json);
			}
		};
	},
	// 获取url参数
	getUrlParam: function (name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r!=null) return decodeURIComponent(r[2]);
		return null;
	},
	/**
	 * 获取当前页面URL，不含#号后面的部分
	 * @return {[type]} [description]
	 */
	getPageUri: function () {
		var url = window.location.href;
		var length = url.lastIndexOf('#') > 0 ? url.lastIndexOf('#') : url.length;

		return url.substr(0, length);
	},
	// 验证手机号
	checkPhone: function (phone) {
		var regex = /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|7[^249\D]|8\d)\d{8}$/;
		if(!regex.test(phone)) return false;
		return true;
	},
	// 验证电子邮箱
	checkEmail: function (email) {
		var regex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (!regex.test(email)) return false;
        return true;
	}
};

// 推广邀请状态操作
DMS.invit_code = {
	set:function () {
		var s = DMS.utlis.getUrlParam('s'),
				r = DMS.utlis.getUrlParam('r'),
				q = DMS.utlis.getUrlParam('q');

		if(q) {
			$.jStorage.set('query_string', 'q=' + q);
			$.jStorage.setTTL('query_string', 1000*60*60*2);
		}
		if(r) {
			$.jStorage.set('query_string', 'r=' + r);
			$.jStorage.setTTL('query_string', 1000*60*60*2);
		}
		if(s) {
			$.jStorage.set('query_string', 's=' + s);
			$.jStorage.setTTL('query_string', 1000*60*60*2);
		}

	},
	get:function () {
		var s = DMS.utlis.getUrlParam('s'),
				r = DMS.utlis.getUrlParam('r'),
				q = DMS.utlis.getUrlParam('q');

		if(s) return 's='+s;
		if(r) return 'r='+r;
		if(q) return 'q='+q;

		var qs = $.jStorage.get('query_string');
		if(qs)
			return qs;
	}
}