var amount = [];
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
                        <div class="price">￥${cartData[i].price}</div>
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
		}
		for (let i = 0; i < cartData.length; i++) {
			var gAttr = document.querySelectorAll(".goods-attr");
			var keyName = Object.keys(cartData[i]);
			var value = Object.values(cartData[i]);
			for (let key = 4; key < keyName.length - 1; key++) {
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
				});
		}
		for (let i = 0; i < cartData.length; i++) {
			// 加
			$(".inc")
				.eq(i)
				.click(function () {
					amount[i]++;
					$(".amount-input input").eq(i).val(amount[i]);
				});
		}
		for (let i = 0; i < cartData.length; i++) {
			$();
		}
	}
});
