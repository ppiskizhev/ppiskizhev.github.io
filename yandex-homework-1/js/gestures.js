"use strict";var image=document.getElementById("cam-pic"),paramsView=document.querySelector(".cam__params"),scaleView=document.querySelector(".cam__scale"),brightnessView=document.querySelector(".cam__brightness");function isTouchDevice(){return"ontouchstart"in document.documentElement}isTouchDevice()||(paramsView.style.display="none");var points={},scale=2,posX=0,posY=0,brightness=100;function onPointerDown(e){var t={id:e.pointerId,startX:e.x,startY:e.y,x:e.x,y:e.y};points[t.id]=t,image.setPointerCapture(e.pointerId)}function onPointerMove(e){var t=points[e.pointerId];t&&(t.x=e.x,t.y=e.y,onchange())}function onPointerUp(e){deletePoint(e),prevRotation=prevScale=prevMove=null,image.releasePointerCapture(e.pointerId)}function onchange(){var e=getPoints();1===e.length&&startMoveGesture(e[0]),2===e.length&&(startPinchGesture(),startRotateGesture())}updataBrightnessView(),updataScaleView(),updatePosition(),image.ondragstart=function(){return!1},image.addEventListener("pointerdown",onPointerDown),image.addEventListener("pointermove",onPointerMove),image.addEventListener("pointerup",onPointerUp),image.addEventListener("pointercancel",onPointerUp);var prevMove=null;function startMoveGesture(e){var t=getEndCoords(e);null===prevMove&&(prevMove=t);var n=getCathetus(prevMove,t),r=n.x,o=n.y;posX+=r,posY+=o,prevMove=t,correctTranslation(),updatePosition()}var prevScale=null;function startPinchGesture(){var e=getPoints(),t=getDistance(e[0],e[1]);null===prevScale&&(prevScale=t),(scale+=(t-prevScale)/100)<1&&(scale=1),4<scale&&(scale=4),prevScale=t,updataScaleView(),correctTranslation(),updatePosition()}var prevRotation=null;function startRotateGesture(){var e=getPoints(),t=getAngle(e[0],e[1]);null===prevRotation&&(prevRotation=t),(brightness+=t-prevRotation)<0&&(brightness=0),300<brightness&&(brightness=300),updataBrightnessView(),prevRotation=t,updateBrightness()}function getPoints(){return Object.values(points)}function updatePosition(){image.style.transform="scale("+scale+") translateX("+posX/scale+"px) translateY("+posY/scale+"px)"}function updateBrightness(){image.style.filter="brightness("+brightness+"%)"}function getCathetus(e,t){return{x:t.x-e.x,y:t.y-e.y}}function getDistance(e,t){var n=getCathetus(e,t),r=n.x,o=n.y;return Math.sqrt(r*r+o*o)}function getAngle(e,t){var n=getCathetus(e,t),r=n.x,o=n.y;return 180*Math.atan2(o,r)/Math.PI}function getStartCoords(e){return{x:e.startX,y:e.startY}}function getEndCoords(e){return{x:e.x,y:e.y}}function deletePoint(e){delete points[e.pointerId]}function correctTranslation(){var e=image.width,t=image.height,n=(e*scale-e)/2,r=(t*scale-t)/2;n<posX&&(posX=n),r<posY&&(posY=r),posX<-n&&(posX=-n),posY<-r&&(posY=-r)}function updataScaleView(){scaleView.innerHTML="Приближение: "+Math.round(100*scale)+"%"}function updataBrightnessView(){brightnessView.innerHTML="Яркость: "+Math.round(brightness)+"%"}