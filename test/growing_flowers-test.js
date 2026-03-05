// Rock scissors paper functional test

buster.testCase("FlowerAnimation", {

    setUp: function () {

        /*
        this.randomList = createUniqueRandomNumberList(7,24);
        this.allDinnersConfig = new allDinnerConfig();
        this.allDinners = this.allDinnersConfig.middagsListe;
        this.probList = this.allDinnersConfig.genProbDistrList(this.allDinners);
        this.dinnerList = createUniqueDinnerList(7, this.probList, []);
        this.fishList = this.allDinnersConfig.fishList;

        this.configuredDinnerList = buildDinnerList({
            atLocal: true,
            fishAmount: 2,
            childFriendly: 4,
            easy: 3,
            medium: 3,
            difficult: 1
        });
        */

        
        this.bloomFlowerAnim = new FlowerAnimationTest();
        this.bloomFlowerAnim.setupAlienFlower();
    },

    "dinnerList has length 7": function () {

        assert.equals(7, this.dinnerList.length);
    },

    "configured dinnerList has length atleast 6": function () {

        console.log(this.configuredDinnerList);
        assert.greater(this.configuredDinnerList.length, 6);
    },

    "no elements of dinner list is undefined": function () {

        for(var i = 0; i < this.dinnerList.length; i++) {
            refute(typeof this.dinnerList[i] === 'undefined');
        }
    },

    "all elements of fish list are fish": function () {

          for(var i = 0; i < this.fishList.length; i++) {
            assert(this.fishList[i].liste.containsFish);
        }
    },

    "randomList has length 7": function () {

        assert.equals(7, this.randomList.length);
    },

    "all liste elems of dinner list are dinner objects": function () {

        for(var i = 0; i < this.allDinners.length; i++) {
            assert(typeof this.allDinners[i].liste === 'object');
        }
    },

    "all liste elems of configured dinner list are defined": function () {

        for(var i = 0; i < this.configuredDinnerList.length; i++) {
            refute(typeof this.configuredDinnerList[i] === 'undefined');
        }
    },


    "allDinnersConfig[0]s is a dinner obj named tacos": function () {
        var tacos = new middagsObj("tacos", false, true, true, false, false, true, true, 4, 4);

        assert.equals(tacos, this.allDinners[0].liste);
    },

    "problist is longer than dinnerlist": function () {
        assert.greater(this.probList.length, this.allDinners.length);
    }
});
