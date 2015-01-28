/*Скрипт слайдеров на главной странице сайта azilla.ru*/
//Слайдер Новинок:
function Slider() {
    this.i = 1;
    var margin = '33.33333333%';

    var that = this;

    this.moveLeft = function() {
        if (that.i == 1) {
            $(".new").animate({marginRight: '-' + margin}, 1000);
            that.i = $('.new').length;
            ;
        }
        else {
            that.i--;
            $("div[id='new" + that.i + "']").animate({marginRight: margin}, 1000);
        }
    };

    this.moveRight = function() {
        if (that.i == $('.new').length) {
            $(".new").animate({marginRight: '0'}, 1000);
            that.i = 1;
        }
        else {
            $("div[id='new" + that.i + "']").animate({marginRight: '-' + margin}, 1000);
            that.i++;
        }
    };

    this.Move = function() {
        interval = setInterval(function() {
            that.moveRight();
        }, 4000);
    };

    this.ClearMove = function() {
        clearInterval(interval);
    };

    this.width = function() {
        var containerWidth = $('.new').length * 900;
        var width = (containerWidth / 900) * 100;
        $('#new_c').css('width', width + '%');

        var elemWidth = (900 / containerWidth) * 100;

        $('.new').css({width: elemWidth + '%'});
    };


}

function Disc_Slider() {
    this.i = 0;
    this.right = 0;

    var that = this;

    this.moveLeft = function() {
        $('#disc_right').removeAttr('disabled');

        if (that.i == 0) {
            $('#disc_left').attr('disabled', 'disabled');
        }
        else {
            that.i--;
            that.right -= 33.33333333;
            $("#disc_w").animate({right: that.right + '%'}, 1000);
        }
    };

    this.moveRight = function() {
        $('#disc_left').removeAttr('disabled');

        if (that.i == $('.inline_disc').length - 3) {
            $('#disc_right').attr('disabled', 'disabled');
        }
        else {
            that.i++;
            that.right += 33.33333333;
            $("#disc_w").animate({right: that.right + '%'}, 1000);
        }
    };

    this.width = function() {
        var containerWidth = $('.inline_disc').length * 300;
        var width = (containerWidth / 900) * 100;
        $('#disc_w').css('width', width + '%');

        var elemWidth = (200 / containerWidth) * 100;
        var marginWidth = (50 / containerWidth) * 100;

        $('.inline_disc').css({width: elemWidth + '%', margin: '0 ' + marginWidth + '%'});
    };

}


$(document).ready(function() {
    $("#accordion").accordion({
        heightStyle: "content",
        collapsible: true,
        active: false
    });

    $("#search").autocomplete({
        source: "/media/autocomplete/autocomplete.php",
        minLength: 2,
        delay: 1
    });

    $('#btn_search').on('click', function() {
        if ($('#search').val() == '')
            return false;
    });

    $('#size').buttonset();
    $('#pay_prod').button();
    $('#send').button();
    $('#tabs').tabs();

    $('.menu_li:last').css('marginRight', '0');

    /*Слайдер Новинок*/
    $('#slider').css('overflow', 'hidden');

    var slider = new Slider();

    slider.width();

    $('#btn_left').on('click', function() {
        slider.moveLeft();
    });

    $('#btn_right').on('click', function() {
        slider.moveRight();
    });

    slider.Move();

    $(".Slide").mouseover(function() {
        slider.ClearMove();
    });
    $(".Slide").mouseout(function() {
        slider.Move();
    });

    /*END Слайдер Новинок*/

    /*Слайдер Скидок*/

    disc_S = new Disc_Slider();

    disc_S.width();

    $('#disc_left').attr('disabled', 'disabled');

    $('#disc_right').on('click', function() {
        disc_S.moveRight();
    });

    $('#disc_left').on('click', function() {
        disc_S.moveLeft();
    });
    /*END Слайдер Скидок*/

    /*ГАЛЕРЕЯ ИЗОБРАЖЕНИЙ*/
    $('.small_image a').on('mouseover', function() {
        var src = $(this).attr('href');
        $('#big_img').attr('src', src);
        $('#width_image a').attr('href', src);
    });

    $('.small_image a').on('click', function(e) {
        e.preventDefault();
    });
    /*END ГАЛЕРЕЯ ИЗОБРАЖЕНИЙ*/
});

