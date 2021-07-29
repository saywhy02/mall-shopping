function change() {
	var nickname = document.querySelector(".user-msg .nickname");
	var btn = document.querySelector(".my-menu-list .btn");
	if (localStorage.getItem("isLogin") == "true") {
		nickname.innerHTML = localStorage.getItem("nickname");
		btn.innerHTML = "安全退出";
	} else {
		btn.innerHTML = "登录/注册";
		nickname.innerHTML = "昵称";
	}
}
/* 
    退出登录
*/
function logout() {
	var btn = document.querySelector(".my-menu-list .btn");
	btn.onclick = () => {
		if (localStorage.getItem("isLogin") == "true") {
			$(".overlay").show();
			$(".van-dialog").show();
			$(".van-dialog__message").html("确认要退出吗？");
			$(".van-button")
				.eq(0)
				.click(function () {
					$(".overlay").hide();
					$(".van-dialog").hide();
				});
			$(".van-button")
				.eq(1)
				.click(function () {
					$(".overlay").hide();
					$(".van-dialog").hide();
					textTip("登出中。。。", 1000, function () {
						localStorage.setItem("isLogin", false, 30);
						localStorage.removeItem("nickname");
						change();
					});
				});
		} else {
			jump("../html/03login.html");
		}
	};
	change();
}
logout();

function order() {
	var show = document.querySelector(".order .show-order");
	var item = document.querySelectorAll(".order-status .item");
	show.onclick = () => {
		if (localStorage.getItem("isLogin") == "true") {
			localStorage.setItem("f", 0);
			jump("../html/05order.html#status=all");
		} else {
			jump("../html/03login.html");
		}
	};
	for (let f = 0; f < item.length; f++) {
		item[f].onclick = function () {
			if (localStorage.getItem("isLogin") == "true") {
				localStorage.setItem("f", f + 1);
				jump("../html/05order.html#status=" + f);
			} else {
				localStorage.removeItem("f");
				jump("../html/03login.html");
			}
		};
	}
}
order();
