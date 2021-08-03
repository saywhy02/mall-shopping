$(
	(document.readyState = function () {
		let strr = JSON.parse(localStorage.getItem("buy"));
		// console.log(strr);
		let oAid = JSON.parse(localStorage.getItem("Aid"));
		let freight = null,
			tPrice = null;
		for (let i in strr) {
			submit(strr[i], i);
		}
		function submit(code, i) {
			$.ajaxSettings.async = false;
			$.ajax({
				type: "GET",
				dataType: "json",
				url:
					"http://vueshop.glbuys.com/api/home/goods/info?gid=" +
					code[0] +
					"&type=details&token=1ec949a15fb709370f",
				success: function (res) {
					// console.log(res.data);
					$(".goods-wrap").append(`
                <div class="goods-list">
                    <div class="image">
                        <img src="${res.data.images[0]}" alt="">
                    </div>
                    <div class="goods-param">
                        <div class="title">
                            ${res.data.title}
                        </div>
                        <div class="attr">
                            <span>颜色： ${code[2]}</span>
                            <span>尺码： ${code[3]}</span>
                        </div>
                        <div class="amount">x ${code[1]}</div>
                        <div class="price">￥${res.data.price}</div>
                    </div>
                </div>
                `);
					freight += res.data.freight;
					tPrice += res.data.price * code[1];
					let sum = freight + tPrice;
					$(".total-wrap:eq(1) li:eq(1)").html("￥" + freight);
					$(".total-wrap:eq(0) li:eq(1)").html("￥" + tPrice);
					$(".price-wrap span:eq(1)").html("￥" + sum);
				},
			});
			let nick = JSON.parse(localStorage.getItem("nick"));
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
			$.ajaxSettings.async = true;
		}
		if (oAid != null) {
			$.ajax({
				type: "GET",
				dataType: "json",
				url:
					"http://vueshop.glbuys.com/api/user/address/defaultAddress?uid=" +
					oAid[0] +
					"&token=1ec949a15fb709370f",
				success: function (data) {
					console.log(data);
					$(".receiver").html(`
                <div class="persion-info">
                    <span>收货人：${data.data.name}</span>
                    <span>${data.data.cellphone}</span>
                </div>
                <div class="address">
                    <img src="../images/home/cart/map.png" alt="">
                    <span>${data.data.province}${data.data.city}${data.data.area}${data.data.address}</span>
                </div>
                <div class="address-null" style="display: none;">您的收货地址为空,点击添加收货地址</div>
            <div class="arrow"></div>
            `);
					if (data.code == 201) {
						$(".persion-info").hide();
						$(".address").hide();
						$(".address-null").show();
					}
				},
			});
		} else {
			$(".receiver").html(`
            <div class="address-null" style="display: none;">您的收货地址为空,点击添加收货地址</div>
            <div class="arrow"></div>
            `);
			$(".address-null").show();
		}
		$(".address-wrap").click(function () {
			jump("../html/cartAdd.html");
		});

		let nick = JSON.parse(localStorage.getItem("nick"));
		let aid = localStorage.getItem("aid");
		$(".balance-btn").click(function () {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "http://vueshop.glbuys.com/api/order/add?token=1ec949a15fb709370f",
				data: {
					uid: nick[1],
					freight: freight,
					addsid: aid,
					goodsData: localStorage.getItem("cartData"),
				},
				success: function (data) {
					// console.log(data);
					jump("../html/submitOrder.html");
				},
			});
		});
	})
);
$(function () {
	let nick = JSON.parse(localStorage.getItem("nick"));
	let oAid = JSON.parse(localStorage.getItem("Aid"));
	$.ajax({
		type: "GET",
		dataType: "json",
		url:
			"http://vueshop.glbuys.com/api/user/address/info?uid=" +
			nick[1] +
			"&token=1ec949a15fb709370f",
		data: {
			aid: oAid,
		},
		success: function (data) {
			console.log(data);
			localStorage.setItem("aid", data.data.aid);
			$(".receiver").html(`
                <div class="persion-info">
                    <span>收货人：${data.data.name}</span>
                    <span>${data.data.cellphone}</span>
                </div>
                <div class="address">
                    <img src="../images/home/cart/map.png" alt="">
                    <span>${data.data.province}${data.data.city}${data.data.area}${data.data.address}</span>
                </div>
                <div class="address-null" style="display: none;">您的收货地址为空,点击添加收货地址</div>
            <div class="arrow"></div>
            `);
			if (data.code == 201) {
				$(".persion-info").hide();
				$(".address").hide();
				$(".address-null").show();
			}
		},
	});
});
