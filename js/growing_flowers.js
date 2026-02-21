// gsap.config({ trialWarn: false });
// TODO lag variable for inflorescence og animer denne slik som flower1 og flower2. Lag en knapp for å starte animasjonen av inflorescence og legg denne i htmlen. Lag en funksjon som animerer inflorescence og kall denne i playAnim() når inflorescence er valgt.



class InflorescenceLeaf {
  constructor(id, transformOrigin, startScale) {
      this.id = id;
      this.transformOrigin = transformOrigin;
      this.startScale = startScale;
  }
}


/** blomsterstand */

var blomstButton = document.getElementById('startBlomst-button-svg');

var blomsterstandFlower = document.getElementById('wholeInflorecence');

var longFlowerstem = "#pathHovedStilk";
var topPathFlower = document.getElementById('topPathFlower');

console.log("longFlowerstem", longFlowerstem, "blomsterstandFlower", blomsterstandFlower);



var playBloomButton = document.querySelector('#playBloomButton');

function BloomAnimation() {
    this.phazeIndex = 0;
    this.button = document.querySelector('#playBloomButton');

     this.bloomPhases = [];
     this.basicFlowerStems = [];

    // utfoer fase 1 for den rosa blomste
}

var bloomFlowerAnim = new BloomAnimation();

console.log("bloomFlowerAnim", bloomFlowerAnim);

// bloomFlowerAnim.playInflorecenceAnim();

// this.basicFlowerLeafs = this.createAndGetBasicFlowerLeafs();

BloomAnimation.prototype = {
    createAndGetBasicFlowerStems: function () {
        let mainStem = new InflorescenceLeaf("#pathHovedStilk", "100% bottom", 1);

        return [mainStem];
    },
    setupInflorecence: function () { 
        this.phazeIndex = 0;

        this.basicFlowerStems = this.createAndGetBasicFlowerStems();
        gsap.set(longFlowerstem, { opacity: 0 });
        gsap.set(topPathFlower, { opacity: 0 });

    },
    animateInflorecence: function () {
         // opacity settes fra 0 til 1 slik at stilken blir synlig
        gsap.set(longFlowerstem, { opacity: 1 });
        // visningen av stilken animeres
        gsap.from(longFlowerstem, 1, {drawSVG: 0, onComplete: this.showInflorecence, callbackScope: this});
    },
    showInflorecence: function () {
        gsap.to(topPathFlower, { duration: 1, opacity: 1, onComplete: this.finalInflorecencePhase, callbackScope: this });
    },
    finaInflorecencePhase: function () {
        console.log("finalInflorecencePhase");
        // this.setButtonText("Start igjen")
        // this.phazeIndex += 1;
    },
    playInflorecenceAnim: function () {
        // TODO legg inn her
        console.log("playInflorecenceAnim");
        /*
        if (this.phazeIndex < this.phases.length) {
            this.phases[this.phazeIndex]();
        } else {
            this.resett();
        }
            */
    }
}

function playBloom() {
    console.log("playBloom");
    pickBloomFlower(0, '0 0 210 297');

    // TODO legg inn her

    // bloomFlowerAnim.playInflorecenceAnim();
}

function pickBloomFlower(flowerIndex, svgVBParams) {
    // var svg = document.getElementById("svg-blomsterstand");

    activeFlower = flowers[flowerIndex];

/*
    activeButton.classList.remove('disabled');
    activeButton = flowerButtons[flowerIndex];
    activeButton.classList.add('disabled');
    */

    // bloomFlowerAnim.setPhases(activeFlower.getAttribute('id'));
}


/** flower1 og flower2 */

class Leaf {
    constructor(id, transformOrigin, startScale) {
        this.id = id;
        this.transformOrigin = transformOrigin;
        this.startScale = startScale;
    }
}

var flower1 = document.getElementById('basicFlower');
var flower2 = document.getElementById('alienflower');
var activeFlower = flower2;

var flower1Button = document.querySelector('.flower1');
var flower2Button = document.querySelector('.flower2');
var activeButton = flower2Button;

var flowerButtons = [flower1Button, flower2Button];
var flowers = [flower1, flower2];

var playButton = document.querySelector('.playButton');


function FlowerAnimation() {

    this.phazeIndex = 0;
    this.button = document.querySelector('.playButton');

    this.alienphases = [];
    this.basicphases = [];
    this.phases = [];

    this.basicFlowerLeafs = [];
}



