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

  // аккордеон подкатегорий в мобильном меню НАЧАЛО
  var mobileNav = document.querySelector('.js-mobile-nav');
  if (mobileNav) {
    mobileNav.addEventListener('click', function (e) {
      var navItem = e.target.closest('.header__mobile-navigation-item');
      var sublist = navItem ? navItem.querySelector('.js-nav-sublist') : null;

      // Если клик был по ссылке и у этого элемента есть подменю, предотвращаем переход по ссылке
      if (e.target.tagName === 'A' && sublist) {
        e.preventDefault();

        // Закрытие всех других подменю, кроме текущего
        const openItems = mobileNav.querySelectorAll('.header__mobile-navigation-item.active');
        openItems.forEach(function (openItem) {
          if (openItem !== navItem) {
            openItem.classList.remove('active');
          }
        });

        // Переключаем класс 'active'
        navItem.classList.toggle('active');
      }
      // Если клик был не по ссылке, но элемент содержит подменю, тогда тоже переключаем 'active'
      else if (sublist) {
        e.preventDefault(); // Возможно, предотвращение перехода здесь уже не нужно, зависит от структуры

        // Аналогично закрываем другие подменю
        const openItems = mobileNav.querySelectorAll('.header__mobile-navigation-item.active');
        openItems.forEach(function (openItem) {
          if (openItem !== navItem) {
            openItem.classList.remove('active');
          }
        });

        navItem.classList.toggle('active');
      }
    });
  };
  // аккордеон подкатегорий в мобильном меню КОНЕЦ



});

// техническая часть - УДАЛИТЬ НА ПРОДАКШЕНЕ!
// получить в консоли элемент, по которому кликнули
document.addEventListener('click', e => console.log(e.target));

