$(function(){
	// 以下jquery对象会被缓存起来，不会被之后的克隆操作更新
	var $imgCt = $('.carousel .img-ct')
	var $imgs = $('.carousel .img-ct>li')
	var $preBtn = $('.carousel .pre')
	var $nextBtn = $('.carousel .next')
	var $bullets = $('.carousel .bullet li')

	var pageIndex = 0
	var isAnimateOver = false

	var imgCount = $imgs.length
	var imgWidth = $imgs.width()
	$imgCt.append($imgs.first().clone())
	$imgCt.prepend($imgs.last().clone())
	// js控制图片容器宽度
	$imgCt.width((imgCount + 2) * imgWidth)
	$imgCt.css({left: -imgWidth})

	$nextBtn.click(function(){
		playNext(1)
	})

	$preBtn.click(function(){
		playPre(1)
	})

	$bullets.click(function(){
		var index = $(this).index()
		if(index > pageIndex){
			playNext(index - pageIndex)
		}else if(index < pageIndex){
			playPre(pageIndex - index)
		}
	})

	function playNext(step){
		if(isAnimateOver)return;
		isAnimateOver = true
		$imgCt.animate({
			left: '-=' + step * imgWidth
		}, function(){
			pageIndex += step
			// 当图片到达最末尾时，即克隆到末尾的首张图片
			if(pageIndex === imgCount){
				pageIndex = 0
				$imgCt.css({
					left: -imgWidth
				})
			}
			setBullet()
			isAnimateOver = false
		})
	}

	function playPre(step){
		if(isAnimateOver)return;
		isAnimateOver = true
		$imgCt.animate({
			left: '+=' + step * imgWidth
		}, function(){
			pageIndex -= step
			// 当图片到达最前面时，即克隆到前面的最后一张图片
			if(pageIndex < 0){
				pageIndex = imgCount - 1
				$imgCt.css({
					left: -imgCount * imgWidth
				})
			}
			setBullet()
			isAnimateOver = false
		})
	}
	// 点击按钮时，标签阴影变化
	function setBullet(){
		$bullets.removeClass('active')
						.eq(pageIndex)
						.addClass('active')
	}

	var timer = setInterval(function(){
		playNext(1)
	}, 3000)
})