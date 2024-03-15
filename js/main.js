// прилипающая шапка (функции и переменные) ВНИМАНИЕ - вызов фукнции прописал ниже. после DOMContentLoaded
let lastKnownScrollY = 0;
let ticking = false;

function headerChange() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 126) {
    document.body.classList.add("header-sticky");
  } else {
    document.body.classList.remove("header-sticky");
  }

  ticking = false;
}

function onScroll() {
  lastKnownScrollY = window.scrollY;
  requestTick();
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(headerChange);
  }

  ticking = true;
}
// КОНЕЦ прилипающая шапка (функции и переменные)

document.addEventListener('DOMContentLoaded', function () {
  headerChange();
  window.addEventListener("scroll", onScroll, { passive: true });

  // показ мобильного меню и кнопки
  // Проверяем, есть ли кнопка показа меню на странице
  var buttonMenu = document.querySelector('.button-menu');
  if (buttonMenu) {
    // var navigation = document.querySelector('.navigation');
    // Если navigation тоже существует, назначаем обработчик событий
    // if (navigation) {
      buttonMenu.addEventListener('click', function () {
        buttonMenu.classList.toggle('isActive');
        // navigation.classList.toggle('isActive');
        document.body.classList.toggle('menu-open');
      });
    // }
  };
  // КОНЕЦ показ мобильного меню и кнопки

});

// техническая часть - УДАЛИТЬ НА ПРОДАКШЕНЕ!
// получить в консоли элемент, по которому кликнули
document.addEventListener('click', e => console.log(e.target));
