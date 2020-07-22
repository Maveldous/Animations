//Использую var'ы, так как let и const не поддерживает ie11< и safari

var i = 0, curpos = 0, cursorX = 0, cursorY = 0, controll = 0, clientY = 0;;
var clientWidth = document.documentElement.clientWidth, clientHeight = document.documentElement.clientHeight;
var prevVal = '', prevSelect = '';
var imgArray = ['preloader_camera.png', 'preloader_headphone.png', 'preloader_star.png'];
var numberReached = 1000031000;

//Настройка ScrollMagic

$(function () { 
    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave',
            duration: "200%"
        }
    });

    // get all slides
    var slides = document.querySelectorAll(".section");

    // create scene for every slide
    for (var i=0; i<slides.length; i++) {
        new ScrollMagic.Scene({
                triggerElement: slides[i]
            })
            .setPin(slides[i], {pushFollowers: false})
            .addTo(controller);
    }
});

//slider

$(document).ready(function(){
    $('.lazy').slick({
        lazyLoad: 'ondemand',
        infinite: true,       
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
              }
            },
            {
              breakpoint: 785,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
    });
});


//вычисление ширины прокрутки

var div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

document.body.appendChild(div);
var scrollWidth = div.offsetWidth - div.clientWidth;

document.body.removeChild(div);

//preloader

function progress(value) {
	$value    = $('.preloader-number');
	if (value >= 100) value = 100;
	if (value <= 0)   value = 0;

	$value.html(value);
}

function preload(){
    $('.preloader').toggleClass('active');
    var inter = setInterval(function () {
            i++;
            if(i % 10 == 0){
                $('.preloader-image').css('background-image', "url(images/" + imgArray[curpos] + ')')
                curpos++;
                if(curpos == 3) curpos = 0
            }
            progress(i);
            if(i > 100){
                clearInterval(inter);
                i = 0;
                $('.preloader').toggleClass('active');
            }
    }, 20);
}

preload()

//mousechange

//Главная функция управления курсором
function cursorControll(event, styled, white){
    event.preventDefault()
    if(!styled) $('.cursor').removeAttr('style');
    if(white)   $('.cursor').addClass('cursor-white');
    else $('.cursor').removeClass('cursor-white');
    if($(event.target).attr('data-attr') == 'hover') $('.cursor').addClass('cursor-white');
    cursorX = event.pageX;
    cursorY = event.pageY;
    clientY = event.clientY;
    if((cursorX >= clientWidth - scrollWidth) || cursorX <= 3) $('.cursor').css('display', 'none')
    $('.cursor').css('left', cursorX + 'px');
    $('.cursor').css('top', cursorY + 'px');
}

window.addEventListener('scroll',function(){
    cursorY = document.documentElement.scrollTop + clientY;
    $('.cursor').css('top', cursorY + 10 + 'px');
})
if (window.matchMedia("(min-width: 900px)").matches){
    $('.section__header').mousemove(function(event) {
        $('.cursor').css('display', 'block')
        cursorControll(event, true, false)
        //Вычисление ширины тени курсора
        if(cursorX < clientWidth/2 && cursorY < clientHeight/2) controll = cursorX/4 + cursorY/2;
        else if(cursorX > clientWidth/2 && cursorY > clientHeight/2) controll = (clientWidth - cursorX)/4 + (clientHeight - cursorY)/2;
        else if(cursorX > clientWidth/2 && cursorY < clientHeight/2) controll = (clientWidth - cursorX)/4 + cursorY/2;
        else controll = cursorX/4 + (clientHeight - cursorY)/2;
        $('.cursor').css('box-shadow', '0px ' + '0px ' + controll + 'px ' + controll +'px ' + ' rgba(212, 199, 123, 0.2)')
    
        //контроль надписи
        $('.header__wrapper-imgs').css('transform', 'rotateX(' + -(event.clientY-350)/10 + 'deg) ' + 'rotateY(' + -(event.clientX-600)/20 + 'deg)');
    })
    
    $('.section__clients').mousemove(function(event){
        cursorControll(event, false, true)
    })
    
    $('.section__wedo').mousemove(function(event){
        if($(event.target).attr('data-wedo-text') != undefined) $(event.target).addClass('hovered')
        if($(event.target).attr('data-wedo-text') != prevVal) $(prevSelect).removeClass('hovered') 
        cursorControll(event, false, false)
        prevSelect = event.target;
        prevVal = $(event.target).attr('data-wedo-text');
    })
    
    $('.section__ourTeam').mousemove(function(event){
        cursorControll(event, false, false)
        if($(event.target).attr('data-attr') == 'hover-footer') {
            $('.cursor').addClass('cursor-white');
            $('.footer__wrapper-contact').addClass('hovered');
        }
        else $('.footer__wrapper-contact').removeClass('hovered');
    })
}else{
    $('.cursor').css('display', 'none')
}


$('.wedo__button').click(function(event){
    var value = $(event.target).attr('data-wedo-image');
    var text = $(event.target).attr('data-wedo-text');
    $('.wedo__inner-main').css('background-image', 'url(images/' + value + ')');
    $('.wedo__inner-title').html(text);
    $('.elem-heart').css('animation', 'elem-heart 1s ease infinite');
    $('.elem-elem1').css('animation', 'elem-elem1 1s ease infinite');
    $('.elem-elem2').css('animation', 'elem-elem2 1s ease infinite');
    return new Promise(function(resolve,reject){
        setTimeout(function(){
                $('.elem-heart').css('animation', 'elem-heart 1s ease paused');
                $('.elem-elem1').css('animation', 'elem-elem1 1s ease paused');
                $('.elem-elem2').css('animation', 'elem-elem2 1s ease paused');
            }, 1000)
        resolve()
    }) 
})

//header__counter

setInterval(function(){
    $('.header__wrapper-counter').html(numberReached.toString().substring(0,1) + '.'
    + numberReached.toString().substring(1,4) + '.' + numberReached.toString().substring(4,7) + '.' + numberReached.toString().substring(7,10))
    numberReached++
}, 30);