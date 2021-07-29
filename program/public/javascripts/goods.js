var kwords = localStorage.getItem("kword");
$(".head input").val(kwords);
var type = localStorage.getItem("type");
var param = localStorage.getItem("param");
var price1 = localStorage.getItem("price1");
var price2 = localStorage.getItem("price2");
var cid = localStorage.getItem("cid");

localStorage.setItem("price1", $("#menus .min").val());
localStorage.setItem("price2", $("#menus .max").val());

// 搜索结果
function refresh(kds, ty, par, pce1, pce2, cd) {
	axios({
		method: "GET",
		url:
			"//vueshop.glbuys.com/api/home/goods/search?kwords=" +
			kds +
			"&otype=" +
			ty +
			"&param=" +
			par +
			"&price1=" +
			pce1 +
			"&price2=" +
			pce2 +
			"&cid" +
			cd +
			"&token=1ec949a15fb709370f",
	}).then((res) => {
		$("#wares").html(
			res.data.data.map((v) => {
				return `<ul>
                <li><img src="${v.image}" alt=""></li>
                <li>
                    <p class="title">${v.title}</p>
                    <span class="price">￥${v.price}</span>
                    <p class="sales">销量<span>${v.sales}</span>件</p>
                </li>
            </ul>`;
			})
		);

		$("#wares ul").click(function () {
			jump("../html/06detail.html");
			localStorage.setItem("gid", res.data.data[$(this).index()].gid);
		});

		var off = true;
		$("#sort p span")
			.eq(0)
			.click(function () {
				if (off) {
					$("#sort ul li").css("display", "block");
					$("#sort p i").css("background-image", " url(../images/home/goods/up.png)");
					$("#sort p span").eq(0).addClass("active");
					$("#sort ul li").eq(0).addClass("active");
					if (type != "all") {
						$("#sort ul li").eq(0).removeClass("active");
					}
				} else {
					$("#sort ul li").css("display", "none");
					$("#sort p i").css("background-image", " url(../images/home/goods/down.png)");
					$("#sort p span").eq(0).removeClass("active");
					$("#sort ul li").eq(0).removeClass("active");
				}
				off = !off;
			});

		//排序--------------------
		$("#sort ul li").click(function () {
			if ($(this).index() == 1) {
				type = "up";
				localStorage.setItem("type", "up");
			} else if ($(this).index() == 2) {
				type = "down";
				localStorage.setItem("type", "down");
			} else {
				type = "all";
				localStorage.setItem("type", "all");
			}

			$("#sort ul li").css("display", "none");
			$("#sort p i").css("background-image", " url(../images/home/goods/down.png)");
			$("#sort p span").eq(0).removeClass("active");
			$("#sort ul li").eq(0).removeClass("active");
			$("#sort p span").eq(1).removeClass("active");
			refresh(kwords, type, param, price1, price2, cid);
		});
		if (type == "up") {
			$("#sort ul li").removeClass("active");
			$("#sort ul li").eq(1).addClass("active");
		}
		if (type == "down") {
			$("#sort ul li").removeClass("active");
			$("#sort ul li").eq(2).addClass("active");
		}
		if (type == "all") {
			$("#sort ul li").removeClass("active");
			$("#sort ul li").eq(0).addClass("active");
		}
		if (type == "sales") {
			$("#sort ul li").removeClass("active");
			$("#sort p span").eq(1).addClass("active");
		}
		$("#sort p span")
			.eq(1)
			.click(function () {
				$("#sort p span").eq(1).addClass("active");
				$("#sort ul li").removeClass("active"); //清除综合选中
				type = "sales";
				refresh(kwords, type, param, price1, price2, cid);
				localStorage.setItem("type", "sales");
			});

		// 筛选底部
		$("#menus .bottom p span").html($("#wares ul").length);
		$("#menus .bottom p")
			.eq(1)
			.click(function () {
				$("#menus ul li").removeClass("bgc");
				$("#section .min").val("");
				$("#section .max").val("");
			});
	});
}
refresh(kwords, type, param, price1, price2, cid);

$("#menus .bottom p")
	.eq(2)
	.click(function () {
		$("#screen").fadeOut(300);
		$("#menus").animate({ right: "-80%" }, 300);
		refresh(kwords, type, param, price1, price2, cid);
	});

