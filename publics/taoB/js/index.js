$(function () {
	var data = [
		"img/banner1.jpg",
		"img/banner2.png",
		"img/banner3.jpg"
	]
	var num = 0;
	var timer = 1;
	var imgW = $('#pic').width();
	var list_MVC = $('.list_MV').children();
	var nav = $('.point')[0].children;
	var onOff = false;
	for (var i = 0; i < nav.length; i++) {
		if (nav[i].className == "active") {
			num = i;
		}
		nav[i].index = i;
		$('ol li').mouseenter(function () {
			if (onOff) {
				return;
			}
			onOff = true;
			var next = this.index;
			if (next > num) {
				$('.list_MV').css('left', 0);
				list_MVC.eq(0).children(0)[0].src = data[num];
				list_MVC.eq(1).children(0)[0].src = data[next];
				$('.list_MV').animate({
					left: -imgW
				}, "slow", function () {
					onOff = false;
				});
			} else {
				$('.list_MV').css('left', -imgW);
				list_MVC.eq(1).children(0)[0].src = data[num];
				list_MVC.eq(0).children(0)[0].src = data[next];
				$('.list_MV').animate({
					left: 0
				}, "slow", function () {
					onOff = false;
				});

			}
			nav[num].className = '';
			nav[next].className = 'active';
			num = next;
		})
	}
	$('.add').click(function () {
		var next = num + 1;
		if (next > data.length - 1) {
			next = 0;
		}
		$('.list_MV').css('left', 0);
		list_MVC.eq(0).children(0)[0].src = data[num];
		list_MVC.eq(1).children(0)[0].src = data[next];
		$('.list_MV').animate({
			left: -imgW
		}, "slow", function () {
			onOff = false;
		});

		nav[num].className = '';
		nav[next].className = 'active';
		num = next;
	})
	$('.del').click(function () {
		del();
	})

	function del() {
		var next = num - 1;
		if (next < 0) {
			next = data.length - 1;
		}
		$('.list_MV').css('left', -imgW);
		list_MVC.eq(1).children(0)[0].src = data[num];
		list_MVC.eq(0).children(0)[0].src = data[next];
		$('.list_MV').animate({
			left: 0
		}, "slow", function () {
			onOff = false;
		});
		nav[num].className = '';
		nav[next].className = 'active';
		num = next;
	}

	function add() {
		timer = setInterval(function () {
			var next = num + 1;
			if (next > data.length - 1) {
				next = 0;
			}
			$('.list_MV').css('left', 0);
			list_MVC.eq(0).children(0)[0].src = data[num];
			list_MVC.eq(1).children(0)[0].src = data[next];
			$('.list_MV').animate({
				left: -imgW
			}, "slow");

			nav[num].className = '';
			nav[next].className = 'active';
			num = next;
		}, 1800);
	}
	//		clearInterval(timer);
	add();
	$('#pic').mouseenter(function () {
		clearInterval(timer);
	})
	$('#pic').mouseleave(function () {
		add();
	})

	/*当鼠标移入的时候。动画挂出现效果*/
	$('.hoverss').mouseenter(function () {
		$(this).next().show();
		$(this).next().find('.phover').animate({
			left: '200px'
		})
		$(this).next().find('img').animate({
			right: '100'
		})
		$(this).parent().siblings().find('.AB_left').hide()

	})
	$('.left-EM').mouseenter(function () {
		$('.step-2-EM').animate({
			top: '23'
		}, "slow")
	})
	$('.right-EM').mouseenter(function () {
		$('.step-2-EM').animate({
			top: '23'
		}, "slow")
	})


	$('dd a').mouseenter(function () {

		$(this).css('color', '#0097DB');
		$(this).find('.change').css({
			opacity: '1'
		})

	})
	$('dd a').mouseout(function () {

		$(this).css('color', '#e5e9ee');
		$(this).find('.change').css({
			opacity: '0'
		})
	})


	$('.KFBT').mouseenter(function () {
		$(this).find('.click').css('transform', 'rotate(180deg)')
		$('.open-HV').animate({
			height: '277px'
		}, "slow")
	});
	$('.KFBT').mouseleave(function () {
		$(this).find('click').css('transform', 'rotate(-180deg)')
		$('.open-HV').animate({
			height: '0'
		}, "slow")
	})
	$('.upDown').mouseenter(function () {
		$(this).find('.click').css('transform', 'rotate(180deg)')
		$('.three').animate({
			height: '150px'
		}, "slow")
	});
	$('.upDown').mouseleave(function () {
		$(this).find('click').css('transform', 'rotate(-180deg)')
		$('.three').animate({
			height: '0'
		}, "slow")
	})

	$('.three p').mouseenter(function () {

		$(this).css('color', '#0097DB');
		$(this).find('.change').css({
			opacity: '1'
		})

	})
	$('.three p').mouseout(function () {

		$(this).css('color', '#e5e9ee');
		$(this).find('.change').css({
			opacity: '0'
		})
	})
})