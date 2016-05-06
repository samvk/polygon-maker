/*jshint esversion: 6*/
/*global $, document, Image, window, setTimeout, setInterval, clearInterval*/
var numberOfSides = 6;

function makePolygon() {

	numberOfSides = numberOfSides >= 100000 ? 100000 : numberOfSides;

	$(".error").remove();
	$("#myCanvas").remove();
	$("body").append('<canvas id="myCanvas" width="700" height="500"></canvas>');

	String.prototype.reverse = function () {
		return this.split("").reverse().join("");
	};

	var newNumMaker = (function () {
		var reverseString = numberOfSides.toString().reverse();
		var newNum = "";
		for (var i = 0; i < reverseString.length; i++) {
			newNum += reverseString[i];
			if (((i + 1) % 3) === 0 && i !== reverseString.length - 1) {
				newNum += ",";
			}
		}
		return newNum.reverse();
	}());

	$("#count").text(newNumMaker);

	var c = document.getElementById("myCanvas");
	var cxt = c.getContext("2d");

	// hexagon
	var size = 200,
		Xcenter = 425,
		Ycenter = 225;

	cxt.beginPath();
	cxt.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));

	for (var i = 1; i <= numberOfSides; i += 1) {
		cxt.lineTo(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
	}

	cxt.strokeStyle = "black";
	cxt.lineWidth = 4;
	cxt.stroke();

}

makePolygon();

$("#up").click(function () {
	numberOfSides += 1;
	makePolygon();
});

$("#down").click(function () {
	if (numberOfSides != 3) {
		numberOfSides -= 1;
		makePolygon();
	}
});

$("#custom-sub").click(function () {
	var num = $("input:text").val();
	num = ~~(num.replace(/\,/g, ''));
	if (num >= 3) {
		numberOfSides = num;
		$("input:text").val("");
		makePolygon();
	} else {
		$(".error").remove();
		$("<p class='error'>Please enter a number between 3 and 100,000<p>").insertAfter("#custom-sub").css("color", "red").delay(2000).fadeOut("slow");
	}
});