// gsap.config({ trialWarn: false });

/* blomsterstand */

class BlomsterstandBlomst {
  constructor(id, transformOrigin) {
      this.id = id;
      this.transformOrigin = transformOrigin;
  }
}

var rectangleMovable = "#rect1"; // middle rectangle hiding upper stem
var delay = 0;
var durationTime = 0.3; // skal vaere 1 i endelig versjon
var hovedStilkBlomst = '#hovedStilkBlomst';

function FlowerAnimationTest() {
    this.phazeIndex = 0;
    this.sfPhazeIndex = 0;
    this.buttonSF = document.querySelector('#playBloomStemButton');

    this.alienphases = [];
    this.sfPhases= [];
    this.tl = gsap.timeline();
}

FlowerAnimationTest.prototype = {
    resettSF: function () {
        this.sfPhazeIndex = 0;
        this.setupAlienFlower();
    },
    playSFAnim: function () {
        this.buttonSF.disabled = true;
        
        if (this.sfPhazeIndex < this.sfPhases.length) {
            this.sfPhases[this.sfPhazeIndex]();
        } else {
            this.resettSF();
        }
    },
    updateSFPhase: function () {
         if ((this.sfPhases) && this.sfPhazeIndex < (this.sfPhases.length)) {

            this.sfPhazeIndex += 1;
            this.setButtonSFText("Fase ");
        }
    },
    finalSFPhase: function () {
 
        this.sfPhazeIndex += 1;

        this.setButtonSFText("Start igjen ");
    },
    setButtonSFText: function (text) {
        this.buttonSF.innerHTML = text + String(this.sfPhazeIndex + 1);
        this.buttonSF.disabled = false;
    },
    hovedStilkBlomstAnim: function () {

        gsap.to("#rect1-group", { scale: 1}) // TODO: denne skal vaere paa plass naar stilken vokser

        this.tl.add('start')
        .to("g#hovedStilkBlomst", { duration: durationTime, y: -16 }, 'start')
        .to("#topPathFlower-group", { scale: 1, y: 185, x: -14,
                        onComplete: this.updateSFPhase,
                        callbackScope: this }, 'start');
    },
    moveStilkAndMidStemFlowerUp: function () {

        gsap.to("#rect1-group", { y: -20})
        gsap.to("#topPathFlower-group", { duration: durationTime, x: -15, y: 170,
            onComplete: this.updateSFPhase, callbackScope: this 
         })

    },
    moveStilkAndMidStemFlowerUp3: function () {

        gsap.to("#rect1-group", { y: -54})
        gsap.to("#topPathFlower-group", { duration: durationTime,  rotation: 35, x: 8, y: 132,
            onComplete: this.updateSFPhase, callbackScope: this 
         })

    },
    moveStilkAndMidStemFlowerUp4: function () {

        gsap.to("#rect1-group", { y: -73})
        gsap.to("#topPathFlower-group", { duration: durationTime, x: 17, y: 112,
            onComplete: this.updateSFPhase, callbackScope: this 
         })

    },
    moveStilkAndMidStemFlowerUp5: function () {

        gsap.to("#rect1-group", { scale: 0})
        gsap.to("#topPathFlower-group", { duration: durationTime, x: 1, y: 8, rotation: -2,
            onComplete: this.updateSFPhase, callbackScope: this 
         })

    },
    getIdGsapSFArr: function (group, method) {
        var idGsapArr = this.alienSetupStemsAndFlowers(group, method);
        let sfPhases = [];

        idGsapArr.forEach((alien, index) => {
            let idGsapFn = () => {
                idGsapArr[index]();
            }
            sfPhases.push(idGsapFn);
        });

        return sfPhases;
    },
    getGsapValStemsAndFlowers: function (index, method) {
        let gsapVals = 0;

        switch(method) {
            case "bottom":
                gsapVals = this.getGsapValsBottomStemsAndFlowers(index);
                break;
            case "group2":
                gsapVals = this.getGsapVals2StemsAndFlowers(index);
                break;
            default:
                // code block
            }

        return gsapVals;
    },
    getGsapValsBottomStemsAndFlowers: function (index) {
        let gsapVals = 0;

        if (index === 1) {
            gsapVals = {x: -2 };
        } else if (index === 2) {
            gsapVals = {x: -8 };        
        }  else if (index === 3) {
            gsapVals = {x: -6 };        
        } else if (index === 4) {
            gsapVals = {x: -8 };        
        }

        return gsapVals;
    },
    getGsapVals2StemsAndFlowers: function (index) {
        let gsapVals = 0;

        if (index === 0) {
            gsapVals = {x: - 3, y: 1};
        } 
        return gsapVals;
    },
    alienSetupStemsAndFlowers: function (group, method) {
        const stemFlowerGroupElement = document.getElementById(group);
        const idGsapArr = [];
        var self = this; // bruke denne i loopen?
        
        if (stemFlowerGroupElement) {
            const groups = stemFlowerGroupElement.querySelectorAll('g');
     
            groups.forEach((group, index) => {
                const id = "#" +group.id;                
                let gsapVals = this.getGsapValStemsAndFlowers(index, method);

                 var  stemFn =
                        function () {
                            gsap.to(id, { duration: durationTime, scale: 1,
                                onComplete: self.updateSFPhase, callbackScope: self
                            });
                        }
                        if (gsapVals) {                           
                            gsap.to(id, gsapVals);
                        }
               idGsapArr.push(stemFn);
            })
        }
        return idGsapArr;
    },
    alienSetupGroup4StemsAndFlowers: function () {        
        const stemFlowerGroupElement = document.getElementById('groupSF4');
        const idGsapArr = [];
        var self = this; 
        
        if (stemFlowerGroupElement) {
            const groups = stemFlowerGroupElement.querySelectorAll('g');
     
            groups.forEach((group, index) => {
                const id = "#" +group.id;

                 var  stemFn =
                        function () {
                            gsap.to(id, { duration: durationTime, scale: 1,
                                onComplete: self.updateSFPhase, callbackScope: self
                            });
                        }
               idGsapArr.push(stemFn);
            })
        }
        return idGsapArr;
    },
    alienSetupGroup5StemsAndFlowers: function () {        
        const stemFlowerGroupElement = document.getElementById('groupSFRestStems-group');
        const idGsapArr = [];
        var self = this; 
        
        if (stemFlowerGroupElement) {
            const groups = stemFlowerGroupElement.querySelectorAll('g');
     
            groups.forEach((group) => {
                const id = "#" +group.id;

                 var  stemFn =
                        function () {
                            gsap.to(id, { duration: durationTime, scale: 1,
                                onComplete: self.updateSFPhase, callbackScope: self
                            });
                        }
               idGsapArr.push(stemFn);
            })
        }
        return idGsapArr;
    },
    alienSetupBottomStemsAndFlowersPathScales: function () { // denne er korrekt
        const stemFlowerGroupElement = document.getElementById('groupSFBottomStems-group');

        if (stemFlowerGroupElement) {
            const groups = stemFlowerGroupElement.querySelectorAll('g');

            groups.forEach((group, index) => {
                const id = "#" +group.id;

                gsap.set(id, { duration: durationTime, scale: 0, transformOrigin: "right" });

            });
        } else {
           // console.error('Group element with ID "myGroup" not found.');
        }
    },
    alienSetupGroup2StemsAndFlowersPathScales: function () { // denne er korrekt
        const stemFlowerGroupElement = document.getElementById('groupSF2');

        if (stemFlowerGroupElement) {
            const groups = stemFlowerGroupElement.querySelectorAll('g');

            groups.forEach((group, index) => {
                const id = "#" +group.id;

                gsap.set(id, { duration: durationTime, scale: 0 });

            });
        } else {
           // console.error('Group element with ID "myGroup" not found.');
        }
    },
    alienSetupGroup3StemsAndFlowersPathScales: function () { // denne er korrekt
        const stemFlowerGroupElement = document.getElementById('groupSF3');

        if (stemFlowerGroupElement) {
            const groups = stemFlowerGroupElement.querySelectorAll('g');

            groups.forEach((group, index) => {
                const id = "#" +group.id;

                gsap.set(id, { duration: durationTime, scale: 0 });

            });
        } else {
           // console.error('Group element with ID "myGroup" not found.');
        }
    },
    alienSetupGroup4StemsAndFlowersPathScales: function () { // denne er korrekt
        const stemFlowerGroupElement = document.getElementById('groupSF4');

        if (stemFlowerGroupElement) {
            const groups = stemFlowerGroupElement.querySelectorAll('g');

            groups.forEach((group) => {
                const id = "#" +group.id;

                // console.log("id: " + id);

                gsap.set(id, { duration: durationTime, scale: 0 });

            });
        } else {
           // console.error('Group element with ID "myGroup" not found.');
        }
    },
    alienSetupGroup5StemsAndFlowersPathScales: function () { // denne er korrekt
        const stemFlowerGroupElement = document.getElementById('groupSFRestStems-group');

        if (stemFlowerGroupElement) {
            const groups = stemFlowerGroupElement.querySelectorAll('g');

            groups.forEach((group) => {
                const id = "#" +group.id;

                gsap.set(id, { duration: durationTime, scale: 0 });

            });
        } else {
           // console.error('Group element with ID "myGroup" not found.');
        }
    },
    setupAlienFlower: function () {
        this.phazeIndex = 0;

        this.alienSetupBottomStemsAndFlowersPathScales();
        this.alienSetupGroup2StemsAndFlowersPathScales();
        this.alienSetupGroup3StemsAndFlowersPathScales();
        this.alienSetupGroup4StemsAndFlowersPathScales();
        this.alienSetupGroup5StemsAndFlowersPathScales();

        var phase7 = () => {
            this.hovedStilkBlomstAnim();
        }

        var phase8 = () => {
            this.moveStilkAndMidStemFlowerUp();
        }

        var phase9 = () => {
            this.moveStilkAndMidStemFlowerUp3();
        }

        var phase10 = () => {
            this.moveStilkAndMidStemFlowerUp4();
        }

        var phase11 = () => {
            this.moveStilkAndMidStemFlowerUp5();
        }

        let alienPhasesGsapSFArrBottom = this.getIdGsapSFArr('groupSFBottomStems-group', "bottom");
        let alienPhasesGsapSFArrGroup2 = this.getIdGsapSFArr('groupSF2', "group2");
        let alienPhasesGsapSFArrGroup3 = this.getIdGsapSFArr('groupSF3');
        let alienPhasesGsapSFArrGroup4 = this.getIdGsapSFArr('groupSF4');
        let alienPhasesGsapSFArrGroup5 = this.getIdGsapSFArr('groupSFRestStems-group');

        this.sfPhases = [phase7].concat(alienPhasesGsapSFArrBottom).concat([phase8])
        .concat(alienPhasesGsapSFArrGroup2).concat([phase9]).concat(alienPhasesGsapSFArrGroup3)
        .concat([phase10]).concat(alienPhasesGsapSFArrGroup4).concat([phase11]).concat(alienPhasesGsapSFArrGroup5);

        // TODO: slett alienphases og alt tilbehoer
        // mink svg-bredden 1 px
        // rydd i animering slik at hoyre-stilken vokser fra venstre mot hoyre og vise versa for venstre-stilkene.
        // fix fargen paa skjuleren foran hovedstilken slik at den matcher bakgrunnen bedre

        this.setButtonSFText("Fase ");

        gsap.set("#rect1-group", { x: 0, scale: 0});

        // viser under utvikling. skal skjules i produksjon
        gsap.set("#topPathFlower-group", { scale: 0.2, transformOrigin: "center" });
        gsap.set("g#hovedStilkBlomst", { scale: 1.1, x: -4, y: 220 });
    }
}

