// gsap.config({ trialWarn: false });

/* blomsterstand */

class InflorescenceLeaf {
    constructor(id, transformOrigin, startScale) {
        this.id = id;    var phase4 = () => {
            this.moveRectangleAndMidFlowerUp();
        }
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
var rectangleMovableInSvg = document.getElementById('rect1');
var longFlowerstem = "#pathHovedStilk";
var rectangleMovable = "#rect1"; // middle rectangle hiding upper stem
var topPathFlowerMovable = "#path3";
var delay = 0;
var durationTime = 0.5; // skal vaere 1 i endelig versjon

let topBlomstMovable = new BlomsterstandBlomst("#path3", "0 0");

var pathLeft1 = "#pathLeft1"; // stilk
var leftPath1Flower = "#leftPath1Flower"; // blomst

function blomsterstandStyle () {
    const rect = document.getElementById('rect1');

    rect.style.display = 'inline';
}

// TODO rectangle skal med, men maa flyttes oppover etterhvert
// blomsterstandStyle();

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
        this.button.disabled = true;
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

        this.setButtonText("Start igjen ");
    },
    setButtonText: function (text) {
        this.button.innerHTML = text + String(this.phazeIndex + 1);
        this.button.disabled = false;
    },
    alienPhase1: function () {

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
        

        gsap.to("#pathLeft1", { duration: durationTime, scale: 1, 
            onComplete: this.alienPhase2b, callbackScope: this
         });

    },
    alienPhase2b: function () {

        gsap.to(leftPath1Flower, { duration: durationTime, scale: 1,
            onComplete: this.updatePhase, callbackScope: this });

    },
    moveRectangleAndMidFlowerUp: function () {
           
        gsap.to(rectangleMovable, { duration: durationTime, y: -13,
            onComplete: this.moveTopPathFlowerMovable,
            callbackScope: this
        });
        gsap.to(topPathFlowerMovable, { duration: durationTime, x: - 5, y: -13}); // trengs denne?
    },
    moveTopPathFlowerMovable: function () {

        gsap.to(topPathFlowerMovable, 
                    {scale: 1, duration: durationTime, x: -3,
                        onComplete: this.updatePhase, 
                        callbackScope: this
            });
    },
    getGsapValsBottomFlowers: function (index) {
        let gsapVals = null;
        const moveLeft = -3;

        // todo oppdater index
        if (index === 0) {
            gsapVals = {x: 15 , y: 16};
        } else if (index === 2) {
            gsapVals = {x: moveLeft, y: 5};
        } else if (index === 4) {
            gsapVals = {x: -5 };
        } 

        return gsapVals;
    },
    getGsapValsRestFlowers: function (index) {
        let gsapVals = null;
        const moveLeft = -3;
        const moveDown = 7;

        if (index === 0) {
            gsapVals = {transformOrigin: "left", x: moveLeft, y: moveDown};
        } else if (index === 6 || index === 3) {
                gsapVals = {x: -5, y: moveDown};
        }

        return gsapVals;
    },
    getGsapValsBottomStems: function (index) {
        let gsapVals = 0;
        const moveLeft = -3;

        // console.log("getGsapValsBottomStems", "index", index);
        // todo oppdater index

        if (index === 0) {
            gsapVals = {x: 110, y: 55};
        } else if (index === 2) {
            gsapVals = {x: moveLeft, y: 5 };        
        } else if (index === 4) {
            gsapVals = {x: -5  };
        }

        return gsapVals;
    },
    getIdGsapArrBottom: function () {
        var idGsapArr = this.alienSetupBottomStems();
        let alienphases = [];
        
        // er feilen her?
        idGsapArr.forEach((alien, index) => {
            let idGsapFn = () => {
                idGsapArr[index]();
            }
            alienphases.push(idGsapFn);
        });

        return alienphases;
    },
    getIdGsapArrRest: function () {
        var idGsapArr = this.alienSetupRestStems();
        let alienphases = [];
        
        idGsapArr.forEach((alien, index) => {
            let idGsapFn = () => {
                idGsapArr[index]();
            }
            alienphases.push(idGsapFn);
        });

        return alienphases;
    },
    alienSetupBottomFlowers: function () {
        const flowerGroupElement = document.getElementById('groupBottomFlowers');
        const idGsapArr = [];
        var self = this;

        if (flowerGroupElement) {
            const paths = flowerGroupElement.querySelectorAll('path');

            paths.forEach((path, index) => {
                const id = "#" +path.id;
                let gsapVals = this.getGsapValsBottomFlowers(index);            

                let stemFn = 
                    function () {                      
                        gsap.to(id, { duration: durationTime, scale: 1, 
                            onComplete: self.updatePhase, callbackScope: self
                        });                    
                        if (gsapVals) {
                            // legger til gsap som skal ha flere values
                            gsap.to(id, gsapVals);
                        }                     
                    };
                idGsapArr.push(stemFn);
                });      
        }
        return idGsapArr;
    },
    alienSetupFlowersGroup2: function () {
        const flowerGroupElement = document.getElementById('group2Flowers');
        const idGsapArr = [];
        var self = this;

        if (flowerGroupElement) {
            const paths = flowerGroupElement.querySelectorAll('path');

            paths.forEach((path, index) => {
                const id = "#" +path.id;
                // let gsapVals = this.getGsapValsBottomFlowers(index);            

                let stemFn = 
                    function () {                      
                        gsap.to(id, { duration: durationTime, scale: 1, 
                            onComplete: self.updatePhase, callbackScope: self
                        });
                        /*                   
                        if (gsapVals) {
                            // legger til gsap som skal ha flere values
                            gsap.to(id, gsapVals);
                        }
                            */                    
                    };
                idGsapArr.push(stemFn);
                });      
        }
        return idGsapArr;
    },
    alienSetupFlowersGroup3: function () {
        const flowerGroupElement = document.getElementById('group3Flowers');
        const idGsapArr = [];
        var self = this;

        if (flowerGroupElement) {
            const paths = flowerGroupElement.querySelectorAll('path');

            paths.forEach((path, index) => {
                const id = "#" +path.id;
                // let gsapVals = this.getGsapValsBottomFlowers(index);            

                let stemFn = 
                    function () {                      
                        gsap.to(id, { duration: durationTime, scale: 1, 
                            onComplete: self.updatePhase, callbackScope: self
                        });
                        /*                
                        if (gsapVals) {
                            // legger til gsap som skal ha flere values
                            gsap.to(id, gsapVals);
                        }
                            */
                    };
                idGsapArr.push(stemFn);
                });      
        }
        return idGsapArr;
    },
    alienSetupRestFlowers: function () { // TODO: la hovedstilken og blomsten vokse etter hoyre-stilken
        const flowerGroupElement = document.getElementById('groupRestFlowers');
        const idGsapArr = [];
        var self = this;

        if (flowerGroupElement) {
            const paths = flowerGroupElement.querySelectorAll('path');

            paths.forEach((path, index) => {
                const id = "#" +path.id;
                let gsapVals = this.getGsapValsRestFlowers(index);

                let stemFn = 
                    function () {   
                        // console.log("index2", index, "id2", id, "path4-1-2");                     
                        gsap.to(id, { duration: durationTime, scale: 1, 
                            onComplete: self.updatePhase, callbackScope: self
                        });                    
                        if (gsapVals) {
                            // legger til gsap som skal ha flere values
                            gsap.to(id, gsapVals);
                        }                      
                    };
                idGsapArr.push(stemFn);
                });      
        }
        return idGsapArr;
    },
    alienSetupBottomStems: function () {        
        const stemGroupElement = document.getElementById('groupBottomStems');
        const idGsapArr = [];
        var self = this; // bruke denne i loopen?
        var alienPhaseArr = this.alienSetupBottomFlowers();   
        
        if (stemGroupElement) {
            const paths = stemGroupElement.querySelectorAll('path');
     
            paths.forEach((path, index) => {
                const id = "#" +path.id;
                let gsapVals = this.getGsapValsBottomStems(index);
                
                var stemFn =
                    function () {  
                        gsap.to(id, { duration: durationTime, scale: 1,
                            onComplete: alienPhaseArr[index], callbackScope: self
                        });
                        if (gsapVals) {
                            gsap.to(id, gsapVals);
                        }
                    };
                  
                idGsapArr.push(stemFn);
            })
        }
        return idGsapArr;
    },
    alienSetupStemGroup2: function () {        
        const stemGroupElement = document.getElementById('group2');
        const idGsapArr = [];
        var self = this; // bruke denne i loopen?
        var alienPhaseArr = this.alienSetupFlowersGroup2();   
        
        if (stemGroupElement) {
            const paths = stemGroupElement.querySelectorAll('path');
     
            paths.forEach((path, index) => {
                const id = "#" +path.id;
                let gsapVals = this.getGsapValsBottomStems(index);
                
                var stemFn =
                    function () {  
                        gsap.to(id, { duration: durationTime, scale: 1,
                            onComplete: alienPhaseArr[index], callbackScope: self
                        });
                        if (gsapVals) {
                            gsap.to(id, gsapVals);
                        }
                    };
                  
                idGsapArr.push(stemFn);
            })
        }
        return idGsapArr;
    },
    alienSetupStemGroup3: function () {        
        const stemGroupElement = document.getElementById('group3');
        const idGsapArr = [];
        var self = this; // bruke denne i loopen?
        var alienPhaseArr = this.alienSetupFlowersGroup3();   
        
        if (stemGroupElement) {
            const paths = stemGroupElement.querySelectorAll('path');
     
            paths.forEach((path, index) => {
                const id = "#" +path.id;
                let gsapVals = this.getGsapValsBottomStems(index);
                
                var stemFn =
                    function () {  
                        gsap.to(id, { duration: durationTime, scale: 1,
                            onComplete: alienPhaseArr[index], callbackScope: self
                        });
                        if (gsapVals) {
                            gsap.to(id, gsapVals);
                        }
                    };
                  
                idGsapArr.push(stemFn);
            })
        }
        return idGsapArr;
    },
    alienSetupRestStems: function () {        
        const stemGroupElement = document.getElementById('groupRestStems');
        const idGsapArr = [];
        var self = this; // bruke denne i loopen?
        var alienPhaseArr = this.alienSetupRestFlowers();   
        
        if (stemGroupElement) {
            const paths = stemGroupElement.querySelectorAll('path');
     
            paths.forEach((path, index) => {
                const id = "#" +path.id;
                let gsapVals = this.getGsapValsRestFlowers(index); 
                
                var stemFn = 
                    function () {   
                        gsap.to(id, { duration: durationTime, scale: 1,
                            onComplete: alienPhaseArr[index], callbackScope: self
                        });
                        if (gsapVals) {
                            // legger til gsap som skal ha flere values
                            gsap.to(id, gsapVals);
                        }
                    };
                  
                idGsapArr.push(stemFn);
            })
        }
        return idGsapArr;
    },
    alienSetupBottomPathScales: function () { // denne er korrekt
        const stemGroupElement = document.getElementById('groupBottomStems');
        const flowerGroupElement = document.getElementById('groupBottomFlowers');

        if (stemGroupElement) {
            const paths = stemGroupElement.querySelectorAll('path');

            // console.log("alienSetupBottomPathScales");
            paths.forEach((path, index) => {
                const id = "#" +path.id;

                // console.log("id", id);
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
            // console.error('Group element with ID "myGroup" not found.');
        }
    },
    alienSetupRestPathScales: function () { // denne er fail
        const stemGroupElement = document.getElementById('groupRestStems');
        const flowerGroupElement = document.getElementById('groupRestFlowers');

        if (stemGroupElement) {
            const paths = stemGroupElement.querySelectorAll('path');
            paths.forEach((path, index) => {
                const id = "#" +path.id;

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
            // console.error('Group element with ID "myGroup" not found.');
        }
    },
    getIdGsapArrBottomLeft: function () {
        var idGsapArr = this.alienSetupStems1();
        let alienphases = [];
        

        idGsapArr.forEach((alien, index) => {
            let idGsapFn = () => {
                idGsapArr[index]();
            }
            alienphases.push(idGsapFn);
        });

        return alienphases;
    },
    getGsapValsFlowers1: function (index) {
        let gsapVals = null;
        const moveLeft = -3;
        const moveDown = 7;

        if (index === 0 || index === 1) {
            gsapVals = {x: moveLeft};
        } else if (index === 2) {
             gsapVals = {transformOrigin: "left", x: moveLeft, y: moveDown};
        } else if (index === 3 || index === 4) {
             gsapVals = {x: moveLeft, y: moveDown};
        }

        return gsapVals;
    },
    alienSetupFlowers1Left: function () {
        const flowerGroupElement = document.getElementById('groupLeftBottom');
        const idGsapArr = [];
        var self = this;

        if (flowerGroupElement) {
            const paths = flowerGroupElement.querySelectorAll('path');

            paths.forEach((path, index) => {
                const id = "#" +path.id;
                let gsapVals = this.getGsapValsFlowers1(index);

                let stemFn = 
                    function () {
                        gsap.to(id, { duration: durationTime, scale: 1, 
                            onComplete: self.updatePhase, callbackScope: self
                        });
                        if (gsapVals) {
                            // legger til gsap som skal ha flere values
                            gsap.to(id, gsapVals);
                        }
                    };
                idGsapArr.push(stemFn);
                });      
        }
        return idGsapArr;
    },
    getXYPairFlowers2: function (index) {
        let xyPair = null;

        if (index === 0) {
            xyPair = {x: -5, y: 7};
        } else if (index === 4) {
             xyPair = {x: -1};
        }

        return xyPair;
    },
    alienSetupFlowers2Left: function () {
        const flowerGroupElement = document.getElementById('groupLeftTop');
        const idGsapArr = [];
        var self = this;
        
        if (flowerGroupElement) {
            const paths = flowerGroupElement.querySelectorAll('path');

            paths.forEach((path, index) => {
                const id = "#" +path.id;
                let xyPair = this.getXYPairFlowers2(index);

                let stemFn = 
                    function () {
                        gsap.to(id, { duration: durationTime, scale: 1, 
                            onComplete: self.updatePhase, callbackScope: self
                        });
                        if (xyPair) {
                            // legger til gsap som skal ha x (og evt y)
                            gsap.to(id, xyPair);
                        }
                    };
                idGsapArr.push(stemFn);
                });
        }
        return idGsapArr;       
    },
    alienSetupFlowers1Right: function () {
        const flowerGroupElement = document.getElementById('groupRightBottom');
        const idGsapArr = [];
        var self = this;
        
        if (flowerGroupElement) {
            const paths = flowerGroupElement.querySelectorAll('path');

            paths.forEach(path => {
                const id = "#" +path.id;

                let stemFn = 
                        function () {
                            gsap.to(id, { duration: durationTime, scale: 1, 
                                onComplete: self.updatePhase, callbackScope: self
                            });                    
                        };
                    idGsapArr.push(stemFn);
                    
                });
        }

        return idGsapArr;       
    },
    getXFlowersMiddleRight: function (index) {
        let xVal = null;

        if (index === 0) {
            xVal = {x: 4};
        } 

        return xVal;
    },
    alienSetupFlowersMiddleRight: function () {
        const flowerGroupElement = document.getElementById('groupPathRightMiddleFlower');
        const idGsapArr = [];
        var self = this;
        
        if (flowerGroupElement) {
            const paths = flowerGroupElement.querySelectorAll('path');

            paths.forEach((path, index) => {
                const id = "#" +path.id;
                let xVal = this.getXFlowersMiddleRight(index);

                let stemFn = 
                        function () {
                            gsap.to(id, { duration: durationTime, scale: 1, 
                                onComplete: self.updatePhase, callbackScope: self
                            });
                            if (xVal) {
                                // legger til gsap som skal ha x 
                                gsap.to(id, xVal);
                            }                 
                        };
                    idGsapArr.push(stemFn);
                    
                });
        }

        return idGsapArr;       
    },
    getXYPairTopRightFlowers: function (index) {
        let xyPair = null;

        if (index === 0) {
            xyPair = {x: +2};
        } else if (index === 1) {
            xyPair = {x: 56 };
        } else if (index === 2) {
            xyPair = {x: 57, y: 2};
        }

        return xyPair;
    },
    alienSetupFlowersTopRight: function () {
        const flowerGroupElement = document.getElementById('groupRightTop3');
        const idGsapArr = [];
        var self = this;
        
        if (flowerGroupElement) {
            const paths = flowerGroupElement.querySelectorAll('path');

            paths.forEach((path, index) => {
                const id = "#" +path.id;
                let xyVal = this.getXYPairTopRightFlowers(index);

                let stemFn = 
                        function () {
                            gsap.to(id, { duration: durationTime, scale: 1, 
                                onComplete: self.updatePhase, callbackScope: self
                            });
                            if (xyVal) {
                                // legger til gsap som skal ha x 
                                gsap.to(id, xyVal);
                            }                
                        };
                    idGsapArr.push(stemFn);
                    
                });
        }

        return idGsapArr;       
    },
    alienSetupStems1: function () {        
        const stemGroupElement = document.getElementById('groupStilkLeftBottom');
        const moveLeft = -3;
        const idGsapArr = [];
        var self = this; // bruke denne i loopen?
        var alienPhaseArr = this.alienSetupFlowers1Left();
        var xArr = [null, moveLeft, moveLeft, -4, moveLeft];
        var yArr = [null, null, null, 7, 7];
        
        
        if (stemGroupElement) {
            const paths = stemGroupElement.querySelectorAll('path');
     
            paths.forEach((path, index) => {
                const id = "#" +path.id;
                // self.button.disabled = true;
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
    getXYPairStems2: function (index) {
        let xyPair = null;

        if (index === 0) {
            xyPair = {x: -5, y: 7};
        } else if (index === 2 || index === 4) {
             xyPair = {x: -1};
        }

        return xyPair;
    },
    alienSetupStems2: function () {        
        const stemGroupTopElement = document.getElementById('groupStilkLeftTop');
        const idGsapArr = [];
        var alienPhaseArr = this.alienSetupFlowers2Left();
        
        if (stemGroupTopElement) {
            const paths = stemGroupTopElement.querySelectorAll('path');
     
            paths.forEach((path, index) => {
                const id = "#" +path.id;
                let xyPair = this.getXYPairStems2(index);

                let stemFn = 
                    function () {
                        gsap.to(id, { duration: durationTime, scale: 1, 
                            onComplete: alienPhaseArr[index], callbackScope: self
                        });
                        if (xyPair) {
                            // legger til gsap som skal ha x (og evt y)
                            gsap.to(id, xyPair);
                        }
                    };
                idGsapArr.push(stemFn);
            });
        }

        return idGsapArr;
    },
    alienSetupRightStems1: function () {        
        const groupStilkRightBottom = document.getElementById('groupStilkRightBottom');
        const idGsapArr = [];
        var alienPhaseArr = this.alienSetupFlowers1Right();
        
        if (groupStilkRightBottom) {
            const paths = groupStilkRightBottom.querySelectorAll('path');
     
            paths.forEach((path, index) => {
                const id = "#" +path.id;
                // self.button.disabled = true;
                let stemFn = 
                        function () {
                            gsap.to(id, { duration: durationTime, scale: 1, 
                                onComplete: alienPhaseArr[index], callbackScope: self
                            });
                        };

                    idGsapArr.push(stemFn);
            });
        }

        return idGsapArr;
    },
    alienSetupRightStemsMiddle: function () {
        const groupStilkRightMiddle = document.getElementById('groupStilkRightMiddle');
        const idGsapArr = [];
        var alienPhaseArr = this.alienSetupFlowersMiddleRight();
        
        if (groupStilkRightMiddle) {
            const paths = groupStilkRightMiddle.querySelectorAll('path');
     
            paths.forEach((path, index) => {
                const id = "#" +path.id;

                 let stemFn = 
                        function () {
                            gsap.to(id, { duration: durationTime, scale: 1, 
                                onComplete: alienPhaseArr[index], callbackScope: self
                            });
                        };

                    idGsapArr.push(stemFn);
            });
        }

        return idGsapArr;
    },
    getXYPairTopRightStems: function (index) {
        let xyPair = null;

        if (index === 1 || index === 2) {
             xyPair = {y: 6};
        }

        return xyPair;
    },
    alienSetupRightStemsTop: function () {
        const groupStilkRightTop = document.getElementById('groupStilkRightModeTop');
        const idGsapArr = [];
        var alienPhaseArr = this.alienSetupFlowersTopRight();
        
        if (groupStilkRightTop) {
            const paths = groupStilkRightTop.querySelectorAll('path');
     
            paths.forEach((path, index) => {
                const id = "#" +path.id;
                let xyVal = this.getXYPairTopRightStems(index);

                 let stemFn = 
                        function () {
                            gsap.to(id, { duration: durationTime, scale: 1, 
                                onComplete: alienPhaseArr[index], callbackScope: self
                            });
                        };
                        if (xyVal) {
                                // legger til gsap som skal ha x 
                                gsap.to(id, xyVal);
                            }
                                

                    idGsapArr.push(stemFn);
            });
        }

        return idGsapArr;
    },
    alienSetupPathScales1: function () {
        const stemGroupElement = document.getElementById('groupStilkLeftBottom');
        const flowerGroupElement = document.getElementById('groupLeftBottom');

        if (stemGroupElement) {
            const paths = stemGroupElement.querySelectorAll('path');
            paths.forEach((path, index) => {
                const id = "#" +path.id;

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
            // console.error('Group element with ID "myGroup" not found.');
        }
    },
    alienSetupPathScales2: function () {
        const stemGroupTopElement = document.getElementById('groupStilkLeftTop');
        const flowerGroupTopElement = document.getElementById('groupLeftTop');

        if (stemGroupTopElement) {
            const paths = stemGroupTopElement.querySelectorAll('path');

            paths.forEach((path) => {
                const id = "#" + path.id;

                gsap.set(id, { duration: durationTime, scale: 0, transformOrigin: "right" });
            });
        }

        if (flowerGroupTopElement) {
            const paths = flowerGroupTopElement.querySelectorAll('path');

            paths.forEach((path) => {
                const id = "#" +path.id;

                gsap.set(id, { duration: durationTime, scale: 0 });
            });
        }
    },
    alienSetupPathScalesRight1: function () {
        const stemGroupRightBottomElement = document.getElementById('groupStilkRightBottom');
        const flowerGroupRightBottomElement = document.getElementById('groupRightBottom');
  

        if (stemGroupRightBottomElement) {
            const paths = stemGroupRightBottomElement.querySelectorAll('path');

                paths.forEach((path) => {
                    const id = "#" + path.id;

                    gsap.set(id, { duration: durationTime, scale: 0, transformOrigin: "left" });
                });
        }

        if (flowerGroupRightBottomElement) {
            const paths = flowerGroupRightBottomElement.querySelectorAll('path');

            paths.forEach((path) => {
                const id = "#" +path.id;

                gsap.set(id, { duration: durationTime, scale: 0 });
            });
        }
    },
    alienSetupPathScalesRightMiddle: function () {
        const stemGroupRightMiddleElement = document.getElementById('groupStilkRightMiddle');
        const flowerGroupRightMiddleElement = document.getElementById('groupPathRightMiddleFlower');
  
        if (stemGroupRightMiddleElement) {
            const paths = stemGroupRightMiddleElement.querySelectorAll('path');

                paths.forEach((path) => {
                    const id = "#" + path.id;

                    gsap.set(id, { duration: durationTime, scale: 0, transformOrigin: "left" });
                });
        }

        if (flowerGroupRightMiddleElement) {
            const paths = flowerGroupRightMiddleElement.querySelectorAll('path');

            paths.forEach((path) => {
                const id = "#" +path.id;

                gsap.set(id, { duration: durationTime, scale: 0 });
            });
        }
    },
    alienSetupPathScalesRightTop: function () {
        const stemGroupRightTopElement = document.getElementById('groupStilkRightModeTop');
        const flowerGroupRightTopElement = document.getElementById('groupRightTop3');
  
        if (stemGroupRightTopElement) {
            const paths = stemGroupRightTopElement.querySelectorAll('path');

                paths.forEach((path) => {
                    const id = "#" + path.id;

                    gsap.set(id, { duration: durationTime, scale: 0, transformOrigin: "left" });
                });
        }

        if (flowerGroupRightTopElement) {
            const paths = flowerGroupRightTopElement.querySelectorAll('path');

            paths.forEach((path) => {
                const id = "#" +path.id;

                gsap.set(id, { duration: durationTime, scale: 0 });
            });
        }
    },
    getIdGsapArrTopLeft: function () {
        var idGsapArrTopLeft = this.alienSetupStems2();
        let alienphases = [];
        

        idGsapArrTopLeft.forEach((alien, index) => {
            let idGsapFn = () => {
                idGsapArrTopLeft[index]();
            }
            alienphases.push(idGsapFn);
        });

        return alienphases;
    },
    getIdGsapArrBottomRight: function () {
        var idGsapArrBottomRight = this.alienSetupRightStems1();
        let alienphases = [];
        


        idGsapArrBottomRight.forEach((alien, index) => {
            let idGsapFn = () => {
                idGsapArrBottomRight[index]();
            }
            alienphases.push(idGsapFn);
        });

        return alienphases;
    },
    getIdGsapArrMiddleRight: function () {
        var idGsapArrMiddleRight = this.alienSetupRightStemsMiddle();
        let alienphases = [];
        

        idGsapArrMiddleRight.forEach((alien, index) => {
            let idGsapFn = () => {
                idGsapArrMiddleRight[index]();
            }
            alienphases.push(idGsapFn);
        });

        return alienphases;
    },
    getIdGsapArrTopRight: function () {
        var idGsapArrTopRight = this.alienSetupRightStemsTop();
        let alienphases = [];
        

        idGsapArrTopRight.forEach((alien, index) => {
            let idGsapFn = () => {
                idGsapArrTopRight[index]();
            }
            alienphases.push(idGsapFn);
        });

        return alienphases;
    },
    setupAlienFlower: function () {
        this.phazeIndex = 0;

        this.alienSetupPathScales1();
        this.alienSetupPathScales2();
        this.alienSetupPathScalesRight1();
        this.alienSetupPathScalesRightMiddle();
        this.alienSetupPathScalesRightTop();

        // this.alienSetupAllPathScales();
        this.alienSetupBottomPathScales();
        this.alienSetupRestPathScales();
        

        var phase1 = () => {
            this.alienPhase1();
        }

        var phase2 = () => {
            this.alienPhase2();
        }

        var phase3 = () => {
            this.moveRectangleAndMidFlowerUp();
        }

        let alienPhasesGsapArr = this.getIdGsapArrBottomLeft();
        let alienPhasesGsapArrBottomRight = this.getIdGsapArrBottomRight();
        let alienPhasesGsapArrTopLeft = this.getIdGsapArrTopLeft();
        let alienPhasesGsapArrMiddleRight = this.getIdGsapArrMiddleRight();
        let alienPhasesGsapArrTopRight = this.getIdGsapArrTopRight();

        // let alienPhasesGsapArrAll = this.getIdGsapArrAll();

        let alienPhasesGsapArrBottom = this.getIdGsapArrBottom();
        let alienPhasesGsapArrRest = this.getIdGsapArrRest();
        // let movedMidFlowerUp = this.moveRectangleAndMidFlowerUp();
        
        this.alienphases = [phase1].concat(alienPhasesGsapArrBottom).concat([phase3])
        .concat(alienPhasesGsapArrRest);

        
       /*
        this.alienphases = [phase1,  phase2].concat(alienPhasesGsapArr).concat(alienPhasesGsapArrBottomRight).concat(alienPhasesGsapArrTopLeft).
        concat(alienPhasesGsapArrMiddleRight).concat(alienPhasesGsapArrTopRight);
        */

        this.setButtonText("Fase ");

        // viser under utvikling. skal skjules i produksjon   
        gsap.set(longFlowerstem, { scale: 1.1, transformOrigin: "100% 100%", x: -12,y: 220 });

        // console.log("longFlowerstem", longFlowerstem);

        gsap.set("#path3", { scale: 0, transformOrigin: "50% bottom", x: -1 });
        
        gsap.set(pathLeft1, { scale: 0, scaleX: 0, transformOrigin: "left"});
        gsap.set(leftPath1Flower, { scale: 0, transformOrigin: "100% bottom", x: 3, y: 2 });

        // gsap.set for pathLeft2 og leftPath2Flower
    }
}

var bloomFlowerAnim = new FlowerAnimationTest();
bloomFlowerAnim.setupAlienFlower();

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
