
const share = (options) => {

	options = options || {};

	$.ajax({
		url: '/UserSecurityServer/UserServer/GetWeChatPublicPlatformBaseConfig',
		data: {
			Data: {
				Url: window.location.href
			}
		}
	}).then((data)=> {

		data.debug = false;
		let wxConfig = data;

		console.log(options,'options')
		options.successHandler = options.cancelHandler = (res) => {
			console.log(res);
		}
		wx.checkJsApi({
		    jsApiList: [
		    // 需要检测的JS接口列表，所有JS接口列表见附录2,
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'translateVoice',
                'startRecord',
                'stopRecord',
                'onRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'openProductSpecificView',
                'addCard',
                'chooseCard',
                'openCard'
	    	],
		    success: function(res) {
		        // 以键值对的形式返回，可用的api值true，不可用为false
		        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
		        console.log(res);
		    }
		});

		wx.config(wxConfig);

		wx.ready(() => {

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

		wx.error((res) => {
			console.log(res);
		});

	}).fail((error) => {
		console.log(error);
	}).always((xhr, status, error) => {

		console.log(status);
	});
}

export default share;