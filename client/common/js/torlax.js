// Create by Eleven 2016-03-04
'use strict';

(function(root, factory) {

	if(typeof define === 'function' && define.amd) {
		// AMD Support
		define(['jquery'], factory);

	}else if(typeof exports === 'object' && module.exports) {
		// CommonJS Support
		module.exports = function(root, jquery) {

			if ( jQuery === undefined ) {

                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }

            }
            factory(jQuery);
		}
	}else{
		// global Support
		root.Torlax = factory(jQuery);
	}

})(this, function($) {

	// common style
	require('../sass/common.scss');

	// 模板引入
	template;
	require('./help');

	// 业务工具库引入
    const fastclick = require('fastclick');
    const wx = require('weixin-js-sdk');
    const Config = require('../../../config');
    const device = require('./device.js');
    const timeCount=require('./countDown.js');
    const md5 = require('./md5.js');
    const env = process.env.NODE_ENV;
    const server = process.env.SERVER_ENV;
    const ImgURL = process.env.STATIC_URL;
    const URL = (Config.url)[env].routeapi[server];
   	const UI = require('./ui');
   	const hostnamepath = (Config.url)[env].HOSTNAME[server];
   	const version = Config.utils.version;


    console.log('env', env);
    console.log('server', server);
    console.log('routeapi', URL);
    console.log('ImgURL', ImgURL);

    // 请求缓冲时间
    var firstTime = new Date().getTime();

	// Torlax constructor
	function Torlax(){
		init();
	}

	// 页面初始化
	function init() {
		fastclick.attach(document.body);
		// Utils.fitRem();

		$(function(){
			// 下载bar
			mod.downloadBar();
			mod.preLoad();
		});
	}

	// 页面服务
	var Pages = {
		setTitle(title) {
			var title = title || document.title;
			if(Utils.isApp()) {
				Utils.bridge.call('setTitle', {title: title});
			}
		}

	}
	// 内部API
	var Utils = {
		hostname: function() {
			return window.location.protocol + hostnamepath;
		},
		isApp: function() {
    		return !!window.navigator.userAgent.match('Torlax');
		},
		fitRem: function() {
			var docEl = document.documentElement;
			var	recalc = function() {
				var clientWidth = docEl.clientWidth;
				if (!clientWidth) return;
				docEl.style.fontSize = 60 * (clientWidth / 750) + 'px';
			};
			if (!document.addEventListener) return false;
			document.addEventListener('DOMContentLoaded', recalc, false);
			window.addEventListener('resize',recalc,false);

		},
		countdown:function(options){
			var options=options||{};
			var countd=timeCount.countDown(options);
			countd.start();
			return countd;
		},
		formatDate:function(date, format){
			date = new Date(date);
                var map = {
                    "M": date.getMonth() + 1, //月份
                    "d": date.getDate(), //日
                    "h": date.getHours(), //小时
                    "m": date.getMinutes(), //分
                    "s": date.getSeconds(), //秒
                    "q": Math.floor((date.getMonth() + 3) / 3), //季度
                    "S": date.getMilliseconds() //毫秒
                };
                format = format.replace(/([yMdhmsqS])+/g, function(all, t){
                    var v = map[t];
                    if(v !== undefined){
                        if(all.length > 1){
                            v = '0' + v;
                            v = v.substr(v.length-2);
                        }
                        return v;
                    }
                    else if(t === 'y'){
                        return (date.getFullYear() + '').substr(4 - all.length);
                    }
                    return all;
                });
                return format;
		},
		countDownFormat:function(s){
			var h = parseInt(s / 36e2);
			var m = parseInt((s - h * 36e2) / 6e1);
			var s = parseInt(s - ((h * 36e2) + (m * 6e1)));
			var hh;var mm;var ss;
			// if(h<10){
			// 	hh='0'+h;
			// }else{
			// 	hh=h
			// }
			// if(m<10){
			// 	mm='0'+m;
			// }else{
			// 	mm=m;
			// }
			// if(s<10){
			// 	ss='0'+s;
			// }else{
			// 	ss=s;
			// }
			return {
				h:h,
				m:m,
				s:s
			}
		},
		dump(data) {
			console.log(data);
			if(typeof data == 'string') {
				data = JSON.parse(data);
			}
			var out = JSON.stringify(data, null, 2);
			var pre = document.createElement('pre');
			pre.innerHTML = out;
			pre.style.padding = '20px';
			pre.style.fontSize = '18px';
			pre.style.fontFamily = 'consolas';
			pre.style.color = '#333';
			document.body.innerHTML = '';
			document.body.appendChild(pre);
		},
		preLoadImg: function(arrs) {
			if(arrs.constructor == Array) {
				var Img = [];
				document.addEventListener('DOMContentLoaded', function(evt){
					for (var i = arrs.length - 1; i >= 0; i--) {
						Img[i] = new Image();
						Img[i].src = arrs[i];
					}
				}, false);
			}
		},
		doSign: function(request) {
			var singStr;
			var watingSignStr = typeof request === 'string' ? request : JSON.stringify(request);
			watingSignStr = watingSignStr == "" ? watingSignStr : watingSignStr + watingSignStr.substr(watingSignStr.length % 2 == 0 ? watingSignStr.length / 2 : watingSignStr.length / 3);
			return singStr = md5(watingSignStr);
		},
		getLabel: function(label) {

		    var query = window.location.search;
		    var getURL = query.slice(1);
		    var arr   = getURL.split('&');
		    var url   = {};
		    arr.forEach( function(element, index) {
		        var temp = element.split('=');
		        url[temp[0]] = temp[1];
		    });
		    return url[label];

		},
		callJS: function(options) {
			var options = options || {};

			if(typeof options.successHandler !== 'function' || typeof options.cancelHandler !== 'function'){
				return false;
			};
			options.signature.debug = env === 'development';
			console.log(options.signature.debug);
			wx.checkJsApi({
			    jsApiList: [
			    // 需要检测的JS接口列表，所有JS接口列表见附录2,
			    	"onMenuShareTimeline",
			    	"onMenuShareAppMessage",
			    	"onMenuShareQQ",
			    	"onMenuShareWeibo",
			    	"onMenuShareQZone"
		    	],
			    success: function(res) {
			        // 以键值对的形式返回，可用的api值true，不可用为false
			        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
			        console.log(res);
			    }
			});

			wx.config(options.signature);

			wx.ready(function(){

				// 分享到朋友圈
				wx.onMenuShareTimeline({
				    title: options.shareTitle,                 // 分享标题
				    link: options.shareUrl,                    // 分享链接
				    imgUrl: options.shareImageUrl,             // 分享图标
					success: options.successHandler,
					cancel: options.cancelHandler
				});

				// 发送给朋友
				wx.onMenuShareAppMessage({
				    title: options.shareTitle,                 // 分享标题
				    desc: options.shareDescription,            // 分享描述
				    link: options.shareUrl,                    // 分享链接
				    imgUrl: options.shareImageUrl,             // 分享图标
				    success: options.successHandler,
				    cancel: options.cancelHandler
				});

				//分享到QQ
				wx.onMenuShareQQ({
				    title: options.shareTitle,                // 分享标题
				    desc: options.shareDescription,           // 分享描述
				    link: options.shareUrl,                   // 分享链接
				    imgUrl: options.shareImageUrl,            // 分享图标
				    success: options.successHandler,
				    cancel: options.cancelHandler
				});

				//分享到腾讯微博
				wx.onMenuShareWeibo({
				   	title: options.shareTitle,              // 分享标题
				    desc: options.shareDescription,         // 分享描述
				    link: options.shareUrl,                 // 分享链接
				    imgUrl: options.shareImageUrl,          // 分享图标
				    success: options.successHandler,
				    cancel: options.cancelHandler
				});

				//分享到QQ空间
				wx.onMenuShareQZone({
				    title: options.shareTitle,              // 分享标题
				    desc: options.shareDescription,         // 分享描述
				    link: options.shareUrl,                 // 分享链接
				    imgUrl: options.shareImageUrl,          // 分享图标
				    success: options.successHandler,
				    cancel: options.cancelHandler
				});
			});

			wx.error(function(res) {
				console.log(res);
			});
		},
		isInstalled: function(){
			var _url = 'torlax' + window.location.href.slice(4);
			// window.location = _url;
		},
		openApp: function() {

		},
		bridge: function(){
			var _bridge = {};

			function connectJSBridge(callback) {
			    if (window.JSBridge) {
	                callback(JSBridge);
	            } else {
	                document.addEventListener('JSBridgeReady', function() {
	                    callback(JSBridge);
	                }, false);
	            }
			};

			_bridge.register = function(method, callback) {

				connectJSBridge(function(bridge) {
					bridge.init(function(message, responseCallback) {
		                bridge.callEventCallback(responseCallback);
		            });
				    bridge.registerEvent(method, callback);
				});

			};

			_bridge.call = function(method, bridgeData, callback) {
				connectJSBridge(function(bridge) {
					bridge.init(function(message, responseCallback) {
		                bridge.callEventCallback(responseCallback);
		            });
				    bridge.send(method, bridgeData, callback);
				});

			};

			return _bridge;
		},
		request: function(url, data, callback) {
			if(typeof data !== 'object'){ throw new Error('请求参数错误shit!');};
			if(url.substr(-1) != '/') {
				url = url + '/';
			}
			var flatData = {};
			for (var key in data) {
				// statement
				if(key !== 'UID' && key !== 'Token') {
					flatData[key] = data[key];
				}
			}
			var requestData = {
		        Data: flatData,
		        Header: {
		            ClientIP: '',
		            ClientName: 'H5',
		            ClientVersion: version,
		            DeviceId: '',
		            DeviceType: T.device.ios ? 'IOS' : 'Android',
		            Timestamp: function(){
		            	// 请求缓冲时间
    					var timeStamp = (new Date().getTime() - (firstTime + 10*60*1000)) ? new Date().getTime() : firstTime;
    					return timeStamp;
		            },
		            Token: data.Token || '',
		            UID: data.UID || 0,
		            ChannelSource: ''
		        },
		        DistributorType: 8
		    };
		    var sign = Utils.doSign(requestData);

		    var request_url = URL + url + sign;
			$.ajax({
		        url: request_url,
		        type: 'POST',
		        // contentType: 'application/json; charset=utf-8',
		        // beforeSend: function(request) {
		        //     request.setRequestHeader('Sign', sign);
		        // },
		        data: JSON.stringify(requestData),
		        success: function(data) {
		        	// var responseData = JSON.parse(data)['Data'];
		        	var responseData = JSON.parse(data.replace(/http(|s):(?=\/\/)/gi, window.location.protocol))['Data'];
					// var MessageData = JSON.parse(data)['Data'];
		        	if(responseData) {
		        		callback(responseData);
		        	} else {
		        		env === 'production' ? mod.error() : Utils.dump(data);
		        	}
		        }
		    })
		    .fail(function(xhr) {
		       env === 'production' ? mod.error() : Utils.dump(data);
		    });
		},
		router: function() {
			var _O = {};
			for (var path in Config.path) {
				if(!Config.path.hasOwnProperty(path)){ return false;}
				var temp = function(_path) {
					if(path === 'wxShare') {
						return function(options) {
							if(typeof options !== 'object') {
								return false;
							}
							Utils.request(_path, {Url: window.location.href}, function(data){
								options.signature = data;
								options.successHandler = function(res) {
									console.log(res);
								}
								options.cancelHandler = function(res) {
									console.log(res);
								}
								console.log(options);
								Utils.callJS(options);
							});
						}
					}else{
						return function(data, callback) {
							if(typeof data !== 'object') {
								return false;
							}
							Utils.request(_path, data, callback);
						}
					}
				};
				_O[path] = temp(Config.path[path]);
			};
			return _O;
		},
		goto(url) {
			if(typeof url === 'string') {
				window.location.href = url;
			}
		},
		getUrl() {
			return window.location.href;
		},
		DeviceLocation() {
			var url = Utils.getUrl();
			console.log(url);
			if(!device.ios || !device.android) {
				if(url.match(/taolx.com$/)) {
					Utils.goto('http://www.taolx.com/');
				}
			}
		}
	};

	// 页面模块
	var mod = {
		downloadBar: function() {
			var DOM = require('../layout/downloadBar.html');
			var $type = $('#page-type');
			var $body = $('body');
			$(function(){
				if(!Utils.isApp()){
					if($type.data('pagetype').match('downloadbar')) {
						if($type.data('pagetype').match('downloadbar-bottom')) {
							$body.append(DOM);
							$(".download-bar-wrapper").css({
								"top":"inherit",
								"bottom":0
							});
							$(".hidden-download-bar-bg").hide();
							$(".hidden-download-bar-ele2").hide();
						}else if($type.data('pagetype').match('downloadbar-footer-bottom')){
							$body.append(DOM);
							$(".download-bar-wrapper").css({
								"top":"inherit",
								"bottom":"2rem"
							});
							$(".hidden-download-bar-bg").hide();
							// $(".hidden-download-bar-ele").hide();
						}else{
							$body.prepend(DOM);
							$(".hidden-download-bar-ele2").hide();
						}
						$(".close_btn").on("click",function(){
							if($type.data('pagetype').match('downloadbar-footer-bottom')){
								$(".download-bar-wrapper").hide();
								$(".hidden-download-bar-bg").hide();
								// $(".hidden-download-bar-ele").hide();
								$(".hidden-download-bar-ele2").hide();
							}else{
								$(".download-bar-wrapper").hide();
								$(".hidden-download-bar-bg").hide();
								$(".hidden-download-bar-ele").hide();
								$(".hidden-download-bar-ele2").hide();
							}
						})
						$('.openAppBtn').on('click', function(){
							var url;
							if($type.data('pagetype').match('activity')) {
								url = 'torlax://#';
								$(this).attr('href', url);
							}else{
								url = 'torlax' + window.location.href.slice(window.location.href.indexOf(':'));
								$(this).attr('href', url);
								setTimeout(function(){
									window.location="http://a.app.qq.com/o/simple.jsp?pkgname=com.torlax.tlx";
								}, 1500);
							}
						});
						if(env === 'production') {
							$('[data-track]').on('click', function() {
							 	var url = $(this).attr('href');
								window._hmt && window._hmt.push(['_trackEvent', '淘旅行APP下载', 'click', url]);
							});
						}
						if(device.isWeixin) {
							$('.openAppBtn').hide();
						}
					}
				}
			})
		},
		error() {
			var DOM = require('../layout/error.html');
			$(function(){
				$('body').empty().html(DOM);
			});
		},
		preLoad() {
			// var DOM = require('../layout/loading.html');
			$(window).on('load', function(){
				$('.loading').hide();
			});
		}
	}

	// 全局方法
	Torlax.prototype = {
		constructor: Torlax,
		Mod: mod,
		Router: Utils.router(),
		Bridge: Utils.bridge(),
		device: device,
		Utils: {
			getLabel: Utils.getLabel,
			isApp: Utils.isApp,
			dump: Utils.dump,
			fitRem: Utils.fitRem,
			countDown:Utils.countdown,
			formatDate:Utils.formatDate,
			countDownFormat:Utils.countDownFormat
		},

	};

	window.T = new Torlax();
	window.UI = UI;

	window.HOSTNAME = Utils.hostname();
	window.HOSTURL = Utils.hostname() + version + '/';
	window.ImgURL = ImgURL;
	window.ShareImgURL = window.location.protocol + ImgURL;
	window.template = template;

	return window;

})
