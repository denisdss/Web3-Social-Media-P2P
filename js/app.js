! function() {
	"use strict";
	var e, t;
	[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function(t) {
		return new bootstrap.Tooltip(t)
	}), [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map(function(t) {
		return new bootstrap.Popover(t)
	}), e = document.getElementsByTagName("body")[0], (t = document.querySelectorAll(".light-dark")) && t.forEach(function(t) {
		t.addEventListener("click", function(t) {
			e.hasAttribute("data-bs-theme") && "dark" == e.getAttribute("data-bs-theme") ? document.body.setAttribute("data-bs-theme", "light") : document.body.setAttribute("data-bs-theme", "dark")
		})
	}), Waves.init()
}();