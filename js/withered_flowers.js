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

TweenMax.to('#rect', 5, { rotation: "+=90", ease: Linear.easeNone, transformOrigin:"50% 50%" });


