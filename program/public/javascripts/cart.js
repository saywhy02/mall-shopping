var amount = [];
var freight = [];
$(function () {
	if (localStorage.getItem("cartData") != null) {
		var cartData = JSON.parse(localStorage.getItem("cartData"));
		var cartMain = document.querySelector(".cart-main");
		for (let i = 0; i < cartData.length; i++) {
			cartMain.innerHTML += `
            <div class="cart-list">
                <div class="select-btn active"></div>
                <div class="image-wrap">
                    <div class="image">
                        <img
                            src="${cartData[i].image}"
                        />
                    </div>
                    <div class="del">删除</div>
                </div>
                <div class="goods-wrap">
                    <div class="goods-title">${cartData[i].title}</div>
                    <div class="goods-attr">
                    </div>
                    <div class="buy-wrap">
                        <div class="price">￥<b>${cartData[i].price}</b></div>
                        <div class="amount-input-wrap">
                            <div class="btn dec active">-</div>
                            <div class="amount-input">
                                <input type="tel" />
                            </div>
                            <div class="btn inc">+</div>
                        </div>
                    </div>
                </div>
            </div>
            `;
			freight.push(cartData[i].freight);
		}
		for (let i = 0; i < cartData.length; i++) {
			var gAttr = document.querySelectorAll(".goods-attr");
			var keyName = Object.keys(cartData[i]);
			var value = Object.values(cartData[i]);
			for (let key = 5; key < keyName.length - 1; key++) {
				gAttr[i].innerHTML += `
                    <span>${keyName[key] + "：" + value[key]}</span>
				`;
			}
			// 输入框
			amount[i] = cartData[i].amount;
			$(".amount-input input").val(amount[i]);
			$(".amount-input input").bind("input", function (ev) {
				if ($(".amount-input input").val() < 1) {
					amount[i] = 1;
					$(".dec").add("active");
					$(".amount-input input").val(amount[i]);
				}

				amount[i] = $(".amount-input input").val();
			});
		}

		for (let i = 0; i < cartData.length; i++) {
			// 减
			$(".dec")
				.eq(i)
				.click(function () {
					if (amount[i] <= 1) {
						amount[i] = 1;
						$(".amount-input input").eq(i).val(amount[i]);
					} else {
						amount[i]--;
						$(".amount-input input").eq(i).val(amount[i]);
					}
					totals();
				});
		}
		for (let i = 0; i < cartData.length; i++) {
			// 加
			$(".inc")
				.eq(i)
				.click(function () {
					amount[i]++;
					$(".amount-input input").eq(i).val(amount[i]);
					totals();
				});
		}
		totals();
		$(".select-btn").each(function (i) {
			let temp = true;
			$(this).click(() => {
				if (temp == true) {
					$(this).removeClass("active");
					$("#freight").html("￥" + 0);
					temp = !temp;
				} else {
					$(this).addClass("active");
					$("#freight").html("￥" + Math.max.apply(null, freight));
					temp = !temp;
				}
				totals();
			});
			$(".chose-all").click(() => {
				if (temp == true) {
					$(".chose-btn").removeClass("active");
					$(".select-btn").removeClass("active");
					$("#freight").html("￥" + 0);
					temp = !temp;
				} else {
					$(".chose-btn").addClass("active");
					$(".select-btn").addClass("active");
					$("#freight").html("￥" + Math.max.apply(null, freight));
					temp = !temp;
				}
				totals();
			});
			$(".del")
				.eq(i)
				.click(function () {
					$(".cart-list").eq(i).remove();
					totals();
					cartData.splice(i, 1);
					if (cartData.length != 0) {
						cartData = JSON.stringify(cartData);
						localStorage.setItem("cartData", cartData);
					} else {
						localStorage.removeItem("cartData");
						location.reload();
					}
				});
			$(".settlement-btn").click(() => {
				if (!$(".settlement-btn").hasClass("disable")) {
					if (localStorage.getItem("isLogin") == "true") {
						Settlement();
						jump("../html/sure.html");
					} else {
						jump("../html/login.html");
					}
				}
			});
		});

		$.ajax({
			type: "post",
			url: "http://vueshop.glbuys.com/api/home/user/safe?token=1ec949a15fb709370f",
			data: {
				uid: nick[1],
				auth_token: nick[0],
			},
			success: function (data) {
				console.log(data);
			},
		});
	}
});
function Settlement() {
	var cartData = JSON.parse(localStorage.getItem("cartData"));
	let arr = [];
	$(".select-btn.active").each((i) => {
		var value = Object.values(cartData[i]);
		let mu = [];
		mu.push(cartData[i].gid);
		mu.push(
			$(".select-btn.active")
				.eq(i)
				.parents(".cart-list")
				.children(".goods-wrap")
				.children(".buy-wrap")
				.children(".amount-input-wrap")
				.children(".amount-input")
				.children("input")
				.val()
		);
		mu.push(value[5]);
		mu.push(value[6]);
		arr.push(mu);
	});
	console.log(arr);
	window.localStorage.setItem("buy", JSON.stringify(arr));
}
function totals() {
	let bss = 0;
	if (!$(".select-btn").hasClass("active")) {
		bss = 0;
		$("#settlement").html("￥" + bss.toFixed(1));
		$("#freight").html("￥" + 0);
		$(".chose-btn").removeClass("active");
		$(".settlement-btn").addClass("disable");
	} else {
		$(".select-btn").each(function (i) {
			if ($(".select-btn").eq(i).hasClass("active")) {
				let num = $(".amount-input input").eq(i).val();
				let price = $(".price b").eq(i).text();
				bss += parseInt(num) * parseFloat(price);
			}
			if ($(".select-btn.active").length == $(".cart-list").length) {
				$(".chose-btn").addClass("active");
			} else {
				$(".chose-btn").removeClass("active");
			}
		});
		$(".settlement-btn").removeClass("disable");
		$("#settlement").html("￥" + bss.toFixed(1));
		$("#freight").html("￥" + Math.max.apply(null, freight));
	}
}
