function homeBackground(){
	setTimeout(function(){
		$(".container-home").animate({
			backgroundPositionY: '0px',
			opacity: 1.0
		}, 1000);
	}, 500);
}

function isInView(elem) {
	var $elem = $(elem);
	var topScroll = $(window).scrollTop();
	var bottomScroll = topScroll + document.body.clientHeight;
	var elemTop = $elem.offset().top;
	var elemBottom = elemTop + $elem.height();
	return ((elemBottom <= bottomScroll) && (elemTop >= topScroll));
}

function checkScroll() {
	var powerImg = $(".why-power-img");
	var secImg = $(".why-security-img");
	var invImg = $(".why-investment-img");
	if (isInView(powerImg)){
		powerImg.addClass("leftTransition");
		setTimeout(function(){
			secImg.addClass("leftTransition");
		}, 250);
		setTimeout(function(){
			invImg.addClass("leftTransition");
		}, 500);
	}
	var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	if (width <= 768) {
		switch(true) {
			case isInView(powerImg):
				powerImg.addClass("leftTransition");
			case isInView(secImg):
				secImg.addClass("leftTransition");
			case isInView(invImg):
				invImg.addClass("leftTransition");
		}
	}
}

function carousel() {
	var images = $("#slides").children("li"),
		navItems = $("#nav-items").children("li"),
		imagesLen = images.length,
		current;
	$("#nav-items").find("li").first().addClass("active");
	
	function select(value) {
		var index = value;
		if (value == "next") {
			index = (current < imagesLen - 1) ? (current + 1) : 0;
		}
		if (value == "prev") {
			index = (current > 0) ? (current - 1) : (imagesLen - 1);
		}
		$(navItems).removeClass("active").eq(index).addClass("active");
		images.fadeOut(500).eq(index).fadeIn(500);
		current = index;
		
		clearTimeout(changeTimeout);
		var changeTimeout = setTimeout(function() {
			select('next');
		}, 3000);
	}
	$("#nav-items li").on("click", function(){
		var index = $(this).index();
		select(index);
	});
	$("#carousel-next").on("click", function() {
		select('next');
	});
	$("#carousel-prev").on("click", function() {
		select('prev');
	});
	select('next');
}

function retinaImages() {
	imagesArray = [];
	imagesArray.push($(".container-why img"));
	imagesArray.push($(".container-team img"));
	imagesArray.push($(".container-video img"));
	if (window.devicePixelRatio == 2) {
		for (var i = 0; i < imagesArray.length; i++) {
			for (var j = 0; j < imagesArray[i].length; j++) {
				var images = imagesArray[i];
				var imageType = images[j].src.substr(-4);
            	var imageName = images[j].src.substr(0, images[j].src.length - 4);
            	imageName += "@2x" + imageType;
            	images[j].src = imageName;
			}
		}
	}
}

$(window).scroll(function(){
	checkScroll();
});

$(document).ready(function(){
	homeBackground();
	carousel();
	retinaImages();
});