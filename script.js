document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper', {
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true // Garante que uma imagem não apareça "atrás" da outra durante a troca
        },
        autoplay: {
            delay: 11000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});