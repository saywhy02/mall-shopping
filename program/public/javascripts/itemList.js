var cid = [];
axios.get("/classify").then((res) => {
	var itemList = document.querySelector("#item-list #left ul");
	if (res.data.errcode == 0) {
		itemList.innerHTML = res.data.ids
			.map((v, i) => {
				return `
                <li>${v.title}</li>
                `;
			})
			.join("");
	}
	for (let i in res.data.ids) {
		cid.push(res.data.ids[i].cid);
	}
	if (localStorage.getItem("navNet") == null) {
		port(0);
		$("#left ul").children("li:first-child").addClass("active");
	} else {
		let i = localStorage.getItem("navNet");
		port(i);
		$("#left ul li").eq(i).addClass("active");
	}
	localStorage.removeItem("navNet");
	function port(iNow) {
		axios
			.get(
				`http://vueshop.glbuys.com/api/home/category/show?cid=${cid[iNow]}&token=1ec949a15fb709370f`
			)
			.then((res) => {
				var gAll = document.querySelector(".right .rolling .goods-all");
				if (res.data.code == 200) {
					gAll.innerHTML = res.data.data
						.map((v, i) => {
							return `
                            <div class="goods-wrap">
                                <div class="classify-name">${v.title}</div>
                                <div class="goods-items-wrap">
                                </div>
                            </div>
                        `;
						})
						.join("");
					var girlList = document.querySelectorAll(".goods-wrap .goods-items-wrap");
					for (let i = 0; i < res.data.data.length; i++) {
						if (res.data.data[i].goods == null) {
							girlList[i].innerHTML = "";
						} else {
							girlList[i].innerHTML = res.data.data[i].goods
								.map((v, i) => {
									return `
                                <ul class="into-of-list">
                                    <li><img src="${v.image}" alt="" /></li>
                                    <li>${v.title}</li>
                                </ul>
                            `;
								})
								.join("");
						}
					}
					for (let i = 0; i < res.data.data.length; i++) {
						var intoOfList = girlList[i].querySelectorAll(".into-of-list");
						if (res.data.data[i].goods != null) {
							for (let x = 0; x < res.data.data[i].goods.length; x++) {
								intoOfList[x].onclick = function () {
									// console.log(x);
									localStorage.setItem("gid", res.data.data[i].goods[x].gid);
									location.href = "../html/detail.html";
								};
							}
						}
					}
				} else {
					gAll.innerHTML = "没有相关商品！";
				}
				initBScroll("#item-list .right");
			});
	}
	for (let i = 0; i < cid.length; i++) {
		$("ul li")[i].onclick = function () {
			$(this).addClass("active").siblings().removeClass("active");
			port(i);
		};
	}

	initBScroll("#left");
});

// 滚动
function initBScroll(code) {
	var tag = document.querySelector(code);
	var bs = BetterScroll.createBScroll(tag, {
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
}
