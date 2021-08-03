function on() {
	var btn = document.querySelectorAll(".switch")[0];
	var sv = document.querySelectorAll(".switch-van")[0];
	var node = document.querySelector(".node");
	var off = true;
	btn.onclick = function () {
		if (off) {
			sv.style.backgroundColor = "red";
			node.className = "node on";
			document.querySelector(".psw input").type = "text";
		} else {
			sv.style.backgroundColor = "#fff";
			node.className = "node";
			document.querySelector(".psw input").type = "password";
		}
		off = !off;
	};
}
on();

$(function () {
	$(".sub-btn").click(function () {
		$.ajax({
			type: "post",
			dataType: "json",
			url: "http://vueshop.glbuys.com/api/home/user/pwdlogin?token=1ec949a15fb709370f",
			data: {
				cellphone: $(".tel input").val(),
				password: $(".psw input").val(),
			},
			success: function (data) {
				if (data.code == 302 || data.code == 303) {
					textTip(data.data);
				} else {
					localStorage.setItem("isLogin", true);
					let nick = [];
					nick.push(data.data.auth_token);
					nick.push(data.data.uid);
					nick.push(data.data.nickname);
					localStorage.setItem("nick", JSON.stringify(nick));
					textTip("欢迎回来," + data.data.nickname, 2000, function () {
						back();
					});
				}
			},
		});
	});
});

// function setCookie(key, value, iday) {
// 	var dateObj = new Date();
// 	dateObj.setDate(dateObj.getDate() + iday);
// 	document.cookie = key + "=" + value + ";expires=" + dateObj;
// }
// function getCookie(key) {
// 	var cookieData = document.cookie;
// 	var arr = cookieData.split(";");
// 	for (var i = 0; i < arr.length; i++) {
// 		var arr1 = arr[i].split("=");
// 		if (arr1[0].replace(/^(\s)/g, "") == key) {
// 			return arr1[1];
// 		}
// 	}
// 	return "";
// }
