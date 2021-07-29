$(function () {
	if (localStorage.getItem("cartNum") != null) {
		axios
			.get(
				"http://vueshop.glbuys.com/api/home/goods/info?gid=" +
					localStorage.getItem("gid") +
					"&type=details&token=1ec949a15fb709370f"
			)
			.then((res) => {
				var cartData = JSON.parse(localStorage.getItem("cartData"));
				var cartMain = document.querySelector(".cart-main");
				console.log(res.data.data);
				cartMain.innerHTML = `
            <div class="cart-list">
                <div class="select-btn"></div>
                <div class="image-wrap">
                    <div class="image">
                        <img
                            src="${res.data.data.images[0]}"
                        />
                    </div>
                    <div class="del">删除</div>
                </div>
                <div class="goods-wrap">
                    <div class="goods-title">${res.data.data.title}</div>
                    <div class="goods-attr">
                    </div>
                    <div class="buy-wrap">
                        <div class="price">￥${res.data.data.price}</div>
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
				var gAttr = document.querySelector(".goods-attr");
				for (let key in cartData) {
					gAttr.innerHTML += `
                    <span>${key + "：" + cartData[key]}</span>
                `;
				}
				// 输入框
				amount = localStorage.getItem("amount");
				$(".amount-input input").val(amount);
				$(".amount-input input").bind("input", function (ev) {
					if ($(".amount-input input").val() < 1) {
						amount = 1;
						$(".amount-input input").val(amount);
					}
					amount = $(".amount-input input").val();
				});
				// 减
				$(".dec").click(function () {
					if (amount > 1) {
						amount--;
						$(".amount-input input").val(amount);
					} else {
						amount = 1;
						$(".amount-input input").val(amount);
					}
				});
				// 加
				$(".inc").click(function () {
					amount++;
					$(".amount-input input").val(amount);
				});
			});
	}
});
