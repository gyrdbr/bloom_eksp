
const xCoord = 500;
const yCoord = 500;

const element = document.querySelector("section");

const options = {
  top: yCoord,
  left: xCoord,
  behavior: "smooth",
};

scrollTo(xCoord, yCoord)
scrollTo(options)

element.scrollTo(0, 1000);

element.scrollTo({
  top: yCoord,
  left: xCoord,
  behavior: "smooth",
});

const scrollToBtn = document.querySelector(".scroll-to");
const toolbar = document.querySelector("div");
const section = document.querySelector("section");

function isInterrupted(interrupted) {
  console.log(`Scroll finished;${interrupted ? " " : " not "}interrupted`);
  if (interrupted) {
    alert("Scroll interrupted!");
  }
}

scrollToBtn.addEventListener("click", async () => {
  toolbar.className = "fade-out";
  const result = await section.scrollTo(0, 0);
  isInterrupted(result.interrupted);
  toolbar.className = "fade-in";
});

function supportsScrollPromises() {
  const test = section.scroll(0, 0);
  return test instanceof Promise;
}