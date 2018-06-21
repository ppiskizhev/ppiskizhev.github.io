"use strict";

var ring = document.querySelector('.img-container');
var ringImg = document.getElementById('ring-img');
var levelNum = document.querySelector('.page-header__level-number');
var timer = document.querySelector('.page-header__timer');
var holes = document.querySelectorAll('.hole__inner');
var modalLose = document.querySelector('.modal-lose');
var modalIntro = document.querySelector('.modal-intro');
var modalLevel = document.querySelector('.modal-next-level');
var modalLevelCount = document.querySelector('.modal-next-level__count');
var buttons = document.querySelectorAll('.btn');
var updateTimerId;
var hideRingTimerId;
var showRingTimerId;
var currentLevel = 1;
var currentTime = 30;
var isClickBloked = false;

for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function () {
    hideModal(this);
    startGame(currentLevel);
  };
}

ring.onmousedown = function () {
  if (isClickBloked) return;
  isClickBloked = true;
  stopGame('win');
};

function startGame(currentLevel) {
  var showInterval = 2500 - 500 * currentLevel;
  var hideInterval = 1000 - 200 * currentLevel;
  levelNum.innerHTML = currentLevel;
  updateTimer();
  isClickBloked = false;
  showRingTimerId = setInterval(function () {
    showRing(hideInterval);
  }, showInterval);
}

function stopGame(reason) {
  switch (reason) {
    case 'lose':
      clearInterval(updateTimerId);
      clearInterval(hideRingTimerId);
      clearInterval(showRingTimerId);
      hideRing();
      currentLevel = 1;
      currentTime = 30;
      showModalLose();
      break;

    case 'win':
      clearInterval(updateTimerId);
      clearTimeout(hideRingTimerId);
      clearTimeout(showRingTimerId);
      hideRing();
      currentLevel++;
      currentTime = 30;
      showModalNextLevel(currentLevel);
  }
}

function showRing(hideInterval) {
  var holeNum = getRandomInt(0, 11);
  holes[holeNum].appendChild(ring);
  setTimeout(function () {
    ring.classList.add('img-container--show');
  }, 50);
  hideRingTimerId = setTimeout(function () {
    return hideRing();
  }, hideInterval);
}

function hideRing() {
  ring.classList.remove('img-container--show');
}

function updateTimer() {
  timer.innerHTML = currentTime;
  updateTimerId = setInterval(function () {
    currentTime -= 1;
    timer.innerHTML = currentTime;

    if (!currentTime) {
      stopGame('lose');
    }
  }, 1000);
}

function showModalNextLevel(newLevel) {
  modalLevel.style.display = 'block';
  modalLevelCount.innerHTML = newLevel;
  setTimeout(function () {
    modalLevel.style.display = 'none';
    startGame(newLevel);
  }, 1500);
}

function showModalLose() {
  modalLose.style.display = 'block';
}

function showModalIntro() {
  modalLose.style.display = 'block';
}

function hideModal(elem) {
  elem.closest('.modal').style.display = 'none';
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

ringImg.ondragstart = function () {
  return false;
};