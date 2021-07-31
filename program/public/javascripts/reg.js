// 验证码初始化
window.onload = () => {
	dj();
	// console.log(RanNum(6));
};

var show_num = [];
function dj() {
	draw(show_num);
}
function draw(show_num) {
	var canvas_width = document.getElementById("canvas").clientWidth;
	var canvas_height = document.getElementById("canvas").clientHeight;
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	canvas.width = canvas_width;
	canvas.height = canvas_height;
	var sCode =
		"A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
	var aCode = sCode.split(",");
	var aLength = aCode.length; //获取到数组的长度

	for (var i = 0; i <= 3; i++) {
		var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
		var deg = (Math.random() * 30 * Math.PI) / 180; //产生0~30之间的随机弧度
		var txt = aCode[j]; //得到随机的一个内容
		show_num[i] = txt;
		var x = i * 12; //文字在canvas上的x坐标
		var y = 15 + Math.random() * 2; //文字在canvas上的y坐标
		context.font = "bold 16px 微软雅黑";

		context.translate(x, y);
		context.rotate(deg);

		context.fillStyle = randomColor();
		context.fillText(txt, 0, 0);

		context.rotate(-deg);
		context.translate(-x, -y);
	}
	for (var i = 0; i <= 30; i++) {
		//验证码上显示小点
		context.strokeStyle = randomColor();
		context.beginPath();
		var x = Math.random() * canvas_width;
		var y = Math.random() * canvas_height;
		context.moveTo(x, y);
		context.lineTo(x + 1, y + 1);
		context.stroke();
	}
}
function randomColor() {
	//得到随机的颜色值
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + "," + g + "," + b + ")";
}

function RanNum(length) {
	var numLength = parseInt(length);
	var code = "";
	var numChars = [
		0,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m",
		"n",
		"o",
		"p",
		"q",
		"r",
		"s",
		"t",
		"u",
		"v",
		"w",
		"x",
		"y",
		"z",
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z",
	];
	for (var i = 0; i < numLength; i++) {
		var charNum = Math.floor(Math.random() * 62);
		code += numChars[charNum];
	}
	return code;
}

var arr = "";
function phone() {
	var num = document.querySelector(".tel input").value;
	var btn = document.querySelector(".tel button");
	var timer = null;
	var phoneNum = /^[1][2-9][0-9]{9}$/;
	btn.onclick = function () {
		let i = 5;
		clearInterval(timer);
		arr = RanNum(6);
		console.log(arr);

		if (picCode() == false) {
			picCode();
		} else {
			timer = setInterval(function () {
				if (i >= 0) {
					btn.innerHTML = "重新获取(" + i + ")";
					i--;
					btn.className = "";
					btn.disabled = true;
				} else if (i < 0) {
					btn.disabled = false;
					btn.innerHTML = "获取短信验证码";
					if (num.length == 11 && phoneNum.test(num) == true) {
						btn.className = "red";
						clearInterval(timer);
					}
				}
			}, 1000);
		}
	};

	if (num.length == 11 && phoneNum.test(num) == true) {
		btn.className = "red";
		btn.disabled = false;
	} else {
		btn.disabled = true;
		btn.className = "";
		clearInterval(timer);
	}
}
function SMS() {
	var SMS = document.querySelector(".SMS-code input").value;
	if (SMS.toUpperCase() == arr.toUpperCase()) {
		return true;
	} else if (SMS == "") {
		textTip("请输入手机验证码！");
		return false;
	} else {
		textTip("短信验证码错误");
		return false;
	}
}

function picCode() {
	var code = document.querySelectorAll(".code input")[0].value;
	var checkCode = show_num;

	if (code.length <= 0) {
		textTip("请输入图文验证码");
		return false;
	} else if (code.toUpperCase() != checkCode.join("").toString().toUpperCase()) {
		textTip("您输入的图文验证码不正确", 1000, function () {
			dj();
		});
		return false;
	} else {
		return true;
	}
}

$(".sub-btn").click(function () {
	picCode();
	$.ajax({
		type: "post",
		dataType: "json",
		url: "http://vueshop.glbuys.com/api/home/user/reg?token=1ec949a15fb709370f",
		data: {
			cellphone: $(".tel input").val(),
			password: $(".psw input").val(),
		},
		success: function (data) {
			if (data.code == 302) {
				textTip(data.data);
			} else if (SMS() == false) {
				SMS();
			} else {
				textTip("注册成功！", 1000, function () {
					jump("../html/login.html");
				});
			}
		},
	});
});