var bloomFlowerAnim = new FlowerAnimationTest();
bloomFlowerAnim.setupAlienFlower();

function playStemFlowerBloom() {
    bloomFlowerAnim.playSFAnim();
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
        this.button.innerHTML = text + String(this.phazeIndex + 1);
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

        this.setButtonText("Fase ");

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
        gsap.from("#stem", 1, {drawSVG: 0, onComplete: this.finalPhase, callbackScope: this});
    },
    showFlower: function () {
        gsap.to("#flower", { duration: 1, opacity: 1, onComplete: this.finalPhase, callbackScope: this });
    },
    finalPhase: function () {
        this.phazeIndex += 1;
        this.setButtonText("Start igjen ")
    },
    updatePhase: function () {
        
        if (this.phases && this.phazeIndex < this.phases.length) {
            this.phazeIndex += 1;
            this.setButtonText("Fase ");
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

        this.setButtonText("Fase ");


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


function playBloom() {

    bloomFlowerAnim.playAnim();
}

function play() {
    // pickFlower(0, '0 0 300 210')

    bFlowerAnim.playAnim();
}

function pickFlower(flowerIndex, svgVBParams) {
    var svg = document.getElementById("svg-plant");
    svg.setAttribute('viewBox', svgVBParams);

    activeFlower.classList.add('hidden');
    activeFlower = flowers[flowerIndex];
    activeFlower.classList.remove('hidden');

    activeButton.classList.remove('disabled');
    activeButton = flowerButtons[flowerIndex];
    activeButton.classList.add('disabled');

    bFlowerAnim.setPhases(activeFlower.getAttribute('id'));
}

bFlowerAnim.setPhases(activeFlower.getAttribute('id'));
