

// scroll(xCoord, yCoord)
//scroll(options)

// window.scrollBy(100, 100);

window.scroll(100, 500);

window.scroll({
  top: 500,       // yCoord
  left: 100,      // xCoord
  behavior: 'smooth'
});

const scrollBtn = document.querySelector(".scroll");
const toolbar = document.querySelector("div");


// Put the 100th vertical pixel at the top of the window
window.scroll(0, 100);

window.scroll({
  top: 100,
  left: 100,
  behavior: "smooth",
});

function isInterrupted(interrupted) {
  console.log(`Scroll finished;${interrupted ? " " : " not "}interrupted`);
  if (interrupted) {
    alert("Scroll interrupted!");
  }
}

scrollBtn.addEventListener("click", async () => {
  toolbar.className = "fade-out";
  const result = await window.scroll(0, 1000);
    isInterrupted(result.interrupted);
  toolbar.className = "fade-in";
});

function supportsScrollPromises() {
  const test = window.scroll(0, 0);
  return test instanceof Promise;
}

