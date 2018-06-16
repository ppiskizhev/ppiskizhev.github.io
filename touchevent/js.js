let obj = document.querySelector('.touchable');
obj.addEventListener('touchstart', dragStart);
let shiftX;
let shiftY;

function dragStart(e) {
  shiftX = e.pageX - getCoords(this).left;
  shiftY = e.pageY - getCoords(this).top;
  document.addEventListener('touchmove', dragMove);
  document.addEventListener('touchend', dragEnd);
}

function dragMove(e) {
  obj.style.left = e.pageX - shiftX + 'px';
  obj.style.top = e.pageY - shiftY + 'px';
}

function dragEnd() {
  document.removeEventListener('touchend', dragEnd);
  document.removeEventListener('touchmove', dragMove);
}
    
function getCoords(elem) {
  let coords = elem.getBoundingClientRect();
  return {
    top: coords.top + pageYOffset,
    left: coords.left + pageXOffset
  }
}
