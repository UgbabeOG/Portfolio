const $ = (x) => {
    const elements = document.querySelectorAll(x);
    return elements.length === 1 ? elements[0] : elements;
  },
  hamburgerIcon = $("#hamburger-icon"),
  body = $(".body"),
  hamburger = $(".hamburger"),
  navList = $(".mobileNav");

hamburger.addEventListener("click", () => {
  isVisible = navList.dataset.visible === "true";
  navList.dataset.visible = !isVisible;
  hamburger.classList.add("opacity");
  hamburger.setAttribute("aria-expanded", !isVisible);
  body.classList.toggle("no-scroll");
  navList.style.transform = isVisible ? "translateX(100%)" : "translateX(0%)";
});
const closeSidebar = () => {
  navList.dataset.visible = false;
  hamburger.setAttribute("aria-expanded", false);
  hamburger.classList.remove("opacity");
  navList.style.transform = "translateX(100%)";
  body.classList.remove("no-scroll");
};
navList.addEventListener("click", (e) => {
  if (e.target.closest(".navlinks")) {
    closeSidebar();
  }
});
// carousel for tools
const toolsDiv = $(".tools"),
  tools = $(".tool"),
  toolsLength = tools.length;
let currentTool = 0;

function slideTools(direction = "forward") {
  const previousAside = currentTool;
  currentTool =
    direction === "forward"
      ? (currentTool + 1) % toolsLength
      : (currentTool - 1 + toolsLength) % toolsLength;

  tools[previousAside].classList.remove("active");

  tools[currentTool].classList.add("active");
}

// Set up an interval to automatically rotate the asides
setInterval(() => slideTools(), 2000);

// Add buttons for user control (optional)
const prevButton = $("#prevbtn"),
  nextButton = $("#nxtbtn");

prevButton.addEventListener("click", () => slideTools("backward"));
nextButton.addEventListener("click", () => slideTools());

// intersection observer
const options = { root: null, rootMargin: "24px", threshold: 0 };
const pageEffect = (element) => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let target = entry.target;
        target.classList.add("slideUp");
        observer.disconnect();
      }
    });
  }, options);
  io.observe(element);
};
const sections = $(".obs");
sections.forEach((section) => pageEffect(section));
