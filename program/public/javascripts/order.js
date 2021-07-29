function setPos(id) {
	window.location.replace(
		window.location.href.toString().replace(window.location.hash, "") +
			"#" +
			id
	);
}
var stat = ["all", 0, 1, 2];
function nowOrder() {
	var oli = document.querySelectorAll("li");
	for (let j = 0; j < oli.length; j++) {
		oli[j].className = "";
	}
	setPos("status=" + stat[localStorage.getItem("f")]);
	oli[localStorage.getItem("f")].className = "active";
	for (let i = 0; i < oli.length; i++) {
		localStorage.removeItem("f");
		oli[i].onclick = () => {
			for (let j = 0; j < oli.length; j++) {
				oli[j].className = "";
			}
			setPos("status=" + stat[i]);
			oli[i].className = "active";
		};
	}
}
nowOrder();
