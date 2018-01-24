$(function() {
  // 以下jquery对象会被缓存起来，不会被之后的克隆操作更新
  var $imgCt = $('.carousel .img-ct');
  var $lis = $imgCt.children();
  var $preBtn = $('.carousel .pre');
  var $nextBtn = $('.carousel .next');
  var $bullet = $('.carousel .bullet');
  var imgWidth = $lis.width();
  var imgCount = $lis.size();

  var pageIndex = 0;
  var isAnimateOver = false;
  var timer;

  // var imgCount = $imgs.length;
  // var imgWidth = $imgs.width();
  // $imgCt.append($imgs.first().clone());
  // $imgCt.prepend($imgs.last().clone());
  // js控制图片容器宽度
  // $imgCt.width((imgCount + 2) * imgWidth);
  // $imgCt.css({ left: -imgWidth });

  $nextBtn.click(function() {
    playNext();
    clearTimer();
    setNextTimer();
  });

  $preBtn.click(function() {
    playPre();
    clearTimer();
    setPreTimer();
  });
  // 事件代理
  $bullet.find('li').on('click', function(){
    var index = $(this).index();
    play(index);
  });

  play(0);
  autoPlay();


  // $bullets.click(function() {
  //   var index = $(this).index();
  //   if (index > pageIndex) {
  //     playNext(index - pageIndex);
  //   } else if (index < pageIndex) {
  //     playPre(pageIndex - index);
  //   }
  // });

  function playNext() {
    play((pageIndex + 1) % imgCount)
  }

  function playPre(step) {
    play((imgCount + pageIndex -1) % imgCount)
  }

  function play(index) {
    if(isAnimateOver) return;
    isAnimateOver = true;
    $lis.eq(pageIndex).fadeOut(1000);
    $lis.eq(index).fadeIn(1000, function(){
      isAnimateOver = false;
    });

    pageIndex = index;
    setBullet();
  }
  // 点击按钮时，标签阴影变化
  function setBullet() {
    $bullet.children().removeClass('active')
      .eq(pageIndex)
      .addClass('active');
  }

  function stopAuto(){
    clearInterval(timer)
  }

  function autoPlay(){
    // timer = setInterval(function(){
    //   playNext();
    // }, 3000);
    setNextTimer();
  }

  function setPreTimer() {
    timer = setInterval(function() {
      playPre();
    }, 3000);
  }

  function setNextTimer() {
    timer = setInterval(function() {
      playNext();
    }, 3000);
  }

  function clearTimer() {
    clearInterval(timer);
  }

  // setNextTimer();
});