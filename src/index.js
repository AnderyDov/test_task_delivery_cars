'use strict';
// Имитация запроса и присвоение полученных даннах в переменную
import data from './data.js';

let markList = [...data].map((el) => el.mark);
markList = new Set(markList);

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
// Раскрывающиеся списки
const mark = document.querySelector('.mark');
const model = document.querySelector('.model');
const year = document.querySelector('.year');

// Ширина и высота области проасмотра
const wd = window.innerWidth;
const hd = window.innerHeight;

// Установка начальных значений в выпадающих списках
mark.value = '1';
model.value = '1';
year.value = '1';
markList.forEach((el) => {
  const option = document.createElement('option');
  option.value = el;
  option.innerHTML = el.toLocaleUpperCase();
  mark.append(option);
});
// Позагруке страницы срабатывает функия onLoad
window.onload = onLoad;
// Отрисовка изменений данных на странице
render();
mark.onchange = render;
model.onchange = render2;

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
  }, 500);

  // Появляется круглая кнопка
  setTimeout(() => {
    circle.style.visibility = 'visible';
    circle.classList.add('rotate');
  }, 2500);

  // Кнопка становится рабочей и на неё вешается функция clickToCircle
  setTimeout(() => {
    circle.classList.remove('disabled');
    circle.classList.add('work-button');
    circle.onclick = clikcToCircle;
  }, 4500);
}

// Функция clicToCircle прячеткнопку и показывает форму для выбора автомобиля
function clikcToCircle() {
  square.classList.add('hide');
  form.classList.remove('hide');
  form.classList.add('flex');
}

// Функция для созданияэлкмкнта option с заданными параметрами
function createOption(inner = 'Выберите модель', value = '1') {
  let defOption = document.createElement('option');
  if (value === '1') {
    defOption.disabled = true;
    defOption.selected = true;
  }
  defOption.innerHTML = inner;
  defOption.value = value;
  return defOption;
}

// Функци выбора марки автомобиля, сбрасывает зачения модели и года выпуска к стартовым условиям, перезагрузки страинци сбрачывает так же марку автомоблиля к начальному состоянию
function render() {
  console.log(mark.value);
  let arr = [];
  model.innerHTML = '';
  year.innerHTML = '';
  year.append(createOption(`Выберите год выпуска`));
  model.append(createOption());
  data.forEach((el) => {
    if (mark.value === el.mark && !arr.includes(el.model)) {
      model.append(createOption(el.model.toUpperCase(), el.model));
      arr.push(el.model);
    }
  });
  console.log(arr);
}

// Функци выбора модели автомобиля, сбрасывает зачения года выпуска к стартовым условиям
function render2() {
  console.log(model.value);
  let arr = [];
  year.innerHTML = '';
  year.append(createOption(`Выберите год выпуска`));
  data.forEach((el) => {
    if (model.value === el.model && !arr.includes(el.year)) {
      year.append(createOption(el.year, el.model));
      arr.push(el.year);
    }
  });
  console.log(arr);
}
