// gsap.config({ trialWarn: false });

// gsap.registerPlugin(MorphSVGPlugin);
// gsap.registerPlugin(GSDevTools, MorphSVGPlugin);

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

/*
let tl = gsap
  .timeline({
    defaults: { duration: 2, ease: "expo.inOut" },
  })
  .to("#morph", { morphSVG: "#speech" })
  .to("#morph", { morphSVG: "#lightning" })
*/
  
 
let tm = gsap
    .timeline({
        defaults: { duration: 2, ease: "expo.inOut" },
    })
    .to("#pUtspring1HoyreToppenExp", { morphSVG: "#pBlomsBladHoved2" })


    
let tn = gsap
    .timeline({
        defaults: { delay: 1, duration: 2, ease: "expo.inOut" },
    })
    .to("#pUtspring2VenstreToppenExp", { morphSVG: "#pBlomstLeftMainExp" })
    


// TODO:  gjoer om animerigs-blomsten til riktig stoerrelse og plassering
// og putt svg-koden i html-fila til svg-mammaen

// animering av hovedstilk og blomster
// animering i main funker naa. maa bare flytte den. saa endre stylinga paa siste steg

let to = gsap
    .timeline({
        defaults: { duration: 2, ease: "expo.inOut" },
    })
    .to("#pUtspring1HoyreToppenExp2", { morphSVG: "#gBlomsterSubBottomAnim1" })
    .to("#pUtspring1HoyreToppenExp2", { morphSVG: "#gBlomsterSubBottomAnimExp2" })

let tq = gsap
    .timeline({
        defaults: { delay: 1, duration: 2, ease: "expo.inOut" },
    })
    .to("#pUtspring2VenstreToppenExp2", { morphSVG: "#pBlomstLeftMainAnim1" })
    .to("#pUtspring2VenstreToppenExp2", { morphSVG: "#pBlomstLeftMainAnimExp2" })


/*
let tp = gsap
    .timeline({
        defaults: { delay: 1, duration: 2, ease: "expo.inOut" },
    })
    .to("#pUtspring2VenstreToppenExp2", { morphSVG: "#pBlomstLeftMain-2-2-5" })
*/
    