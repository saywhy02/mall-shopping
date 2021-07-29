$(".close").click(function () {
	$(".search-component").hide();
});
$(".head .button").click(function () {
	$(".search-component").show();
});
var keyword = [];
axios
	.get("http://vueshop.glbuys.com/api/home/public/hotwords?token=1ec949a15fb709370f")
	.then((res) => {
		var SKW = document.querySelector(".top .search-keywords-wrap");
		SKW.innerHTML = res.data.data
			.map((v, i) => {
				return `
                <div class="keywords">${v.title}</div>
            `;
			})
			.join("");
		$(".top .search-keywords-wrap .keywords").click(function () {
			$(".search-main").eq(0).show();
			keyword.push($(this).html());
			$(".search-input-wrap .search").val($(this).html());
			localStorage.setItem("historyKeywords", JSON.stringify(keyword));
			$(".search-main .search-keywords-wrap")
				.eq(0)
				.prepend(
					`<div class="keywords">${
						JSON.parse(localStorage.getItem("historyKeywords"))[
							JSON.parse(localStorage.getItem("historyKeywords")).length - 1
						]
					}</div>`
				);
		});
		$(".search-btn").click(function () {
			localStorage.setItem("kword", $(".search-input-wrap .search").val());
			jump("../html/07goods.html");
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
	});
