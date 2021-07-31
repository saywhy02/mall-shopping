(function () {
	let nick = JSON.parse(localStorage.getItem("nick"));
	$(".nickname").val(nick[2]);
	$(".gender").val(nick[3]);
	$(".head img").attr("src", nick[4]);
	$(".right-btn").click(() => {
		material();
	});
	function material() {
		let sex = null;
		if ($(".gender").val() == "男") {
			sex = 1;
		} else {
			sex = 2;
		}
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://vueshop.glbuys.com/api/user/myinfo/updateuser?token=1ec949a15fb709370f",
			data: {
				uid: nick[1],
				nickname: $(".nickname").val(),
				gender: sex,
				head: $(".head img").attr("src"),
			},
			success: function (data) {
				nick[2] = $(".nickname").val();
				nick[3] = $(".gender").val();
				nick[4] = $(".head img").attr("src");
				localStorage.setItem("nick", JSON.stringify(nick));
				textTip(data.data, 2000, function () {
					// jump("../html/index.html");
				});
			},
		});
	}
	$(".head input").on("change", function () {
		var file = this.files[0]; //获取file对象
		var type = file.type.split("/"); //检查文件类型
		if (type[0] != "image") {
			alert("请选择图片");
			return false;
		}
		var reader = new FileReader(); //新建fileReader对象
		reader.readAsDataURL(file);
		reader.onloadend = function () {
			//图片加载事件
			var dataUrl = reader.result;
			$(".head img").attr("src", dataUrl);
		};
	});
	$(".gender").click(() => {
		$(".van-popup").css("transform", "translateY(0px)");
		$(".overlay").show();
	});
	$(".overlay").click(() => {
		$(".van-popup").css("transform", "translateY(100%)");
		$(".overlay").hide();
	});
	$(".van-icon").click(() => {
		$(".van-popup").css("transform", "translateY(100%)");
		$(".overlay").hide();
	});
	$(".van-action-cancel").click(() => {
		$(".van-popup").css("transform", "translateY(100%)");
		$(".overlay").hide();
	});
	$(".van-action-sheet").each((index) => {
		$(".van-action-sheet")
			.eq(index)
			.click(() => {
				$(".gender").val($(".van-action-sheet").eq(index).html());
				$(".van-popup").css("transform", "translateY(100%)");
				$(".overlay").hide();
			});
	});
})();
