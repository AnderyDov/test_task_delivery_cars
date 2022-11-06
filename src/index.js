'use strict';
const square = document.querySelector('.square');
const square_tl = document.querySelector('.top-left');
const square_tr = document.querySelector('.top-right');
const square_br = document.querySelector('.bottom-right');
const square_bl = document.querySelector('.bottom-left');

window.onload = () => {
  const wd = window.innerWidth;
  const hd = window.innerHeight;

  setTimeout(() => {
    square_tl.style.transform = `translate(-${wd / 2}px, -${hd / 2}px)`;
    square_tr.style.transform = `translate(${wd / 2}px, -${hd / 2}px)`;
    square_br.style.transform = `translate(${wd / 2}px, ${hd / 2}px)`;
    square_bl.style.transform = `translate(-${wd / 2}px, ${hd / 2}px)`;
  }, 500);
};
