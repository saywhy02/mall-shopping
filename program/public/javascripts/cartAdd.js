$(function () {
	$(".address-nav-name-2")[0].onclick = function () {
		//添加地址
		jump("../html/address.html");
	};

	function address() {
		//渲染地址栏
		var arr = [];
		let nick = JSON.parse(localStorage.getItem("nick"));
		let oAid = JSON.parse(localStorage.getItem("Aid"));
		axios({
			method: "get",
			url:
				"http://vueshop.glbuys.com/api/user/address/index?uid=" +
				nick[1] +
				"&token=1ec949a15fb709370f",
		}).then((res) => {
			var result = res.data.data;
			console.log(res);
			if (res.data.status == 1) {
				$(".box")[0].innerHTML = addressResult(result);
			} else {
				$(".box")[0].innerHTML = "";
				$(".no-data").show();
			}
			for (let i = 0; i < $(".edit").length; i++) {
				arr.push(result[i].aid);
				//修改收货地址
				$(".edit")[i].onclick = function () {
					localStorage.setItem("Aid", arr[i]);
					jump("../html/changeAdd.html");
				};
				//删除收货地址
				$(".del")[i].onclick = function () {
					$(".overlay").show();
					$(".van-dialog").show();
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
							deLete();
						});
				};
				function deLete() {
					$.ajax({
						type: "GET",
						dataType: "json",
						url:
							"http://vueshop.glbuys.com/api/user/address/del?uid=" +
							oAid[0] +
							"&aid=" +
							oAid[1] +
							"&token=1ec949a15fb709370f",
						success: function (data) {
							console.log(data);
							textTip(data.data, 2000);
						},
					});
				}
				if (res.data.data[i].isdefault == 1) {
					$(".address-info-wrap")[i].className = "address-info-wrap change";
					$(".address")[i].className = "address change";
				}
				$(".address-info-wrap")[i].onclick = function () {
					localStorage.setItem("Aid", arr[i]);
					back();
				};
			}
		});
	}
	address();

	function addressResult(result) {
		return result
			.map((v, i) => {
				return `
                <div class="address-list">
                    <div class="address-info-wrap">
                        <div class="address-info">
                            <div class="person">
                                <span>${v.name}</span>
                                <span>${v.cellphone}</span></div>
                            <div class="address">
                                <span class="text">${v.province} ${v.city} ${v.area}</span>
                            </div>
                        </div>
                    </div>
                    <div class="handle-wrap">
                        <div class="edit"></div>
                        <div class="del"></div>
                    </div>
                </div>`;
			})
			.join("");
	}
});
