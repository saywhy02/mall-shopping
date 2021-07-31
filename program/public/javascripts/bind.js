$(function () {
	window.onload = function () {
		bind("cellphone", "code-btn", "acode", "prompt");
	};
	let nick = JSON.parse(localStorage.getItem("nick"));
	$(".save-btn").click(() => {
		revise();
	});
	function revise() {
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://vueshop.glbuys.com/api/user/myinfo/updatecellphone?token=1ec949a15fb709370f",
			data: {
				uid: nick[1],
				cellphone: $(".cellphone").val(),
				vcode: $(".code").val(),
			},
			success: function (data) {
				if (data.code == 302) {
					console.log(data);
					textTip(data.data, 2000);
				} else {
					textTip(data.data, 2000);
				}
			},
		});
	}
	function bind(cellphone, codebtn, prompt) {
		var oCellphone = document.getElementsByClassName(cellphone)[0];
		var code_btn = document.getElementsByClassName(codebtn)[0];
		var oPrompt = document.getElementById(prompt);
		oCellphone.onkeyup = function () {
			if (oCellphone.value.length == 11) {
				code_btn.style.color = "red";
				code_btn.onclick = function () {
					time1(this, oPrompt);
				};
			} else {
				code_btn.style.color = "#717376";
			}
		};
	}

	var srTime = 10;
	function time1(arr, oPrompt) {
		if (srTime == 0) {
			arr.disabled = false;
			arr.style.color = "red";
			arr.value = "获取验证码";
			srTime = 10;
		} else {
			arr.disabled = true;
			arr.value = "重新获取" + "(" + srTime + ")";
			arr.style.color = "#717376";
			srTime--;
			setTimeout(function () {
				time1(arr, oPrompt);
			}, 1000);
		}
	}
});
