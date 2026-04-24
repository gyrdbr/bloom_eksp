// gsap.config({ trialWarn: false });

/* visne blomster */

// TODO:  animer knoppen til å vokse og blomstre, og deretter animere de andre blomstene til å blomstre etter hverandre
// foer mer figur-laging

const gBlomstHeleVenstre = document.querySelector('.blomst-hele-venstre');
const gBlomstHeleMidten = document.querySelector('.blomst-hele-midten');
const gBlomstHeleHøyre = document.querySelector('.blomst-hele-høyre');

HabitFlowerTransform = {
    init: function() {
        // 
    },
    setupHabitFlower: function() {
        // gsap.set(gBlomstHeleMidten, { scale: 0, transformOrigin: 'center' });
    },
    animateHabitFlower: function() {
        gsap.to("#pUtspring1HoyreToppen", { scale: 1.2, transformOrigin:"50% 50%", duration: 2 });
    }
}

var habitFlowerTransform = Object.create(HabitFlowerTransform);

habitFlowerTransform.init();
habitFlowerTransform.setupHabitFlower();
habitFlowerTransform.animateHabitFlower();

// gsap.set("#polygonRotate", {transformPerspective:600, transformOrigin:"50% 50%"})
// gsap.to("#polygonRotate", {rotationX:360, duration:10, ease:"none"})
// gsap.to("#polygonRotate", {rotationY:360, duration:15, repeat:1, ease:"none"})