let obj = document.querySelector('.touchable');
obj.addEventListener('mousedown', dragStart);
let shiftX;
let shiftY;

function dragStart(e) {
  shiftX = e.pageX - getCoords(this).left;
  shiftY = e.pageY - getCoords(this).top;
  document.addEventListener('mousemove', dragMove);
  document.addEventListener('mouseup', dragEnd);
}

function dragMove(e) {
  obj.style.left = e.pageX - shiftX + 'px';
  obj.style.top = e.pageY - shiftY + 'px';
}

function dragEnd() {
  document.removeEventListener('mouseup', dragEnd);
  document.removeEventListener('mousemove', dragMove);
}
    

function getCoords(elem) {
  let coords = elem.getBoundingClientRect();
  return {
    top: coords.top + pageYOffset,
    left: coords.left + pageXOffset
  }
}
