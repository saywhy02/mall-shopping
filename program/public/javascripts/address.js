$(function () {
	// 用户信息
	let nick = JSON.parse(localStorage.getItem("nick"));

	// 保存按钮
	$(".submit-save").click(() => {
		address();
	});
	// 添加地址
	function address() {
		// 默认
		let cked = null;
		if ($(".isdefault").prop("checked") == true) {
			cked = 1;
		} else {
			cked = 2;
		}
		let srr = $("#sel_city").html();
		srr = srr.split(" ");
		console.log(srr);
		axios({
			method: "POST",
			url: "http://vueshop.glbuys.com/api/user/address/add?token=1ec949a15fb709370f",
			data:
				"uid=" +
				nick[1] +
				"&name=" +
				$(".name").val() +
				"&cellphone=" +
				$(".cellphone").val() +
				"&province=" +
				srr[0] +
				"&city=" +
				srr[1] +
				"&area=" +
				srr[2] +
				"&address=" +
				$(".address").val() +
				"&isdefault=" +
				cked,
		}).then((res) => {
			if (res.data.code == 303) {
				textTip(res.data.data);
			} else {
				textTip("添加成功！", 2000, function () {
					back();
				});
			}
		});
	}
});
var nameEl = document.getElementById("sel_city");

var first = []; /* 省，直辖市 */
var second = []; /* 市 */
var third = []; /* 镇 */

var selectedIndex = [0, 0, 0]; /* 默认选中的地区 */

var checked = [0, 0, 0]; /* 已选选项 */

function creatList(obj, list) {
	obj.forEach(function (item, index, arr) {
		var temp = new Object();
		temp.text = item.name;
		temp.value = index;
		list.push(temp);
	});
}

creatList(city, first);

if (city[selectedIndex[0]].hasOwnProperty("sub")) {
	creatList(city[selectedIndex[0]].sub, second);
} else {
	second = [{ text: "", value: 0 }];
}

if (city[selectedIndex[0]].sub[selectedIndex[1]].hasOwnProperty("sub")) {
	creatList(city[selectedIndex[0]].sub[selectedIndex[1]].sub, third);
} else {
	third = [{ text: "", value: 0 }];
}

var picker = new Picker({
	data: [first, second, third],
	selectedIndex: selectedIndex,
	title: "地址选择",
});

picker.on("picker.select", function (selectedVal, selectedIndex) {
	var text1 = first[selectedIndex[0]].text;
	var text2 = second[selectedIndex[1]].text;
	var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : "";

	nameEl.innerText = text1 + " " + text2 + " " + text3;
});

picker.on("picker.change", function (index, selectedIndex) {
	if (index === 0) {
		firstChange();
	} else if (index === 1) {
		secondChange();
	}

	function firstChange() {
		second = [];
		third = [];
		checked[0] = selectedIndex;
		var firstCity = city[selectedIndex];
		if (firstCity.hasOwnProperty("sub")) {
			creatList(firstCity.sub, second);

			var secondCity = city[selectedIndex].sub[0];
			if (secondCity.hasOwnProperty("sub")) {
				creatList(secondCity.sub, third);
			} else {
				third = [{ text: "", value: 0 }];
				checked[2] = 0;
			}
		} else {
			second = [{ text: "", value: 0 }];
			third = [{ text: "", value: 0 }];
			checked[1] = 0;
			checked[2] = 0;
		}

		picker.refillColumn(1, second);
		picker.refillColumn(2, third);
		picker.scrollColumn(1, 0);
		picker.scrollColumn(2, 0);
	}

	function secondChange() {
		third = [];
		checked[1] = selectedIndex;
		var first_index = checked[0];
		if (city[first_index].sub[selectedIndex].hasOwnProperty("sub")) {
			var secondCity = city[first_index].sub[selectedIndex];
			creatList(secondCity.sub, third);
			picker.refillColumn(2, third);
			picker.scrollColumn(2, 0);
		} else {
			third = [{ text: "", value: 0 }];
			checked[2] = 0;
			picker.refillColumn(2, third);
			picker.scrollColumn(2, 0);
		}
	}
});

picker.on("picker.valuechange", function (selectedVal, selectedIndex) {});

nameEl.addEventListener("click", function () {
	picker.show();
});
