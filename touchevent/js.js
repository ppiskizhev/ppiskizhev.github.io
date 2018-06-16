let obj = document.querySelector('.touchable');
let shiftX;
let shiftY;
obj.addEventListener('touchstart', dragStart);
obj.addEventListener('touchmove', dragMove);

function dragStart(e) {
  shiftX = e.changedTouches[0].pageX - getCoords(this).left;
  shiftY = e.changedTouches[0].pageY - getCoords(this).top;
}

function dragMove(e) {
  this.style.left = e.changedTouches[0].pageX - shiftX + 'px';
  this.style.top = e.changedTouches[0].pageY - shiftY + 'px';
}
    
function getCoords(elem) {
  let coords = elem.getBoundingClientRect();
  return {
    top: coords.top + pageYOffset,
    left: coords.left + pageXOffset
  }
}
