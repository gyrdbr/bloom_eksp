const track = document.getElementById('sliderTrack');
const track2 = document.getElementById('sliderTrack2');
const slides = document.querySelectorAll('.slide');
const slides2 = document.querySelectorAll('.slide2');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn2 = document.getElementById('prevBtn2');
const nextBtn2 = document.getElementById('nextBtn2');

const totalSlides = slides.length;
const totalSlides2 = slides2.length;

let currentIndex = 0;
let currentIndex2 = 0;

function updateSlider() {
  // Shift the track left by the width of the active slide index
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function updateSlider2() {

  console.log("updateSlider2");
  
  // Shift the track left by the width of the active slide index
  // track2.style.transform = `translateX(-${currentIndex2 * 100}%)`;
}

nextBtn.addEventListener('click', () => {
  if (currentIndex < totalSlides - 1) {
    currentIndex++;
  } else {
    currentIndex = 0; // Loop back to the first slide
  }
  updateSlider();
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = totalSlides - 1; // Loop back to the last slide
  }
  updateSlider();
});


nextBtn2.addEventListener('click', () => {
  if (currentIndex2 < totalSlides - 1) {
    currentIndex2++;
  } else {``
    currentIndex2 = 0; // Loop back to the first slide
  }
  updateSlider2();
});

prevBtn2.addEventListener('click', () => {
  if (currentIndex2 > 0) {
    currentIndex2--;
  } else {
    currentIndex2 = totalSlides - 1; // Loop back to the last slide
  }
  updateSlider2();
});