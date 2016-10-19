module.exports = {
	alert: {
		getDiv: function() {
			var div = "";
			if ($("._alert_").length > 0) {
				div = $("._alert_")[0];
			} else {
				var d = '<div class="_alert_ weui_mask_transparent"><div class="weui_toast">已完成</div></div>';
				$("body").append(d);
				div = $("._alert_");
			}
			return $(div);
		},
		show: function(msg ,delayHideTime) {
			var div = UI.alert.getDiv();
			if (typeof msg != "string")
				msg = "";
			div.find(".weui_toast").html(msg);
			div.show();
			if (delayHideTime>0){
				setTimeout(function() {
					div.fadeOut();
				},delayHideTime)
			}
		},
		hide: function() {
			var div = UI.alert.getDiv();
			div.hide();
		}
	},
	loading: {
		getDiv: function() {
			var div = "";
			if ($("._loading_").length > 0) {
				div = $("._loading_")[0];
			} else {
				var d = '<div class="_loading_ weui_mask_transparent">	<div class="loader"><div class="loader-inner ball-spin-fade-loader">          <div></div>          <div></div>          <div></div>          <div></div>          <div></div>          <div></div>          <div></div>          <div></div>        </div>      </div></div>';
				$("body").append(d);
				div = $("._loading_");
			}
			return $(div);
		},
		show: function() {
			var div = UI.loading.getDiv();
			div.show();
		},
		hide: function() {
			var div = UI.loading.getDiv();
			div.hide();
		}
	}
}
		