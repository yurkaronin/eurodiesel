$(document).ready(function () {
  $('.tabs__controls-link').on('click', function (e) {
    e.preventDefault();
    var item = $(this).closest('.tabs__controls-item'),
      contentItem = $('.tabs__container'),
      itemPosition = item.data('class');

    contentItem.filter('.tabs__container__' + itemPosition)
      .add(item)
      .addClass('active')
      .siblings()
      .removeClass('active');
  });

  $('.tabs__wrap-arrow').click(function () {
    $('.tabs__controls').toggleClass('tabs__controls--open');
    $('.tabs__arrow').toggleClass('tabs__arrow--active');
  });

  $('.tabs__controls-item').click(function () {
    $('.tabs__controls').removeClass('tabs__controls--open');
    $('.tabs__arrow').removeClass('tabs__arrow--active');
  });

  $('.burger').click(function () {
    $('.page-header__wrapper').addClass('page-header__wrapper--open');
  });

  $('.page-header__close').click(function () {
    $('.page-header__wrapper').removeClass('page-header__wrapper--open');
  });

  $('.nav__item').click(function () {
    $('.page-header__wrapper').removeClass('page-header__wrapper--open');
  });



  //Модалка

  $('.show_popup').click(function () {
    var popup_id = $('#' + $(this).attr('rel'));
    $(popup_id).show();
    $('.overlay_popup').show();
  })
  $('.overlay_popup').click(function () {
    $('.overlay_popup, .popup').hide();
  })
  $('.close-popup').click(function () {
    $('.overlay_popup, .popup').hide();
  });

  if ($(window).width() < 767) {
    $('#slider').addClass('services__slider');
  }

  $('.services__slider').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    items: 1,
    smartSpeed: 600,
  });

  $('.stock__slider').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    items: 1,
    smartSpeed: 600,
  });

  $('.partners__wrapper').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    items: 6,
    smartSpeed: 600,
    autoplay: true,
    autoplayTimeout: 3500,
    responsive: {
      // breakpoint from 0 up
      0: {
        items: 1,
      },
      // breakpoint from 480 up
      480: {
        items: 2,
      },
      // breakpoint from 768 up
      768: {
        items: 4,
      },
      991: {
        items: 6,
      }
    }
  });

  //Слайдер в модальном окне http://prntscr.com/oaiih9
    $('.modal__zpch__slider').owlCarousel({
      loop: true,
      items: 1,
      smartSpeed: 600,
    });
  //END Слайдер в модальном окне http://prntscr.com/oaiih9

  //Модальное окно http://prntscr.com/oaiih9
    $('.modal__zpch__show').click(function(){
      $('.modal__zpch__wrapper').css('display','flex');
    });
    $('.modal__zpch__close').click(function(){
      $('.modal__zpch__wrapper').hide();
    });
    $('.modal__zpch__wrapper').click(function(){
      if ($(event.target).closest(".modal__zpch").length) return;
      $('.modal__zpch__wrapper').hide();
    });
  //END Модальное окно http://prntscr.com/oaiih9



  $("#menu").on("click", "a", function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();
    //забираем идентификатор блока с атрибута href
    var id = $(this).attr('href'),
      //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top;
    //анимируем переход на расстояние - top за 1500 мс
    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });


  if ($(window).width() >= '991') {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 48) {
        $('.page-header__down').addClass('fixed');
      } else if ($(this).scrollTop() < 48) {
        $('.page-header__down').removeClass('fixed');
      }
    });
  }


  if ($(window).width() <= '991') {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 10) {
        $('.page-header__mobile').addClass('fixed-mobile');
      } else if ($(this).scrollTop() < 10) {
        $('.page-header__mobile').removeClass('fixed-mobile');
      }
    });
  }

});

// mailer
$(document).ready(function () {
  let sending = false;

  $('[data-ajax-form]').on('submit', function (e) {
    e.preventDefault();

    if (!sending) {
      sending = true;

      const $form = $(this);
      const $fields = $form.find('[data-ajax-form-field]');
      const $files = $form.find('[data-ajax-form-file]');
      const $button = $form.find('[data-ajax-form-submit]');
      const buttonHtml = $button.html();

      const data = new FormData();

      // collect field values
      $fields.each(function () {
        const $field = $(this);
        data.append($field.attr('data-ajax-form-field'), $field.val());
      });

      // collect files
      $files.each(function (i, file) {
        const $file = $(this);
        data.append('file', $file[0].files[0]);
      });

      // send data
      $button.html('Отправка...');

      $.ajax({
        url: 'ajax/mail.php',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',

        success: function (response) {
          if (response === 'OK') {
            $button.hide();
            $form.find('[data-ajax-form-success]').show();
          }
        },

        complete: function () {
          sending = false;
          $button.html(buttonHtml);
        }
      });
    }
  });
});

/*Яндекс карта*/
ymaps.ready(init);
var myMap,
  myPlacemark;
/*Здесь надо указывать координаты центра карты*/
function init() {
  myMap = new ymaps.Map("map", {
    center: [45.0656665745964, 38.997016500000015],
    zoom: 17,
    controls: ['geolocationControl'],
  });

  myMap.behaviors.disable([

    'scrollZoom',
  ]);
  /*Здесь надо указывать адрес до балуна и настраивать местоположение и размеры*/
  myPin = new ymaps.GeoObjectCollection({}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/balun.svg',
    iconImageSize: [35, 35],
    iconImageOffset: [-15, 40]
  });
  /*Здесь указывать кодинаты для местоположения метки*/
  myPlacemark = new ymaps.Placemark([45.0656665745964, 38.997016500000015], {});

  myPin.add(myPlacemark);
  myMap.geoObjects.add(myPin);
};



$(function () {
  $("body").on('hidden.bs.modal', function (e) {
    var $iframes = $(e.target).find("iframe");
    $iframes.each(function (index, iframe) {
      $(iframe).attr("src", $(iframe).attr("src"));
    });
  });
});
