$(".close").click(function () {
	$(".search-component").hide();
});
$(".head .button").click(function () {
	$(".search-component").show();
	$(".search-input-wrap .search").val("");
	let data = JSON.parse(localStorage.getItem("historyKeywords"));
	if (data != null) {
		$(".search-main").eq(0).show();
		historyData(data);
	} else {
		$(".search-main").eq(0).hide();
	}
});
var max_history = 9;
function historyData(searchArr) {
	// 渲染数据
	searchArr.reverse(); //反转，从后往前添加
	// 遍历出数据
	if (searchArr.length <= max_history) {
		//如果存储数据小于等于max_history,则遍历渲染
		for (let i = 0; i < searchArr.length; i++) {
			$(
				".search-keywords-wrap"
			)[0].innerHTML += `<div class='keywords'>${searchArr[i]}</div>`;
		}
	} else {
		//否则渲染最大历史记录条数
		for (let i = 0; i < max_history; i++) {
			$(
				".search-keywords-wrap"
			)[0].innerHTML += `<div class='keywords'>${searchArr[i]}</div>`;
		}
	}
}
axios
	.get("http://vueshop.glbuys.com/api/home/public/hotwords?token=1ec949a15fb709370f")
	.then((res) => {
		let keyword = [];
		var SKW = document.querySelector(".top .search-keywords-wrap");
		SKW.innerHTML = res.data.data
			.map((v, i) => {
				return `
                <div class="keywords">${v.title}</div>
            `;
			})
			.join("");
		$(".top .search-keywords-wrap .keywords").click(function () {
			if (localStorage.getItem("historyKeywords") != null) {
				keyword = JSON.parse(localStorage.getItem("historyKeywords"));
			} else {
				keyword = [];
			}
			$(".search-main").eq(0).show();
			keyword.push($(this).html());
			removalDuplicate(keyword);
			$(".search-input-wrap .search").val($(this).html());
			localStorage.setItem("historyKeywords", JSON.stringify(keyword));
			var data = JSON.parse(localStorage.getItem("historyKeywords"));
			$(".search-keywords-wrap").eq(0).html("");
			historyData(data);
			localStorage.setItem("kword", data[0]);
			jump("../html/goods.html");
		});
		$(".search-btn").click(function () {
            if (localStorage.getItem("historyKeywords") != null) {
				keyword = JSON.parse(localStorage.getItem("historyKeywords"));
			} else {
				keyword = [];
			}
			$(".search-main").eq(0).show();
			keyword.push($(".search-input-wrap .search").val());
			removalDuplicate(keyword);
			localStorage.setItem("historyKeywords", JSON.stringify(keyword));
			var data = JSON.parse(localStorage.getItem("historyKeywords"));
			$(".search-keywords-wrap").eq(0).html("");
			historyData(data);
			localStorage.setItem("kword", $(".search-input-wrap .search").val());
			jump("../html/goods.html");
		});
		$(".bin").click(function () {
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
					$(".search-main").eq(0).hide();
					$(".search-main .search-keywords-wrap").eq(0).html("");
				});
		});
		function removalDuplicate(arr) {
			// 数组去重-筛选函数
			for (let i = 0; i < arr.length; i++) {
				var arrItem = arr[i].trim(); // 去除字符串两端空格
				// 如果值为空，则不添加
				if (arrItem == "") {
					arr.splice(i, 1);
				}
				if (arrItem !== "") {
					for (let j = i + 1; j < arr.length; j++) {
						if (arr[i] == arr[j]) {
							arr.splice(i, 1); //如果第二次输入的值与第一次相同，则添加第二次的值
						}
					}
				}
			}
			return arr;
		}
	});
