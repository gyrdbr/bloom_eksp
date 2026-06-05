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


// TODO:  gjoer om animerigs-blomsten til riktig stoerrelse og plassering
// og putt svg-koden i html-fila til svg-mammaen

// animering av hovedstilk og blomster
// animering i main funker naa. maa bare flytte den. saa endre stylinga paa siste steg

let to = gsap
    .timeline({
        defaults: { duration: 2, ease: "expo.inOut" },
    })
    .to("#pUtspring1HoyreToppenExp", { morphSVG: "#pBlomstSubLeft3" }) // legg inn denne
    // .to(#pUtspring1HoyreToppenExp", { morphSVG: "#pBlomstSubLeft3" })
    

let tq = gsap
    .timeline({
        defaults: { delay: 1, duration: 2, ease: "expo.inOut" },
    })
    .to("#pUtspring2VenstreToppenExp", { morphSVG: "#pBlomstLeftMain3" }) // legg inn denne
    // .to("#pUtspring2VenstreToppenExp", { morphSVG: "#pBlomstLeftMain3" }) // sjekk om denne fins i gammel versjon

    