'use strict';
const square = document.querySelector('.square');
const square_tl = document.querySelector('.top-left');
const square_tr = document.querySelector('.top-right');
const square_br = document.querySelector('.bottom-right');
const square_bl = document.querySelector('.bottom-left');

const circle = document.querySelector('.circle');
const form = document.querySelector('.form');

const wd = window.innerWidth;
const hd = window.innerHeight;

window.onload = onLoad;

function onLoad() {
  setTimeout(() => {
    square_tl.style.transform = `translate(-${wd / 2}px, -${hd / 2}px)`;
    square_tr.style.transform = `translate(${wd / 2}px, -${hd / 2}px)`;
    square_br.style.transform = `translate(${wd / 2}px, ${hd / 2}px)`;
    square_bl.style.transform = `translate(-${wd / 2}px, ${hd / 2}px)`;
    console.log(1);
  }, 500);

  setTimeout(() => {
    circle.style.visibility = 'visible';
    circle.classList.add('rotate');
    console.log(2);
  }, 2500);

  setTimeout(() => {
    circle.classList.add('active');
    circle.onclick = clikcToCircle;
    console.log(3);
  }, 4500);
}

function clikcToCircle() {
  square.classList.add('hide');
  form.classList.remove('hide');
  form.classList.add('flex');
}
