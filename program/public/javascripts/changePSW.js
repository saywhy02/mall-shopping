$(function () {
	let nick = JSON.parse(localStorage.getItem("nick"));
	$(".save-btn").click(() => {
		revise();
	});
	function revise() {
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://vueshop.glbuys.com/api/user/myinfo/modpwd?token=1ec949a15fb709370f",
			data: {
				uid: nick[1],
				password: $(".password").val(),
			},
			success: function (data) {
				if (data.code == 302) {
					textTip(data.data, 2000);
				} else {
					textTip(data.data, 2000);
				}
			},
		});
	}
});
