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
// 轮播图
axios.get("/string").then((res) => {
	var sW = document.querySelector(".swiper-wrapper");
	if (res.data.errcode == 0) {
		sW.innerHTML = res.data.ids
			.map((v, i) => {
				return ` 
                    <div class="swiper-slide">
                        <img src="${v.image}" alt="" />
                    </div>
                `;
			})
			.join("");
	}
});
// 导航
axios.get("/nav").then((res) => {
	var nav = document.querySelector(".nav-center");
	if (res.data.errcode == 0) {
		nav.innerHTML = res.data.ids
			.map((v, i) => {
				return ` 
                <div class="nav-con nav-net">
                    <img src="${v.image}" alt="" />
                    <p>${v.title}</p>
                </div>
            `;
			})
			.join("");

		var navNet = document.querySelectorAll(".nav-net");
		for (let i = 0; i < navNet.length; i++) {
			navNet[i].onclick = () => {
				localStorage.setItem("navNet", i);
				jump("../html/item.html");
			};
		}
	}
});
// 物品列表
axios.get("/goods").then((res) => {
	var goods = document.querySelector(".goods");
	var data = res.data;
	if (res.data.errcode == 0) {
		goods.innerHTML = `
            <!-- 潮流女装 -->
            <div class="goods-main">
                <div class="name-ify red">
                    —— ${data.ids[0].title} ——
                </div>

                <div class="goods-row-1">
                    <!-- 1 -->
                    <div class="goods-column into">
                        <div class="goods-title">${data.ids[0].items[0].title}</div>
                        <div class="goods-tip">精品打折</div>
                        <div class="goods-price bgColor-red">${data.ids[0].items[0].price}元</div>
                        <div class="goods-img"><img src="${data.ids[0].items[0].image}" alt="${res.data.ids[0].items[0].title}"></div>
                    </div>

                    <div class="goods-column">
                        <!-- 2 -->
                        <div class="goods-list into">
                            <div class="goods-list-title">
                                ${data.ids[0].items[1].title}
                            </div>
                            <div class="goods-list-tip">品质精挑</div>
                            <div class="goods-list-img">
                                <img
                                    src="${data.ids[0].items[1].image}"
                                    alt="${data.ids[0].items[1].title}"
                                />
                            </div>
                        </div>
                        <!-- 3 -->
                        <div class="goods-list into">
                            <div class="goods-list-title">
                                ${data.ids[0].items[2].title}
                            </div>
                            <div class="goods-list-tip">品质精挑</div>
                            <div class="goods-list-img">
                                <img
                                    src="${data.ids[0].items[2].image}"
                                    alt="${data.ids[0].items[2].title}"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="goods-row-2">
                </div>
            </div>


            <!-- 品牌男装 -->
            <div class="goods-main">
                <div class="name-ify orange">
                    —— ${data.ids[1].title} ——
                </div>
                <div class="goods-row-1">
                    <!-- 1 -->
                    <div class="goods-column-1 into">
                        <div class="goods-title">${data.ids[1].items[0].title}</div>
                        <div class="goods-tip">火爆开售</div>
                        <div class="goods-img"><img src="${data.ids[1].items[0].image}" alt="${data.ids[1].items[0].title}"></div>
                    </div>
                    <!-- 2 -->
                    <div class="goods-column-1 into">
                        <div class="goods-title">${data.ids[1].items[1].title}</div>
                        <div class="goods-tip">火爆开售</div>
                        <div class="goods-img"><img src="${data.ids[1].items[1].image}" alt="${data.ids[1].items[1].title}"></div>
                    </div>
                </div>

                <div class="goods-row-2">
                </div>
            </div>


            <!-- 电脑办公 -->
            <div class="goods-main">
                <div class="name-ify green">
                    —— ${data.ids[2].title} ——
                </div>

                <div class="goods-row-1">
                    <!-- 1 -->
                    <div class="goods-column into">
                        <div class="goods-title">${data.ids[2].items[0].title}</div>
                        <div class="goods-tip">精品打折</div>
                        <div class="goods-price bgColor-green">${data.ids[2].items[0].price}元</div>
                        <div class="goods-img"><img src="${data.ids[2].items[0].image}" alt="${data.ids[2].items[0].title}"></div>
                    </div>
                    <div class="goods-column">
                        <!-- 2 -->
                        <div class="goods-list into">
                            <div class="goods-list-title">
                                ${data.ids[2].items[1].title}
                            </div>
                            <div class="goods-list-tip">品质精挑</div>
                            <div class="goods-list-img">
                                <img
                                    src="${data.ids[2].items[1].image}"
                                    alt="${data.ids[2].items[1].title}"
                                />
                            </div>
                        </div>
                        <!-- 3 -->
                        <div class="goods-list into">
                            <div class="goods-list-title">
                                ${data.ids[2].items[2].title}
                            </div>
                            <div class="goods-list-tip">品质精挑</div>
                            <div class="goods-list-img">
                                <img
                                    src="${data.ids[2].items[2].image}"
                                    alt="${data.ids[2].items[2].title}"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="goods-row-2">
                </div>
            </div>
            `;
	}
	var goodsRow2 = document.querySelectorAll(".goods-row-2");
	for (let i = 0; i < goodsRow2.length; i++) {
		for (let j = data.ids[i].items.length - 4; j < data.ids[i].items.length; j++) {
			goodsRow2[i].innerHTML += `
            <div class="goods-list into">
                <div class="goods-title">
                    ${data.ids[i].items[j].title}
                </div>
                <div class="goods-img">
                    <img src="${data.ids[i].items[j].image}" alt="" />
                </div>
                <div class="price">￥${data.ids[i].items[j].price}</div>
                <div class="price del">￥${data.ids[i].items[j].price * 2}</div>
            </div>
            `;
		}
	}
	var arr = [];
	var into = document.querySelectorAll(".into");
	for (let x = 0; x < data.ids.length; x++) {
		for (let y = 0; y < data.ids[x].items.length; y++) {
			arr.push(data.ids[x].items[y].gid);
		}
	}
	for (let x = 0; x < arr.length; x++) {
		into[x].onclick = () => {
			localStorage.setItem("gid", arr[x], 30);
			location.href = "../html/detail.html";
		};
	}
});
axios.get("/recommend").then((res) => {
	var goods = document.querySelector(".goods-recommends");
	if (res.data.errcode == 0) {
		goods.innerHTML = res.data.ids
			.map((v, i) => {
				return `
            <div class="goods-list into-of">
                <div class="goods-img"><img src="${v.image}"alt="">
                </div>
                <div class="goods-title">${v.title}</div>
                <div class="goods-price">￥${v.price}</div>
            </div>
            `;
			})
			.join("");
	}
	var intoOf = document.querySelectorAll(".into-of");
	for (let x = 0; x < res.data.ids.length; x++) {
		intoOf[x].onclick = function () {
			localStorage.setItem("gid", res.data.ids[x].gid, 30);
			location.href = "../html/detail.html";
		};
	}
});

window.onscroll = function () {
	var head = document.getElementsByTagName("header")[0];
	var getScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	if (getScrollTop < 150) {
		head.className = "head";
	} else {
		head.className = "head scroll";
	}
};

function log() {
	var btn = document.querySelector(".head span");
	if (localStorage.getItem("isLogin") == "true") {
		btn.innerHTML = '<img src="../images/home/index/my.png"/>';
	} else {
		btn.innerHTML = "登录";
	}
}
