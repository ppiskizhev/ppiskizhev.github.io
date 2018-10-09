"use strict";var image=document.getElementById("cam-pic"),points={},scale=2,posX=0,posY=0,brightness=100;function onPointerDown(t){var e={id:t.pointerId,startX:t.x,startY:t.y,x:t.x,y:t.y};points[e.id]=e,image.setPointerCapture(t.pointerId)}function onPointerMove(t){var e=points[t.pointerId];e&&(e.x=t.x,e.y=t.y,onchange())}function onPointerUp(t){deletePoint(t),prevRotation=prevScale=prevMove=null,image.releasePointerCapture(t.pointerId)}function onchange(){var t=getPoints();1===t.length&&startMoveGesture(t[0]),2===t.length&&(startPinchGesture(),startRotateGesture())}updatePosition(),image.ondragstart=function(){return!1},image.addEventListener("pointerdown",onPointerDown),image.addEventListener("pointermove",onPointerMove),image.addEventListener("pointerup",onPointerUp),image.addEventListener("pointercancel",onPointerUp);var prevMove=null;function startMoveGesture(t){var e=getEndCoords(t);null===prevMove&&(prevMove=e);var n=getCathetus(prevMove,e),o=n.x,r=n.y;posX+=o,posY+=r,prevMove=e,correctTranslation(),updatePosition()}var prevScale=null;function startPinchGesture(){var t=getPoints(),e=getDistance(t[0],t[1]);null===prevScale&&(prevScale=e),(scale+=(e-prevScale)/100)<1&&(scale=1),4<scale&&(scale=4),prevScale=e,correctTranslation(),updatePosition()}var prevRotation=null;function startRotateGesture(){var t=getPoints(),e=getAngle(t[0],t[1]);null===prevRotation&&(prevRotation=e),(brightness+=e-prevRotation)<0&&(brightness=0),300<brightness&&(brightness=300),prevRotation=e,updateBrightness()}function getPoints(){return Object.values(points)}function updatePosition(){image.style.transform="scale("+scale+") translateX("+posX/scale+"px) translateY("+posY/scale+"px)"}function updateBrightness(){image.style.filter="brightness("+brightness+"%)"}function getCathetus(t,e){return{x:e.x-t.x,y:e.y-t.y}}function getDistance(t,e){var n=getCathetus(t,e),o=n.x,r=n.y;return Math.sqrt(o*o+r*r)}function getAngle(t,e){var n=getCathetus(t,e),o=n.x,r=n.y;return 180*Math.atan2(r,o)/Math.PI}function getStartCoords(t){return{x:t.startX,y:t.startY}}function getEndCoords(t){return{x:t.x,y:t.y}}function deletePoint(t){delete points[t.pointerId]}function correctTranslation(){var t=image.width,e=image.height,n=(t*scale-t)/2,o=(e*scale-e)/2;n<posX&&(posX=n),o<posY&&(posY=o),posX<-n&&(posX=-n),posY<-o&&(posY=-o)}