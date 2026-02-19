class Tulip {
  constructor(id, transformOrigin) {
      this.id = id;
      this.transformOrigin = transformOrigin;
  }
}

let leftTulip1 = new Tulip("#left_tulip1", "50% top");
let leftTulip2 = new Tulip("#left_tulip2", "80% 10%");
let leftTulip3 = new Tulip("#left_tulip3", "80% 10%");

let rightTulip1 = new Tulip("#right_tulip1", "0 0");
let rightTulip2 = new Tulip("#right_tulip2", "20% top");
let rightTulip3 = new Tulip("#right_tulip3", "40% 5%");
let rightTulip4 = new Tulip("#right_tulip4", "20% top");

var stems = ['#leftstem1', '#rightstem2', '#leftstem2', '#rightstem3', '#leftstem3'];
var tulips = [leftTulip1, rightTulip2, leftTulip2, rightTulip3, leftTulip3, rightTulip4];
var delay = 0;
var longstem = "#long_stem";

function sway(elem, transformOrigin, leftRotation, rightRotation) {
  gsap.fromTo(
      elem,
      { rotation: -Math.ceil(Math.random() * leftRotation) },
      {
          duration: 2,
          rotation: Math.ceil(Math.random() * rightRotation),
          yoyo: true,
          repeat: -1,
          transformOrigin: transformOrigin,
          ease: "sine.inOut"
      }
  );
}

function swayAll() {
  sway("#whole_flower", "center bottom", 5, 1);
  sway("#right_tulip1", "center top", 5, 5)
  tulips.forEach(tulip => {
      sway(tulip.id, "center top", 5, 5)
  })
}

function drawLeafs() {
  gsap.fromTo('#rightstem1',
      {
          drawSVG: "0% 0%"
      },
      {
          duration: 1,
          delay: 0.5,
          ease: "linear",
          drawSVG: "0% 100%",
          onComplete: () => {
              gsap.to('#right_tulip1', { scale: 1, duration: 1, delay: delay, ease: "SlowMo" })
          }
      });
  stems.forEach((stem, index) => {
      gsap.fromTo(stem,
          {
              drawSVG: "0% 0%"
          },
          {
              duration: 1,
              delay: (index + 2) * 0.4,
              ease: "linear",
              drawSVG: "0% 100%",
              onComplete: () => {
                  gsap.to(tulips[index].id, { scale: 1, duration: 1, delay: delay, ease: "SlowMo" })
              }
          });
  })
}

function initTulips() {
  gsap.set('#right_tulip1', { scale: 0 });
  tulips.forEach(tulip => {
      gsap.set(tulip.id, { scale: 0, transformOrigin: tulip.transformOrigin });
  });
}

gsap.set('#whole_flower', { scale: 1, transformOrigin: "40% bottom", y: 10 });
initTulips();

gsap.fromTo(longstem,
  {
      drawSVG: "0% 0%"
  },
  {
      duration: 3,
      ease: "linear",
      drawSVG: "0% 100%",
      onComplete: () => {
          gsap.to('#right_tulip4', 
            {scale: 1, duration: 1, delay: delay, ease: "SlowMo"
    }
    )
      }
  });

drawLeafs();