const track = document.getElementById('sliderTrack');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
const totalSlides = slides.length;

function updateSlider() {
  // Shift the track left by the width of the active slide index
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
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
    
// const allUntilFounds = document.querySelectorAll(".hiddenNow");
/*
const untilFound = document.querySelector("#until-found-box");
const allFounds = document.querySelectorAll(".hiddenNow");

console.log("allFounds", allFounds);

// Loop through the items to apply changes
allFounds.forEach(item => {
  item.style.color = 'blue';
  console.log("item", item);
});


untilFound.addEventListener(
  "beforematch",
      () => (untilFound.textContent = "I've been revealed!"),
  );
  */
 
document.querySelector("#reset").addEventListener("click", () => {
  document.location.hash = "";
  document.location.reload();
});