// 分类---------------------
axios
	.get("http://vueshop.glbuys.com/api/home/category/menu?token=1ec949a15fb709370f ")
	.then((res) => {
		for (let i = 0; i < res.data.data.length; i++) {
			document.querySelector(
				"#menus .category ul"
			).innerHTML += `<li id="${res.data.data[i].cid}">${res.data.data[i].title}</li>`;
		}
		$("#menus .category ul li").click(function () {
			$("#menus .category ul li").removeClass("bgc");
			$(this).addClass("bgc");
		});
	});

//品牌和热点

axios
	.get(
		"http://vueshop.glbuys.com/api/home/goods/param?kwords=" +
			kwords +
			"&token=1ec949a15fb709370f"
	)
	.then((res) => {
		if (res.data.data.length == 1 && res.data.data.title == "品牌") {
			$("#brand-hot .brand p span").html(`${res.data.data.title}`);
			for (let i = 0; i < res.data.data.param.length; i++) {
				document.querySelector(
					"#brand-hot .brand ul"
				).innerHTML += `<li id="${res.data.data.param[i].pid}">${res.data.data.param[i].title}</li>`;
				$("#brand-hot .hot").hide();
				if ($("#brand-hot .brand ul li").hasClass("bgc")) {
					localStorage.setItem("param", $(this).attr("id"));
					// param=[$(this).attr('id')]
				}
			}
		} else if (res.data.data.length == 1 && res.data.data.title == "选购热点") {
			$("#brand-hot .hot p span").html(`${res.data.data.title}`);
			for (let i = 0; i < res.data.data.param.length; i++) {
				document.querySelector(
					"#brand-hot .hot ul"
				).innerHTML += `<li id="${res.data.data.param[i].pid}">${res.data.data.param[i].title}</li>`;
				$("#brand-hot .brand").hide();
				if ($("#brand-hot .hot ul li").hasClass("bgc")) {
					localStorage.setItem("param", $(this).attr("id"));
					// param=[$(this).attr('id')]
				}
			}
		} else if (res.data.data == "没有数据") {
			$("#brand-hot").hide();
		} else {
			$("#brand-hot .brand p span").html(`${res.data.data[0].title}`);
			$("#brand-hot .hot p span").html(`${res.data.data[1].title}`);
			for (let i = 0; i < res.data.data[0].param.length; i++) {
				document.querySelector(
					"#brand-hot .brand ul"
				).innerHTML += `<li id="${res.data.data[0].param[i].pid}">${res.data.data[0].param[i].title}</li>`;
			}
			for (let i = 0; i < res.data.data[1].param.length; i++) {
				document.querySelector(
					"#brand-hot .hot ul"
				).innerHTML += `<li id="${res.data.data[1].param[i].pid}">${res.data.data[1].param[i].title}</li>`;
			}
			if (
				$("#brand-hot .brand ul li").hasClass("bgc") &&
				$("#brand-hot .hot ul li").hasClass("bgc")
			) {
				localStorage.setItem(
					"param",
					$("#brand-hot .brand ul li").eq(this).attr("id") +
						$("#brand-hot .hot ul li").eq(this).attr("id")
				);
			}
			// param=[a,b];
		}

		$("#brand-hot .brand ul li").click(function () {
			$("#brand-hot .brand ul li").removeClass("bgc");
			$(this).addClass("bgc");
		});
		$("#brand-hot .hot ul li").click(function () {
			$("#brand-hot .hot ul li").removeClass("bgc");
			$(this).addClass("bgc");
		});
		if (
			$("#brand-hot .brand ul li").hasClass("bgc") &&
			$("#brand-hot .hot ul li").hasClass("bgc")
		) {
		}
		// param=[$('#brand-hot .brand ul li').hasClass('bgc').attr('id'),$('#brand-hot .hot ul li').hasClass('bgc').attr('id')]
	});

// 价格区间
$("#section ul li").click(function () {
	$("#section ul li").removeClass("bgc");
	$(this).addClass("bgc");
	$("#section .min").val($(this).find("span").eq(0).text());
	$("#section .max").val($(this).find("span").eq(1).text());
});

//筛选的显示和隐藏
$("#screen").hide();
$(".head span").click(function () {
	$("#screen").fadeIn(300);
	$("#menus").animate({ right: 0 }, 300);
});
$("#screen .no").click(function () {
	$("#screen").fadeOut(300);
	$("#menus").animate({ right: "-80%" }, 300);
});
