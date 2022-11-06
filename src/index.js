'use strict';
// Имитация запроса и присвоение полученных даннах в переменную
import data from './data.js';

// Начальный квадрат с его четверринками
const square = document.querySelector('.square');
const square_tl = document.querySelector('.top-left');
const square_tr = document.querySelector('.top-right');
const square_br = document.querySelector('.bottom-right');
const square_bl = document.querySelector('.bottom-left');

// Круглая кнопка для входа в меню
const circle = document.querySelector('.circle');
// Форма
const form = document.querySelector('.form');

// Ширина и высота области проасмотра
const wd = window.innerWidth;
const hd = window.innerHeight;

// Позагруке страницы срабатывает функия onLoad
window.onload = onLoad;

//
form.onsubmit = (e) => {
  e.preventDefault();
};

// Функция onLoad производит манипуляции с елементами на странице
function onLoad() {
  // Четвертинки разбегаются по углам
  setTimeout(() => {
    square_tl.style.transform = `translate(-${wd / 2}px, -${hd / 2}px)`;
    square_tr.style.transform = `translate(${wd / 2}px, -${hd / 2}px)`;
    square_br.style.transform = `translate(${wd / 2}px, ${hd / 2}px)`;
    square_bl.style.transform = `translate(-${wd / 2}px, ${hd / 2}px)`;
    console.log(1);
  }, 500);

  // Появляется круглая кнопка
  setTimeout(() => {
    circle.style.visibility = 'visible';
    circle.classList.add('rotate');
    console.log(2);
  }, 2500);

  // Кнопка становится рабочей и на неё вешается функция clickToCircle
  setTimeout(() => {
    circle.classList.remove('disabled');
    circle.classList.add('work-button');
    circle.onclick = clikcToCircle;
    console.log(3);
  }, 4500);
}

// Функция clicToCircle прячеткнопку и показывает форму для выбора автомобиля
function clikcToCircle() {
  square.classList.add('hide');
  form.classList.remove('hide');
  form.classList.add('flex');
}

console.log(data);
