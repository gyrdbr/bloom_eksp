const track = document.getElementById('sliderTrack');
const track2 = document.getElementById('sliderTrack2');

const slides = document.querySelectorAll('.slide');
const slides2 = document.querySelectorAll('.slide2');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const prevBtn2 = document.getElementById('prevBtn2');
const nextBtn2 = document.getElementById('nextBtn2');



let currentIndex = 0;
let currentIndex2 = 0;

const totalSlides = slides.length;
const totalSlides2 = slides2.length;

function updateSlider() {
  // Shift the track left by the width of the active slide index
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function updateSlider2() {
  // Shift the track left by the width of the active slide index
  track2.style.transform = `translateX(-${currentIndex2 * 100}%)`;
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






/*
document.querySelector("#resetHidden1").addEventListener("click", () => {
  // document.location.hash = "";
  // document.location.reload();
  // console.leg("document.querySelector(resetHidden1)", document.querySelector("#resetHidden1"));
  console.log("how many are shown")
});
*/

/*
const hiddenSections = [];

function keepMaxOneArr(arr) {
  // Shift the track left by the width of the active slide index

  console.log("arr", arr);
  if (arr.length < 1) {
    hiddenSections.push("denne");

    console.log("hallo?", hiddenSections);
  } else {
    document.location.reload();
    console.log("keepMaxOneArr", arr, hiddenSections);
    document.location.hash = "";
    console.log("arr", arr, hiddenSections);
    // document.location.reload();
    // hiddenSections.remove();
  }
}

document.querySelector("#resetHidden1").addEventListener("click", () => {
  // document.location.hash = "";
  // document.location.reload();
  // hiddenSections.push("denne");
  console.log("hiddenSections", "hiddenSections", hiddenSections, hiddenSections.length);

  keepMaxOneArr(hiddenSections);
});

document.querySelector("#resetHidden2").addEventListener("click", () => {
  // document.location.hash = "";
  // document.location.reload();
});
*/

const section1 = document.getElementById('until-found-box');
const section2 = document.getElementById('until-found-box2');

console.log("<section>", section1);

console.log("<section class=hiddenNow rw-flower-page rw-section id=until-found-box hidden=until-found><div id=heiSveis class=hiddenHere>Hidden until found</div>");

/* 
<div id="heiSveis" class="hiddenHere">Hidden until found</div>
*/


const untilFound = document.querySelector("#until-found-box");
const untilFound2 = document.querySelector("#until-found-box2");


untilFound.addEventListener(
  "beforematch",
  () => (untilFound.textContent = "I've been revealed 1!"));

  // TODO: I moren
// todo enten vises kun en uansett, ellers kan man ikke fjerne noen
// her viser den skjulte
// jeg tror man boer bruke denne men maa finne ut hvordan man kan bruke begge

console.log("untilFound", untilFound);

untilFound2.addEventListener(
  "beforematch2",
  () => (untilFound2.textContent = "I've been revealed 2!"),
);



document.querySelector("#reset").addEventListener("click", () => {
  document.location.hash = "";
  document.location.reload();
});


// hidden

// console.log("dist1", dist1);




