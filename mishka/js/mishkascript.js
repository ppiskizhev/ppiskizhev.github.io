var navMain=document.querySelector(".main-nav"),navToggle=document.querySelector(".main-nav__toggle");function openMenu(){navMain.classList.contains("main-nav--closed")?(navMain.classList.remove("main-nav--closed"),navMain.classList.add("main-nav--opened")):(navMain.classList.add("main-nav--closed"),navMain.classList.remove("main-nav--opened"))}navMain.classList.remove("main-nav--nojs"),navToggle.addEventListener("click",openMenu);var myMap,myPlacemark,reviewsItems=document.querySelectorAll(".reviews_item"),currentItem=0,btnLeft=document.querySelector(".reviews__btn--left"),btnRight=document.querySelector(".reviews__btn--right");function checkBtnState(e){btnLeft.disabled=0==e,e==reviewsItems.length-1?btnRight.disabled=!0:btnRight.disabled=!1}function init(){myMap=new ymaps.Map(document.querySelector(".contacts__map"),{center:[59.938631,30.323055],zoom:16,controls:[]}),myPlacemark=new ymaps.Placemark([59.938631,30.323055],{},{iconLayout:"default#image",iconImageHref:"../img/icon-map-pin.svg",iconImageSize:[66,101],iconImageOffset:[-35,-100]}),myMap.geoObjects.add(myPlacemark)}checkBtnState(currentItem),btnLeft.onclick=function(e){0!=currentItem&&(reviewsItems[currentItem].style.display="none",reviewsItems[--currentItem].style.display="block",checkBtnState(currentItem))},btnRight.onclick=function(e){currentItem!=reviewsItems.length-1&&(reviewsItems[currentItem].style.display="none",reviewsItems[++currentItem].style.display="block",checkBtnState(currentItem))},ymaps.ready(init);