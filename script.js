let canvasWidth = 0;
let canvasHeight = 0;
let horzOffset = 0;

function scrollLeft() {
  const paperWidth = $('.paper').width();
  const margin = (canvasWidth - paperWidth)/2;
  const scrollWidth = paperWidth + margin;
  $('.paper').stop().animate({scrollLeft: `-=${scrollWidth}`}, 600);
  horzOffset -= scrollWidth;
}

function scrollRight() {
  const paperWidth = $('.paper').width();
  const margin = (canvasWidth - paperWidth)/2;
  const scrollWidth = paperWidth + margin;
  $('.paper').stop().animate({scrollLeft: `+=${scrollWidth}`}, 600);
  horzOffset += scrollWidth;
}

function setupControls() {  
  if( typeof(window.innerWidth) === 'number') {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
  }
  else {
    canvasWidth = $(window).width();
    canvasHeight = $(window).heignt();
  }
  $("#next").click(function(){
    scrollRight();
    return false;
  });
  $(document).keydown(function(event) {  
    if(event.code === 'ArrowRight') {
      scrollRight();
    }
    if(event.code === 'ArrowLeft') {
      scrollLeft();
    }
  });
}