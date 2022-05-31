const slideSection = document.querySelector('.slides');

const slides = slideSection.querySelectorAll('.slides-item');
const slidesButtons = slideSection.querySelectorAll('.slides-controls-button');

const sliderTimeMilliseconds = 5000;
let nextSliderTimeout = '';

let slideCurrentNumber = 0;

const slideOpen = function(slideNumber) {
  slidesButtons[slideCurrentNumber].classList.remove('slides-control-current');
  slidesButtons[slideNumber].classList.add('slides-control-current');

  slides[slideNumber].classList.add('slide-current');
  slides[slideCurrentNumber].classList.add('slide-close');

  setTimeout(slideDisplayNone, 1000, slideCurrentNumber);

  slides[slideCurrentNumber].classList.remove('slide-current');

  slideCurrentNumber = slideNumber;
}

const slideDisplayNone = function(slideNumber) {
  slides[slideNumber].classList.remove('slide-close');
}

for(let i = 0; i < slidesButtons.length; i++){
  slidesButtons[i].addEventListener('click', function() {
    slideOpen(i);
    clearTimeout(nextSliderTimeout);
    nextSliderTimeout = setTimeout(slideAutoChange, sliderTimeMilliseconds*2, slideCurrentNumber);
  })
}

let slideAutoChange = function(slideCurrent) {
  let nextSlider = ++slideCurrent;
  if (nextSlider >= slides.length){
    nextSlider = 0;
  }
  slideOpen(nextSlider);
  nextSliderTimeout = setTimeout(slideAutoChange, sliderTimeMilliseconds, slideCurrentNumber);
}

nextSliderTimeout = setTimeout(slideAutoChange, sliderTimeMilliseconds, slideCurrentNumber);
