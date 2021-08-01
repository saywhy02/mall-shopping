let nick = JSON.parse(localStorage.getItem("nick"));
function change() {
	var nickname = document.querySelector(".user-msg .nickname");
	var btn = document.querySelector(".my-menu-list .btn");
	if (localStorage.getItem("isLogin") == "true") {
		nickname.innerHTML = nick[2];
		$(".user-msg .head-pic img").attr("src", nick[4]);
		btn.innerHTML = "安全退出";
	} else {
		$(".user-msg .head-pic img").attr("src", "../images/user/my/default-head.png");
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
						localStorage.setItem("isLogin", false);
						localStorage.removeItem("nick");
						$(".user-msg .head-pic img").attr(
							"src",
							"../images/user/my/default-head.png"
						);
						change();
					});
				});
		} else {
			jump("../html/login.html");
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
			jump("../html/order.html#status=all");
		} else {
			jump("../html/login.html");
		}
	};
	for (let f = 0; f < item.length; f++) {
		item[f].onclick = function () {
			if (localStorage.getItem("isLogin") == "true") {
				localStorage.setItem("f", f + 1);
				jump("../html/order.html#status=" + f);
			} else {
				localStorage.removeItem("f");
				jump("../html/login.html");
			}
		};
	}
}
order();
$(".my-menu-list").each(function () {
	$(".list")
		.eq(0)
		.click(function () {
			if (localStorage.getItem("isLogin") == "true") {
				jump("../html/profile.html");
			} else {
				jump("../html/login.html");
			}
		});
	$(".list")
		.eq(1)
		.click(function () {
			if (localStorage.getItem("isLogin") == "true") {
				jump("../html/choose.html");
			} else {
				jump("../html/login.html");
			}
		});
	$(".list")
		.eq(2)
		.click(function () {
			if (localStorage.getItem("isLogin") == "true") {
				jump("../html/bind.html");
			} else {
				jump("../html/login.html");
			}
		});
	$(".list")
		.eq(3)
		.click(function () {
			if (localStorage.getItem("isLogin") == "true") {
				jump("../html/changePSW.html");
			} else {
				jump("../html/login.html");
			}
		});
	$(".list")
		.eq(4)
		.click(function () {
			if (localStorage.getItem("isLogin") == "true") {
				jump("../html/collection.html");
			} else {
				jump("../html/login.html");
			}
		});
});
