document.addEventListener("DOMContentLoaded", function () {
	let parentDiv = document.getElementById("kc-header-wrapper");
	let logoDiv = document.createElement("div");
	logoDiv.classList.add("kc-logo-text");
    parentDiv.innerText = "";
    parentDiv.appendChild(logoDiv);
});
