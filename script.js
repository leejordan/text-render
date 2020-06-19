let totalWidth = 0;
let canvasWidth = 0;
let canvasHeight = 0;
let margin = 0;
let paperWidth = 0;
let columnCount = 3;

function calcLayout() {
  if( typeof(window.innerWidth) === 'number') {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
  }
  else {
    canvasWidth = $(window).width();
    canvasHeight = $(window).heignt();
  }
  paperWidth = $('.paper').width();
  margin = (canvasWidth - paperWidth)/2;
  totalWidth = $('.paper')[0].scrollWidth;
  //console.log('totalWidth', totalWidth, 'canvasWidth', canvasWidth, 'paperWidth', paperWidth, 'margin', margin,'scrollLeft', $('.paper').scrollLeft());
}

function updateButtons() {
  calcLayout();
  if($('.paper').scrollLeft() < 1) {
    $("#prev").hide();
    $("#next").show();
  }
  else {
    $("#prev").show();
    if($('.paper').scrollLeft() < (totalWidth-(paperWidth+(margin*2))))
    {
      $("#next").show();
    }
    else
    {
      $("#next").hide();
    }
  }
}

function scrollHome() {  
  calcLayout();
  $('.paper').stop().animate({scrollLeft: 0}, 600);
  updateButtons();  
}

function scrollEnd() { 
  calcLayout();
  const offset = totalWidth - (paperWidth+margin);    
  $('.paper').stop().animate({scrollLeft: offset}, 600);
  updateButtons();  
}

function scrollLeft() {  
  calcLayout();
  const scrollWidth = paperWidth + margin;
  $('.paper').stop().animate({scrollLeft: `-=${scrollWidth}`}, 600);  
  updateButtons();  
}

function scrollRight() {
  calcLayout();
  if($('.paper').scrollLeft()<canvasWidth)
  {
    const scrollWidth = paperWidth + margin;
    $('.paper').stop().animate({scrollLeft: `+=${scrollWidth}`}, 600);
    updateButtons();  
  }
}

function setupControls() {
  calcLayout();
  $("#next").click(function(){
    scrollRight();
    return false;
  });
  $("#prev").click(function(){
    scrollLeft();
    return false;
  });
  $('.paper').on('scroll', function (e) {    
    updateButtons();
  });
  $(document).keydown(function(event) {
    if(event.code === 'ArrowRight') {
      scrollRight();
    }
    if(event.code === 'ArrowLeft') {
      scrollLeft();
    }
    if(event.code === 'Home' || event.code == 'ArrowUp') {
      scrollHome();
    }
    if(event.code === 'End' || event.code == 'ArrowDown') {
      scrollEnd();
    }
    if(event.code === 'Minus')
    {
      if(columnCount > 1)
      {
        columnCount--;
      }
      $('.paper').css('column-count', columnCount);
    }
    if(event.code === 'Plus' || event.code === 'Equal')
    { 
      if(columnCount<4) {
        columnCount++;
      }
      $('.paper').css('column-count', columnCount);
    }
  });
  updateButtons();
}