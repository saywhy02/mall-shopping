var attr = {}; // 存放颜色值等
var sttr = {}; // 存放颜色标题
// 顶部选项
$().ready(function () {
	$(".detail-tab .tab-name").click(function () {
		var _index = $(this).index();
		$(".sub-page").eq(_index).show().siblings().hide();
		$(this).addClass("active").siblings().removeClass("active");
	});
});

// 购物车的点
window.onload = function () {
	if (localStorage.getItem("cartData") != null) {
		$(".cart-icon .dot").show();
	} else {
		$(".cart-icon .dot").hide();
	}
};

// 轮播图
var mySwiper = new Swiper(".swiper-container", {
	autoplay: true,
	speed: 200,
	autoplay: {
		disableOnInteraction: false,
	},

	// 如果需要分页器
	pagination: {
		el: ".swiper-pagination",
	},
	observer: true, //修改swiper自己或子元素时，自动初始化swiper
	observeParents: true, //修改swiper的父元素时，自动初始化swiper
	onSlideChangeEnd: function (swiper) {
		swiper.update();
		mySwiper.startAutoplay();
		mySwiper.reLoop();
	},
});
// 物品接口
axios
	.get(
		"http://vueshop.glbuys.com/api/home/goods/info?gid=" +
			localStorage.getItem("gid") +
			"&type=details&token=1ec949a15fb709370f"
	)
	.then((res) => {
		var sW = document.querySelector(".swiper-wrapper");
		for (let i = 0; i < res.data.data.images.length; i++) {
			sW.innerHTML += ` 
                <div class="swiper-slide">
                    <img src="${res.data.data.images[i]}" alt="" />
                </div>
            `;
		}
		var title = document.querySelector(".goods-ele-main");
		title.innerHTML = `
            <div class="goods-title">
                ${res.data.data.title}
            </div>
            <div class="price">
                ￥${res.data.data.price}
            </div>
            <ul class="sales-wrap">
                <li>快递：${res.data.data.freight}元</li>
                <li>月销量${res.data.data.sales}件</li>
            </ul>
        `;
		var content = document.querySelector(".content");
		content.innerHTML = `
            ${res.data.data.bodys}
        `;
		var goodsImg = document.querySelector(".goods-img");
		goodsImg.innerHTML = `
            <img src="${res.data.data.images[0]}" alt="" />
        `;
		var goodsWrap = document.querySelector(".goods-wrap");
		goodsWrap.innerHTML = `
            <div class="goods-title">
                ${res.data.data.title}
            </div>
            <div class="price">¥${res.data.data.price}</div>
            <div class="goods-code">商品编码:${res.data.data.gid}</div>
        `;
		attr.gid = res.data.data.gid;
		attr.image = res.data.data.images[0];
		attr.title = res.data.data.title;
		attr.price = res.data.data.price;
		attr.freight = res.data.data.freight;
	});
// 评价
axios
	.get(
		"http://vueshop.glbuys.com/api/home/reviews/index?gid=" +
			window.localStorage.getItem("gid") +
			"&token=1ec949a15fb709370f"
	)
	.then((res) => {
		var reviews = document.querySelectorAll(".reviews-main");
		if (res.data.status == 1) {
			for (let i = 0; i < reviews.length; i++) {
				reviews[i].innerHTML = `
                    <div class="reviews-title">商品评价（${res.data.pageinfo.total}）</div>
                    <div class="reviews-wrap"></div>
                `;
				var rW = reviews[0].querySelector(".reviews-wrap");
				var rWall = reviews[1].querySelector(".reviews-wrap");
				rW.innerHTML = res.data.data
					.map((v, i) => {
						return `
                        <div class="reviews-list">
                            <div class="uinfo">
                                <div class="head">
                                    <img alt="" src="${v.head}">
                                </div>
                                <div class="nickname">${v.nickname}</div>
                            </div>
                            <div class="reviews-content">${v.content}</div>
                            <div class="reviews-date">${v.times}</div>
                        </div>
                        `;
					})
					.join("");
				rW.innerHTML += `<div class="reviews-more">查看更多评价</div>`;
			}
			$(".reviews-more").click(function () {
				$(".sub-page").eq(2).show().siblings().hide();
				$(".detail-tab")
					.children(":last-child")
					.addClass("active")
					.siblings()
					.removeClass("active");
			});
			for (let j = 0; j < res.data.pageinfo.pagenum; j++) {
				axios
					.get(
						"http://vueshop.glbuys.com/api/home/reviews/index?gid=" +
							window.localStorage.getItem("gid") +
							"&token=1ec949a15fb709370f&page=" +
							(j + 1)
					)
					.then((response) => {
						rWall.innerHTML += response.data.data
							.map((v, i) => {
								return `
                                <div class="reviews-list">
                                    <div class="uinfo">
                                        <div class="head">
                                            <img alt="空" src="${v.head}">
                                        </div>
                                        <div class="nickname">${v.nickname}</div>
                                    </div>
                                    <div class="reviews-content">${v.content}</div>
                                    <div class="reviews-date">${v.times}</div>
                                </div>
                                `;
							})
							.join("");
					});
			}
		} else {
			for (let i = 0; i < reviews.length; i++) {
				reviews[i].innerHTML = `
                    <div class="reviews-title">商品评价（0）</div>
                    <div data-v-a304f74e="" class="no-data">暂无评价！</div>
                `;
			}
		}
	});
