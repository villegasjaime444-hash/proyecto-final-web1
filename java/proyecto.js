// MENÚ HAMBURGUESA
let menuBtn = document.getElementById("menuBtn");
let menu = document.getElementById("menu");
menuBtn.addEventListener("click", function () {
    menu.classList.toggle("active");
});
// SLIDER AUTOMÁTICO + BOTONES
let slides = document.querySelectorAll(".slide");
let btnPrev = document.getElementById("prev");
let btnNext = document.getElementById("next");
let index = 0;
function mostrarSlide(i) {
    slides.forEach(function (slide) {
        slide.classList.remove("active");
    });

    slides[i].classList.add("active");
}
// Botón siguiente
btnNext.addEventListener("click", function () {
    index++;

    if (index >= slides.length) {
        index = 0;
    }

    mostrarSlide(index);
});
// Botón anterior
btnPrev.addEventListener("click", function () {
    index--;

    if (index < 0) {
        index = slides.length - 1;
    }

    mostrarSlide(index);
});
// Automático cada 3 segundos
setInterval(function () {
    index++;

    if (index >= slides.length) {
        index = 0;
    }

    mostrarSlide(index);
}, 3000);
