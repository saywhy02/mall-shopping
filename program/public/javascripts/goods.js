$(function () {
	$(".search-top .search-wrap").click(function () {
		$(".search-component").show();
	});
	axios({
		method: "GET",
		url: "http://vueshop.glbuys.com/api/home/public/hotwords?token=1ec949a15fb709370f",
	}).then((res) => {
		$(".search-keywords-wrap:eq(1)").html(
			res.data.data.map((v, i) => {
				return `<div class="keywords">${v.title}</div>`;
			})
		);
		$(".search-keywords-wrap:eq(1) .keywords").each(function (index) {
			$(this).click(function () {
				$(".search-keywords-wrap:eq(0)").prepend(
					`<div class="keywords">${res.data.data[index].title}</div>`
				);
				let searchFor = $(".search-keywords-wrap:eq(1) .keywords").eq(index).html();
				localStorage.setItem("kword", searchFor);
				nameData1(searchFor);
				nameData2(searchFor);
				$(".search-component").hide();
			});
		});
	});
	var goodsMain = document.querySelector(".goods-main");
	let searchFor = localStorage.getItem("kword");
	nameData1(searchFor);
	nameData2(searchFor);
	function nameData1(code) {
		searchFor = localStorage.getItem("kword");
		axios({
			method: "GET",
			url:
				"http://vueshop.glbuys.com/api/home/goods/search?kwords=" +
				code +
				"&otype=all&token=1ec949a15fb709370f",
		}).then((res) => {
			goodsMain.innerHTML = "";
			if (res.data.code == 200) {
				for (let j = 0; j < res.data.pageinfo.pagenum; j++) {
					axios
						.get(
							"http://vueshop.glbuys.com/api/home/goods/search?kwords=" +
								code +
								"&otype=all&token=1ec949a15fb709370f&page=" +
								(j + 1)
						)
						.then((response) => {
							goodsMain.innerHTML += response.data.data.map((v, i) => {
								return `
                            <div class="goods-list">
                                <div class="image">
                                    <img src="${v.image}" alt="">
                                </div>
                                <div class="goods-content">
                                    <div class="goods-title">${v.title}
                                    </div>
                                    <div class="price">¥${v.price}</div>
                                    <div class="sales">
                                        销量<span>${v.sales}</span>件
                                    </div>
                                </div>
                            </div>`;
							});
							$(".search-text").html(code);
							$(".goods-list").each(function (i) {
								$(this).click(() => {
									jump("../html/detail.html");
									localStorage.setItem("gid", res.data.data[i].gid);
								});
							});
						});
				}
			} else {
				goodsMain.innerHTML = `
                <div class="no-data">没有相关商品！</div>
                `;
			}
		});
	}
	$(".bin").click(function () {
		$(".overlay").show();
		$(".van-dialog").show(300);
		$(".van-button:eq(0)").click(function () {
			$(".van-overlay").hide();
			$(".van-dialog").hide(300);
		});
		$(".van-button:eq(1)").click(function () {
			$(".overlay").hide();
			$(".van-dialog").hide(300);
			$(".search-keywords-wrap:eq(0) .keywords").remove();
		});
	});
	// 综合
	$(".order-text").each(function (i) {
		let off = true;
		$(this).click(() => {
			$(".order-text").eq(i).addClass("active");
			if (i == 0) {
				console.log(i);
				if (off == true) {
					$(".order-text").eq(i).addClass("active");
					$(".order-text").eq(1).removeClass("active");
					$(".order-menu").show();
				} else {
					$(".order-text").eq(i).removeClass("active");
					$(".order-menu").hide();
				}
				off = !off;
			} else {
				$(".order-menu").hide();

				goodsMain.innerHTML = "";
				axios({
					method: "GET",
					url:
						"http://vueshop.glbuys.com/api/home/goods/search?kwords=" +
						searchFor +
						"&otype=sales&token=1ec949a15fb709370f",
				}).then((res) => {
					for (let j = 0; j < res.data.pageinfo.pagenum; j++) {
						axios
							.get(
								"http://vueshop.glbuys.com/api/home/goods/search?kwords=" +
									searchFor +
									"&otype=sales&token=1ec949a15fb709370f&page=" +
									(j + 1)
							)
							.then((response) => {
								goodsMain.innerHTML += response.data.data
									.map((v, i) => {
										return `
                                    <div class="goods-list">
                                        <div class="image">
                                            <img src="${v.image}" alt="">
                                        </div>
                                        <div class="goods-content">
                                            <div class="goods-title">${v.title}
                                            </div>
                                            <div class="price">¥${v.price}</div>
                                            <div class="sales">
                                                销量<span>${v.sales}</span>件
                                            </div>
                                        </div>
                                    </div>`;
									})
									.join("");

								$(".goods-list").each(function (i) {
									$(this).click(() => {
										jump("../html/detail.html");
										localStorage.setItem("gid", res.data.data[i].gid);
									});
								});
							});
					}
				});
			}
		});
	});
	let highAndLow = ["all", "up", "down"];
	$(".order-menu li").each(function (i) {
		$(this).click(() => {
			goodsMain.innerHTML = "";
			$(this).addClass("active").siblings().removeClass("active");
			$(".order-menu").hide();
			axios({
				method: "GET",
				url:
					"http://vueshop.glbuys.com/api/home/goods/search?kwords=" +
					searchFor +
					"&otype=" +
					highAndLow[i] +
					"&token=1ec949a15fb709370f",
			}).then((res) => {
				for (let j = 0; j < res.data.pageinfo.pagenum; j++) {
					axios
						.get(
							"http://vueshop.glbuys.com/api/home/goods/search?kwords=" +
								searchFor +
								"&otype=" +
								highAndLow[i] +
								"&token=1ec949a15fb709370f&page=" +
								(j + 1)
						)
						.then((response) => {
							goodsMain.innerHTML += response.data.data.map((v, i) => {
								return `
                                <div class="goods-list">
                                    <div class="image">
                                        <img src="${v.image}" alt="">
                                    </div>
                                    <div class="goods-content">
                                        <div class="goods-title">${v.title}
                                        </div>
                                        <div class="price">¥${v.price}</div>
                                        <div class="sales">
                                            销量<span>${v.sales}</span>件
                                        </div>
                                    </div>
                                </div>`;
							});

							$(".goods-list").each(function (i) {
								$(this).click(() => {
									jump("../html/detail.html");
									localStorage.setItem("gid", res.data.data[i].gid);
								});
							});
						});
				}
			});
		});
	});
	axios({
		method: "GET",
		url: "http://vueshop.glbuys.com/api/home/category/menu?token=1ec949a15fb709370f",
	}).then((res) => {
		$(".item-wrap:eq(0)").html(
			res.data.data.map((v, i) => {
				return `<div class="item">${v.title}</div>`;
			})
		);
		for (let i in $(".item")) {
			$(".item")
				.eq(i)
				.click(() => {
					$(".item").eq(i).addClass("active").siblings().removeClass("active");
					if (i >= 24 && i <= 29) {
						let price = $(".item").eq(i).html();
						let index = price.lastIndexOf("-");
						price1 = price.substring(0, index);
						price2 = price.substring(index + 1, price.length);
						$(".price-input:eq(0) input").val(price1);
						$(".price-input:eq(1) input").val(price2);
					}
				});
			$(".handel-wrap .in").click(() => {
				$(".item").eq(i).removeClass("active");
			});
		}
	});
	function nameData2(code) {
		searchFor = localStorage.getItem("kword");
		axios({
			method: "GET",
			url:
				"http://vueshop.glbuys.com/api/home/goods/param?kwords=" +
				code +
				"&token=1ec949a15fb709370f",
		}).then((res) => {
			$(".attr:eq(1)").html(template("right", res.data));
			$(".attr:eq(1) .attr-wrap").each(function (index) {
				try {
					$(".attr:eq(1) .item-wrap")
						.eq(index)
						.html(
							res.data.data[index].param.map((v, i) => {
								return `<div class="item">${v.title}</div>`;
							})
						);
				} catch (error) {
					$(".attr:eq(1) .attr-wrap").eq(index).hide();
				}
			});
			$(".attr:eq(1) .item").each(function (i) {
				$(this).click(() => {
					$(this).addClass("active");
				});
			});
			$(".attr-title-wrap").each(function (i) {
				let off = true;
				$(this).click(() => {
					if (off) {
						$(".item-wrap").eq(i).hide();
					} else {
						$(".item-wrap").eq(i).show();
					}
					off = !off;
				});
			});
			$(".handel-wrap .in").click(() => {
				$(".item").each(function (i) {
					$(".item").eq(i).removeClass("active");
				});
			});
			$(".spn").html($(".goods-list").length);
		});
	}
});
$(".screen-btn").click(() => {
	$(".mask").show();
	$(".screen").css("transform", "translateX(0)");
});
$(".mask").click(() => {
	$(".mask").hide();
	$(".screen").css("transform", "translateX(100%)");
});
try {
	let tag = document.getElementById("screen");
	let bs = BetterScroll.createBScroll(tag, {
		pullDownRefresh: {
			threshold: 30,
		},
		pullUpLoad: {
			threshold: -30,
		},
		click: true,
	});
	bs.on("pullingDown", () => {
		bs.finishPullDown();
		bs.refresh();
	});
	bs.on("pullingUp", () => {
		bs.finishPullDown();
		bs.refresh();
	});
} catch (error) {}