// 颜色
axios
	.get(
		"http://vueshop.glbuys.com/api/home/goods/info?gid=" +
			window.localStorage.getItem("gid") +
			"&type=spec&token=1ec949a15fb709370f"
	)
	.then((res) => {
		var attrWrap = document.querySelector(".attr-wrap");
		// 颜色 尺寸
		attrWrap.innerHTML = res.data.data
			.map((v, i) => {
				sttr[i] = v.title;
				return `
                <div class="attr-list">
                    <div class="attr-name">${v.title}</div>
                    <div class="val-wrap">
                    </div>
                </div>
                `;
			})
			.join("");
		var valWrap = document.querySelectorAll(".val-wrap");
		// 值
		for (let i = 0; i < res.data.data.length; i++) {
			valWrap[i].innerHTML = res.data.data[i].values
				.map((v, i) => {
					return `
                    <span class="val">${v.value}</span>
                `;
				})
				.join("");
		}
		if (res.data.data.length == 1) {
			sttr[100] = 1;
		}
		if (res.data.data.length > 2) {
			sttr[101] = 1;
		}
		$(".val-wrap .val").click(function () {
			var _index = $(this).parents(".attr-list").index();
			var _indexChild = $(this).index();
			$(this).addClass("active").siblings().removeClass("active");
			if (_index == 0) {
				attr[sttr[0]] = res.data.data[_index].values[_indexChild].value;
			} else if (_index == 1) {
				attr[sttr[1]] = res.data.data[_index].values[_indexChild].value;
			} else if (_index == 2) {
				attr[sttr[2]] = res.data.data[_index].values[_indexChild].value;
			}
		});
	});
// 加入购物车
$(".cart").click(function () {
	$(".overlay").show();
	$(".cart-panel").removeClass("down").addClass("up");
});

// 收藏
var a = window.localStorage.getItem("gid");
console.log(a);
$(".fav").click(() => {
	collect(nick[1], a);
});
let nick = JSON.parse(localStorage.getItem("nick"));
console.log(nick);
function collect(nick, code) {
	$.ajax({
		type: "GET",
		dataType: "json",
		url:
			"http://vueshop.glbuys.com/api/goods/fav?uid=" +
			nick +
			"&gid=" +
			code +
			"&token=1ec949a15fb709370f",
		success: function (data) {
			if (data.code == 302) {
				console.log(data);
				textTip(data.data);
			} else {
				textTip(data.data);
			}
		},
	});
}
// 关闭
$(".close").click(function () {
	$(".overlay").hide();
	$(".cart-panel").removeClass("up").addClass("down");
});
$(".overlay").click(function () {
	$(".overlay").hide();
	$(".cart-panel").removeClass("up").addClass("down");
});
// 输入框
var amount = 1;
$(".amount-input input").val(1);
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
// 确定
$(".sure-btn").click(function () {
	if (attr[sttr[0]] == null) {
		console.log(111);
		textTip("请选择" + sttr[0], 1000);
	} else if (attr[sttr[1]] == null && sttr[100] != 1) {
		console.log(222);
		textTip("请选择" + sttr[1], 1000);
	} else if (attr[sttr[2]] == null && sttr[101] == 1) {
		console.log(333);
		textTip("请选择" + sttr[2], 1000);
	} else {
		textTip("加入购物车成功", 1000);
		$(".cart-icon .dot").show();

		let attrs = [];
		if ("cartData" in localStorage) {
			try {
				attrs = JSON.parse(localStorage.getItem("cartData"));
			} catch (error) {
				attrs = localStorage.getItem("cartData");
			}
		} else {
			attrs = [];
		}
		attr.amount = amount;
		attrs.push(attr);
		localStorage.setItem("cartData", JSON.stringify(attrs));
	}
});
// 购物车
$(".cart-icon").click(function () {
	localStorage.setItem("li", 1);
	jump("../html/index.html");
});
