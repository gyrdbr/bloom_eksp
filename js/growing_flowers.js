// gsap.config({ trialWarn: false });

/* blomsterstand */

class InflorescenceLeaf {
    constructor(id, transformOrigin, startScale) {
        this.id = id;
        this.transformOrigin = transformOrigin;
        this.startScale = startScale;
    }
}

class BlomsterstandBlomst {
  constructor(id, transformOrigin) {
      this.id = id;
      this.transformOrigin = transformOrigin;
  }
}

var blomstButton = document.getElementById('startBlomst-button-svg');
var blomsterstandFlower = document.getElementById('wholeInflorecence');
var longFlowerstem = "#pathHovedStilk";
var topPathFlowerMovable = "#path3";
var delay = 0;
var durationTime = 0.5; // skal vaere 1 i endelig versjon

let topBlomstMovable = new BlomsterstandBlomst("#path3", "0 0");

var pathLeft1 = "#pathLeft1"; // stilk
var leftPath1Flower = "#leftPath1Flower"; // blomst

function FlowerAnimationTest() {
    this.phazeIndex = 0;
    this.button = document.querySelector('#playBloomButton');

    this.alienphases = [];

}

FlowerAnimationTest.prototype = {
    resett: function () {
        this.phazeIndex = 0;
        this.setupAlienFlower();
    },
    playAnim: function () {
        if (this.phazeIndex < this.alienphases.length) {
            this.alienphases[this.phazeIndex]();
        } else {
            this.resett();
        }
    },
    updatePhase: function () {

        if ((this.alienphases) && this.phazeIndex < (this.alienphases.length)) {
            this.phazeIndex += 1;

            this.setButtonText("Fase ");
        }
    },
    finalPhase: function () {
 
        this.phazeIndex += 1;
        this.setButtonText("Start igjen ")
    },
    setButtonText: function (text) {
        this.button.innerHTML = text + String(this.phazeIndex + 1);
        this.button.classList.remove('disabled');
    },
    alienPhase1: function () {
        this.button.classList.add('disabled');

        gsap.to("#pathHovedStilk", { duration: durationTime, y: -9,  
            onComplete: this.alienPhase1b, 
            callbackScope: this
        });
        gsap.to(topPathFlower, { duration: durationTime, y: 0});
        
    },
    alienPhase1b: function () {

        gsap.to(topPathFlowerMovable, 
                    {scale: 1, duration: durationTime, transformOrigin: "50% bottom",
                        onComplete: this.updatePhase, 
                        callbackScope: this
            });
    },
    alienPhase2: function () {
        this.button.classList.add('disabled');

        gsap.to("#pathLeft1", { duration: durationTime, scale: 1, 
            onComplete: this.alienPhase2b, callbackScope: this
         });

    },
    alienPhase2b: function () {

        gsap.to(leftPath1Flower, { duration: durationTime, scale: 1,
            onComplete: this.updatePhase, callbackScope: this });

    },
    alienPhase3b: function () {
        const id = "#path2"; // flower
        const moveLeft = -3;

        gsap.to(id, { duration: durationTime, scale: 1, x: moveLeft,
           onComplete: this.updatePhase, callbackScope: this
        });
    },
    alienPhase4b: function () {
        const id = "#path1"; // flower
        const moveLeftThree = -77;

         gsap.to(id, { duration: durationTime, scale: 0.11, x: moveLeftThree,
            onComplete: this.updatePhase, callbackScope: this
         });
    },
    alienPhase5b: function () {
        const id = "#path1-8"; // flower
        const moveLeft = -3;

         gsap.to(id, { duration: durationTime, scale: 1, transformOrigin: "left", x: moveLeft, y: 7,
            onComplete: this.updatePhase, callbackScope: this
         });
    },
    alienPhase6b: function () {
        const id = "#path1-5"; // flower

         gsap.to(id, { duration: durationTime, scale: 1, x: -3, y: 7,
            onComplete: this.updatePhase, callbackScope: this
         });
    },
    alienPhase7b: function () {
        const id = "#path3-1"; // flower

         gsap.to(id, { duration: durationTime, scale: 1, x: -3, y: 7,
            onComplete: this.finalPhase, callbackScope: this
         });
    },
    alienSetupFlowers1Left: function () {
        const flowerGroupElement = document.getElementById('g4');
        const idGsapArr = [];
        var self = this;
        const moveLeft = -3;
        const moveLeftThree = -77;


        if (flowerGroupElement) {
            const paths = flowerGroupElement.querySelectorAll('path');


            paths.forEach((path, index) => {
                const id = "#" +path.id;
                
                if (id === "#" + "path2") {

                    const stem0 = 
                        function () {
                            gsap.to(id, { duration: durationTime, scale: 1, x: moveLeft,
                                onComplete: self.updatePhase, callbackScope: self
                            });

                        }
                        idGsapArr.push(stem0);
                }

                if (id === "#" + "path1") {}

                    const stem1 =
                            function () {
                                gsap.to(id, { duration: durationTime, scale: 0.11, x: moveLeftThree,
                                    onComplete: self.updatePhase, callbackScope: self
                                });

                            }
                            // idGsapArr.push(stem1);

                });
                        
        }

        return idGsapArr;
    },
    alienSetupStems1: function () {        
        this.button.classList.add('disabled');
        const stemGroupElement = document.getElementById('groupStilkLeftBottom');
        const moveLeft = -3;
        const idGsapArr = [];
        var self = this; // bruke denne i loopen?
        var flowers1LeftArr = this.alienSetupFlowers1Left();

        var alienPhaseArr = [flowers1LeftArr[0], this.alienPhase4b, this.alienPhase5b, this.alienPhase6b, this.alienPhase7b];
        var xArr = [null, moveLeft, moveLeft, -4, moveLeft];
        var yArr = [null, null, null, 7, 7];
        
        if (stemGroupElement) {
            const paths = stemGroupElement.querySelectorAll('path');
     
            paths.forEach((path, index) => {
                const id = "#" +path.id;              
                var stemFn = 
                    function () {
                        gsap.to(id, { duration: durationTime, scale: 1, x: xArr[index], y: yArr[index],
                            onComplete: alienPhaseArr[index], callbackScope: self
                        });
                    };
                  
                idGsapArr.push(stemFn);
            })
        }      
        return idGsapArr;
    },
    alienSetupPathScales1: function () {
        const stemGroupElement = document.getElementById('groupStilkLeftBottom');
        const flowerGroupElement = document.getElementById('g4');

        if (stemGroupElement) {
            const paths = stemGroupElement.querySelectorAll('path');
            paths.forEach((path, index) => {
                const id = "#" +path.id;
                // console.log(`Stilk path ${index} 'id' attribute:`, id);

                gsap.set(id, { duration: durationTime, scale: 0, transformOrigin: "right" });

            });
        } else {
           // console.error('Group element with ID "myGroup" not found.');
        }

        if (flowerGroupElement) {
            const paths = flowerGroupElement.querySelectorAll('path');

            paths.forEach((path, index) => {
                const id = "#" +path.id;

                gsap.set(id, { duration: durationTime, scale: 0 });

            });
        } else {
            console.error('Group element with ID "myGroup" not found.');
        }
    },
    setupAlienFlower: function () {

        this.phazeIndex = 0;

        var idGsapArr = this.alienSetupStems1();
        const flowersLeftBottom = this.alienSetupFlowers1Left();
        this.alienSetupPathScales1();

        var phase1 = () => {
            this.alienPhase1();
        }

        var phase2 = () => {
            this.alienPhase2();
        }
        
        var phase3 = () => {
            idGsapArr[0]();

        }

        var phase4 = () => {
            idGsapArr[1]();
        }

        var phase5 = () => {
            idGsapArr[2]();
        }

        var phase6 = () => {
            idGsapArr[3]();
        }

        var phase7 = () => {
            idGsapArr[4]();
        }

        // todo lag tabell for x og y til blomsteranimasjonene

        // problemet er at playAnim ikke kalles igjen naar den er ferdig med fase 1.
        //  Det er fordi updatePhase ikke oppdaterer phazeIndex for alien phases. Det er fordi updatePhase sjekker bloom
        this.alienphases = [phase1, phase2, phase3, phase4, phase5, phase6, phase7];

        this.setButtonText("Fase ");

        // TODO: denne maa ha x: -13 fordi den flyttes noen pixler naar den vokser
        // viser under utvikling. skal skjules i produksjon
        
        gsap.set(longFlowerstem, { scale: 1.1, transformOrigin: "100% 100%", x: -12,y: 220 });

        
        gsap.set("#path3", { scale: 0, transformOrigin: "50% bottom", x: -1 });

        
        gsap.set(pathLeft1, { scale: 0, scaleX: 0, transformOrigin: "left"});
        gsap.set(leftPath1Flower, { scale: 0, transformOrigin: "100% bottom", x: 3, y: 2 });
        
 
    }
}

var bloomFlowerAnim = new FlowerAnimationTest();
bloomFlowerAnim.setupAlienFlower();

// console.log("bloomFlowerAnim", bloomFlowerAnim, "phazeIndex", bloomFlowerAnim.phazeIndex);

function playFlowerBloom() {
    bloomFlowerAnim.playAnim();
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
