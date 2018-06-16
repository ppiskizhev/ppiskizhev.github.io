let obj = document.querySelector('.touchable');
let shiftX;
let shiftY;
obj.addEventListener('touchstart', dragStart);
obj.addEventListener('touchmove', dragMove);

function dragStart(e) {
  shiftX = e.changedTouches[0].pageX - getCoords(this).left;
  shiftY = e.changedTouches[0].pageY - getCoords(this).top;
  e.preventDefault();
}

function dragMove(e) {
  this.style.left = e.changedTouches[0].pageX - shiftX + 'px';
  this.style.top = e.changedTouches[0].pageY - shiftY + 'px';
  e.preventDefault();
}

obj.onmousedown = function(e) {
  shiftX = e.pageX - getCoords(this).left;
  shiftY = e.pageY - getCoords(this).top;

  document.onmousemove = function(e) {
    obj.style.left = e.pageX - shiftX + 'px';
    obj.style.top = e.pageY - shiftY + 'px';
  }

  document.onmouseup = function(e) {
    document.onmousemove = document.onmouseup = null;
  }
  
}
    
function getCoords(elem) {
  let coords = elem.getBoundingClientRect();
  return {
    top: coords.top + pageYOffset,
    left: coords.left + pageXOffset
  }
}
