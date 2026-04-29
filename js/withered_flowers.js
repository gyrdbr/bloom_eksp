// gsap.config({ trialWarn: false });

gsap.registerPlugin(MorphSVGPlugin);

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
        // gsap.to("#pUtspring1HoyreToppen", { scale: 1.2, transformOrigin:"50% 50%", duration: 2 });

        gsap.set("#path5-2-4-9", { scale: 1, rotation: -180,  transformOrigin: "50% 0%" });
        
    }
}

var habitFlowerTransform = Object.create(HabitFlowerTransform);

habitFlowerTransform.init();
habitFlowerTransform.setupHabitFlower();
habitFlowerTransform.animateHabitFlower();

// TweenMax.to('#rect', 5, { rotation: "+=90", ease: Linear.easeNone, transformOrigin:"50% 50%" });


gsap.to("#diamond", {
	duration: 2,
	ease: "power2.inOut",
	morphSVG: {
		shape: "#lightning",
		smooth: { points: 80 }
	}
});