FlowerAnimation.prototype = {
    createAndGetBasicFlowerLeafs: function () {
        let leaf1 = new Leaf("#leaf1", "100% bottom", 0.2);
        let leaf2 = new Leaf("#leaf2", "90% bottom", 0);
        let leaf3 = new Leaf("#leaf3", "0 bottom", 0);
        let leaf4 = new Leaf("#leaf4", "0 bottom", 0.2);

        return [leaf1, leaf2, leaf3, leaf4];
    },
    resett: function () {
        this.phazeIndex = 0;
        if (activeFlower.getAttribute('id') === 'basicFlower') {
            this.setupBasicFlower();
        } else {
            this.setupAlienFlower();
        }
    },
    setButtonText: function (text) {
        this.button.innerHTML = text;
        this.button.classList.remove('disabled');
    },
    setupBasicFlower: function () {
        this.phazeIndex = 0;
        this.basicFlowerLeafs = this.createAndGetBasicFlowerLeafs();

        var phase1 = () => {
            this.animatePhase(0.5, 3);
        }

        var phase2 = () => {
            this.animatePhase(1, 3);
        }

        var phase3 = () => {
            this.button.classList.add('disabled');
            this.animateStem();
        }

        this.basicphases = [phase1, phase2, phase3];

        this.setButtonText("Fase " + String(this.phazeIndex + 1));

        gsap.set("#stem", { opacity: 0 });
        gsap.set("#flower", { opacity: 0 });

        this.basicFlowerLeafs.forEach(leaf => {
            gsap.set(leaf.id, { scale: leaf.startScale, transformOrigin: leaf.transformOrigin });
        });
    },
    animatePhase(newScale, duration) {
        this.button.classList.add('disabled');
        this.basicFlowerLeafs.forEach((leaf, index) => {
            if (index === 0) {
                gsap.to(leaf.id, {
                    duration: duration, scale: newScale, transformOrigin: leaf.transformOrigin,
                    onComplete: this.updatePhase, callbackScope: this
                });
            } else {
                gsap.to(leaf.id, {
                    duration: duration, scale: newScale, transformOrigin: leaf.transformOrigin
                });
            }
        });
    },
    animateStem: function () {
         // opacity settes fra 0 til 1 slik at stilken blir synlig
        gsap.set("#stem", { opacity: 1 });
        // visningen av stilken animeres
        gsap.from("#stem", 1, {drawSVG: 0, onComplete: this.showFlower, callbackScope: this});
    },
    showFlower: function () {
        gsap.to("#flower", { duration: 1, opacity: 1, onComplete: this.finalPhase, callbackScope: this });
    },
    finalPhase: function () {
        this.setButtonText("Start igjen")
        this.phazeIndex += 1;
    },
    updatePhase: function () {
        if (this.phases && this.phazeIndex < this.phases.length) {
            this.phazeIndex += 1;
            this.setButtonText("Fase " + String(this.phazeIndex + 1));
        }
    },
    setPhases: function (flower) {
        if (flower === 'basicFlower') {
            this.phases = this.basicphases;
        } else {
            this.phases = this.alienphases;
        }
    },
    setupAlienFlower: function () {
        this.phazeIndex = 0;

        var phase1 = () => {
            this.alienPhase1();
        }

        var phase2 = () => {
            this.alienPhase2();
        }

        var phase3 = () => {
            this.alienPhase3();
        }

        this.alienphases = [phase1, phase2, phase3];

        this.setButtonText("Fase " + String(this.phazeIndex + 1));


        gsap.set("#alien-tuber1", { transformOrigin: "50% 60%", y: 9 });

        gsap.set("#alien-stem1", { scale: 0.5, transformOrigin: "50% 80%", y: 9 });
        gsap.set("#alien-tuber2", { scale: 0.2, transformOrigin: "50% bottom", y: 16 });

        gsap.set("#alien-tuber1-right-leaf", { scale: 0, transformOrigin: "0 90%" });
        gsap.set("#alien-tuber1-left-leaf", { scale: 0, transformOrigin: "15% bottom" });

        // tuber2
        gsap.set("#alien-stem2", { scale: 0, transformOrigin: "50% 80%" });
        // leafscale 0.7
        gsap.set("#alien-tuber2-right-leaf", { scale: 0, transformOrigin: "0 90%" });
        gsap.set("#alien-tuber2-left-leaf", { scale: 0, rotation: -50, transformOrigin: "15% bottom" });

        // tuber 3
        gsap.set("#alien-tuber3", { scale: 0, transformOrigin: "50% bottom", y: 16 });
        gsap.set("#alien-tuber3-right-leaf", { scale: 0, transformOrigin: "0 90%" });
        gsap.set("#alien-tuber3-left-leaf", {scale: 0, rotation: -50, transformOrigin: "15% bottom"});

        // tuber 4
        gsap.set("#alien-tuber4", { scale: 0, transformOrigin: "50% 90%" });


    },
    alienPhase1: function () {
        var dist = 9;
        this.button.classList.add('disabled');
        gsap.to("#alien-tuber1", { duration: 1, y: 9 - dist, onComplete: this.alienPhase1b, callbackScope: this });
        gsap.to("#alien-stem1", { duration: 1, y: 9 - dist });
        gsap.to("#alien-tuber2", { duration: 1, y: 16 - dist });
    },
    alienPhase1b: function () {
        var fullScale = 0.89;

        gsap.to("#alien-tuber2", { duration: 3, scale: 1, transformOrigin: "50% bottom", y: 0,
        onComplete: this.updatePhase, callbackScope: this });
        gsap.to("#alien-stem1", { duration: 3, scale: 1, transformOrigin: "50% 80%", y: 0 });

        gsap.to("#alien-tuber1-right-leaf", { duration: 3, scale: fullScale, transformOrigin: "0 90%" });
        gsap.to("#alien-tuber1-left-leaf", { duration: 3, scale: fullScale, transformOrigin: "15% bottom" });
    },
    alienPhase2: function () {
        this.button.classList.add('disabled');

        gsap.to("#alien-stem2", { duration: 3, scale: 1, transformOrigin: "50% 80%", onComplete: this.alienPhase2b, callbackScope: this });
        gsap.to("#alien-tuber3", { duration: 3, scale: 0.2, transformOrigin: "50% bottom", y: 0 });

        gsap.to("#alien-tuber2-right-leaf", { duration: 3, scale: 0.7, transformOrigin: "0 90%" });
        gsap.to("#alien-tuber2-left-leaf", { duration: 3, scale: 0.7, rotation: -50, transformOrigin: "15% bottom" });

    },
    alienPhase2b: function () {
        gsap.to("#alien-tuber3", { duration: 3, scale: 1, transformOrigin: "50% bottom",
        onComplete: this.updatePhase, callbackScope: this  });
    },
    alienPhase3: function () {
        this.button.classList.add('disabled');
        gsap.to("#alien-tuber4", { duration: 3, scale: 1, transformOrigin: "50% 90%", onComplete: this.finalPhase, callbackScope: this });

        gsap.to("#alien-tuber3-right-leaf", { duration: 3, scale: 1, transformOrigin: "0 90%" });
        gsap.to("#alien-tuber3-left-leaf", {duration: 3, scale: 0.9, rotation: -50, transformOrigin: "15% bottom"});
    },
    playAnim: function () {
        console.log("playAnim");
        console.log("bFlowerAnim klikket", bFlowerAnim);
        if (this.phazeIndex < this.phases.length) {
            this.phases[this.phazeIndex]();
        } else {
            this.resett();
        }
    }
}

var bFlowerAnim = new FlowerAnimation();
bFlowerAnim.setupBasicFlower();
bFlowerAnim.setupAlienFlower();

console.log("bFlowerAnim", bFlowerAnim);

function play() {
    pickFlower(0, '0 0 300 210')

    bFlowerAnim.playAnim();
}

function pickFlower(flowerIndex, svgVBParams) {
    var svg = document.getElementById("svg-plant");
    svg.setAttribute('viewBox', svgVBParams);

    activeFlower.classList.add('hidden');
    activeFlower = flowers[flowerIndex];
    activeFlower.classList.remove('hidden');

/*
    activeButton.classList.remove('disabled');
    activeButton = flowerButtons[flowerIndex];
    activeButton.classList.add('disabled');
    */

    bFlowerAnim.setPhases(activeFlower.getAttribute('id'));
}

bFlowerAnim.setPhases(activeFlower.getAttribute('id'));
