let canvasWidth = 0;
let canvasHeight = 0;
let pageNo = 1;
let maxPages = 1;
let columnCount = 3;

function updateButtons() {
  if(pageNo === 1) {
    $("#prev").hide();
    $("#next").show();
  }
  else {
    $("#prev").show();
    if(pageNo<maxPages)
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
  const paperWidth = $('.paper').width();
  const margin = (canvasWidth - paperWidth)/2;
  const scrollWidth = (paperWidth + margin) * pageNo;
  $('.paper').stop().animate({scrollLeft: `-=${scrollWidth}`}, 600);
  pageNo = 1;
  updateButtons();  
}

function scrollEnd() {  
  const paperWidth = $('.paper').width();
  const margin = (canvasWidth - paperWidth)/2;
  pageNo = maxPages - 1;
  const scrollWidth = (paperWidth + margin) * pageNo;
  $('.paper').stop().animate({scrollLeft: `+=${scrollWidth}`}, 600);
  updateButtons();  
}

function scrollLeft() {  
  const paperWidth = $('.paper').width();
  const margin = (canvasWidth - paperWidth)/2;
  const scrollWidth = paperWidth + margin;
  $('.paper').stop().animate({scrollLeft: `-=${scrollWidth}`}, 600);
  pageNo--;
  updateButtons();  
}

function scrollRight() {
  if(pageNo<maxPages)
  {
    const paperWidth = $('.paper').width();
    const margin = (canvasWidth - paperWidth)/2;
    const scrollWidth = paperWidth + margin;
    $('.paper').stop().animate({scrollLeft: `+=${scrollWidth}`}, 600);
    pageNo++;
    updateButtons();  
  }
}

function setupControls() {
  totalWidth = $('.paper')[0].scrollWidth;
  if( typeof(window.innerWidth) === 'number') {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
  }
  else {
    canvasWidth = $(window).width();
    canvasHeight = $(window).heignt();
  }
  maxPages = totalWidth/canvasWidth;
  console.log('maxPages', maxPages);
  $("#next").click(function(){
    scrollRight();
    return false;
  });
  $("#prev").click(function(){
    scrollLeft();
    return false;
  });
  $(document).keydown(function(event) {  
    if(event.code === 'ArrowRight') {
      scrollRight();
    }
    if(event.code === 'ArrowLeft') {
      scrollLeft();
    }
    if(event.code === 'Home') {
      scrollHome();
    }
    if(event.code === 'End') {
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
    console.log(event.code);
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