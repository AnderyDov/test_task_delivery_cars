'use strict';
// Имитация запроса и присвоение полученных даннах в переменную
import data from './data.js';

//===============================================================================

let markList = [...data].map((el) => el.mark);
markList = new Set(markList);

// Выбранная машина
let car = {};
// Переменные для задания допуспимого дмапазона дат доставки
var minDate = '';
var maxDate = '';
let now = new Date().getTime();

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
const delivbut = document.querySelector('.delivbut');

// Раскрывающиеся списки
const mark = document.querySelector('.mark');
const model = document.querySelector('.model');
const year = document.querySelector('.year');

// Кадегдарь для выбора даты доставки
const calendar = document.querySelector('.calendar');
const rangeDates = document.querySelector('.range_dates');
const datepicker = document.querySelector('#datepicker');

// Блок показа парметров выбранного автомобиля и даты доставки
const showcar = document.querySelector('.showcar');
const showmark = document.querySelector('.showmark');
const showmodel = document.querySelector('.showmodel');
const showyear = document.querySelector('.showyear');
const showdelivery = document.querySelector('.showdelivery');
const newround = document.querySelector('.newround');

// Ширина и высота области проасмотра
const wd = window.innerWidth;
const hd = window.innerHeight;

//===============================================================================

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
year.onchange = render3;

// Подтверждение выбора автомобиля
form.onsubmit = (e) => onSubmit(e);

// Перзапуск
newround.onclick = restart;

//===============================================================================

// Функция подтверждения выбора автомобмля
function onSubmit(e) {
  e.preventDefault();
  if (mark.value !== '1' && model.value !== '1' && year.value !== '1') {
    if (validateDate(datepicker.value)) {
      car.delivery = datepicker.value;
      showcar.classList.remove('hide');
      form.classList.add('hide');
      form.classList.remove('flex');

      showmark.innerHTML = car.mark;
      showmodel.innerHTML = car.model;
      showyear.innerHTML = car.year;
      showdelivery.innerHTML = car.delivery;
    } else {
      alert('Некорретный формат даты, или вы вышли ща пределы диапазона');
    }
  }
}
// Функция валидации даты
function validateDate(str) {
  if (/^\d\d\.\d\d\.\d\d\d\d$/g.test(str)) {
    str = str.split('.');
    let targetDate = new Date(+str[2], +str[1] - 1, +str[0]).getTime();
    let min = car.delivery.split('-')[0];
    min = min.split('.');
    min = new Date(+min[2], +min[1] - 1, +min[0]).getTime();
    let max = car.delivery.split('-')[1];
    max = max.split('.');
    max = new Date(+max[2], +max[1] - 1, +max[0]).getTime();
    if (targetDate >= min && targetDate <= max) {
      return true;
    }
  }
}

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
    circle.classList.remove('unvisibility');
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
  // Сброс минимальныного и максимального значения с календаря jQuery
  $('#datepicker').datepicker({
    minDate: null,
    maxDate: null
  });
  // Скрыть блок календаря
  calendar.classList.add('hide');
  // Очистка объекта car
  car = {};
  delivbut.classList.add('disabled');

  // Отрисовка елементов раскрывающегося списка
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
}

// Функци выбора модели автомобиля, сбрасывает зачения года выпуска к стартовым условиям
function render2() {
  // Сброс минимальныного и максимального значения с календаря jQuery
  $('#datepicker').datepicker({
    minDate: null,
    maxDate: null
  });
  // Отрисовка елементов раскрывающегося списка
  calendar.classList.add('hide');
  // Очистка объекта car
  car = {};
  delivbut.classList.add('disabled');

  // Отрисовка елементов раскрывающегося списка
  let arr = [];
  year.innerHTML = '';
  year.append(createOption(`Выберите год выпуска`));
  data.forEach((el) => {
    if (model.value === el.model && !arr.includes(el.year)) {
      year.append(createOption(el.year, el.year));
      arr.push(el.year);
    }
  });
}

// Функция выбора года выпуска автомобиля, при из менени года с начального состояния открывается календарь, для выбора даты доставки
function render3() {
  if (year.value !== '1') {
    calendar.classList.remove('hide');
    data.forEach((el) => {
      if (
        el.mark === mark.value &&
        el.model === model.value &&
        el.year === +year.value
      ) {
        car = { ...el };
        delivbut.classList.remove('disabled');
      }
    });

    // Показ пользователю допустимого дтапазона значений
    rangeDates.innerHTML = car.delivery;

    // Получение разници дней между текущуё датой и концами диапазона значений
    datepicker.value = car.delivery.split('-')[0];
    minDate = car.delivery.split('-')[0];
    minDate = minDate.split('.');
    minDate = new Date(+minDate[2], +minDate[1] - 1, +minDate[0]).getTime();
    minDate = Math.round((minDate - now) / 1000 / 60 / 60 / 24);
    maxDate = car.delivery.split('-')[1];
    maxDate = maxDate.split('.');
    maxDate = new Date(+maxDate[2], +maxDate[1] - 1, +maxDate[0]).getTime();
    maxDate = Math.round((maxDate - now) / 1000 / 60 / 60 / 24);

    // Устанка параметров календаря j~ery
    $('#datepicker').datepicker('option', {
      showOn: 'button',
      buttonImage: '../src/image/calendar-date-fill.svg',
      buttonImageOnly: true,
      buttonText: 'Выбрать дату',
      minDate: `+${minDate}D`,
      maxDate: `+${maxDate}D`
    });
  }
}

// Функция запуска нового круга и очистки всех данных
function restart() {
  showcar.classList.add('hide');
  showmark.innerHTML = '';
  showmodel.innerHTML = '';
  showyear.innerHTML = '';
  showdelivery.innerHTML = '';

  form.classList.remove('flex');
  form.classList.add('hide');
  mark.value = '1';
  model.value = '1';
  year.value = '1';

  calendar.classList.add('hide');
  rangeDates.value = '';
  delivbut.classList.add('disabled');

  car = {};
  maxDate = '';
  minDate = '';

  // Сброс минимальныного и максимального значения с календаря jQuery
  $('#datepicker').datepicker({
    minDate: null,
    maxDate: null
  });

  circle.classList.add('disabled', 'unvisibility');
  circle.classList.remove('rotate', 'work-button');
  square.classList.remove('hide');
  square_tl.style.transform = `translate(0px, 0px)`;
  square_tr.style.transform = `translate(0px, 0px)`;
  square_br.style.transform = `translate(0px, 0px)`;
  square_bl.style.transform = `translate(0px, 0px)`;
  onLoad();
}
