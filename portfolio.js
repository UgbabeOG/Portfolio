const $ = (x) => {
    const elements = document.querySelectorAll(x);
    return elements.length === 1 ? elements[0] : elements;
  },
  hamburgerIcon = $("#hamburger-icon"),
  body = $(".body"),
  hamburger = $(".hamburger"),
  navList = $(".mobileNav"),
  aboutImageEffect = document.querySelectorAll(".author-image"),
  aboutTextEffect = document.querySelectorAll(".about-text"),
  sections = $(".pageEffect"),
  toolCards = $(".tool-card");

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
const toolsBox = $(".toolsBox"),
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
setInterval(() => slideTools(), 3500);
toolCards.forEach((card, index) => {
  toolsBox.appendChild(card.cloneNode(true));
  card.style.animationDelay = `${index * 1.5}s`; // Adjust delay for staggered animation
});

// intersection observer
const applyEffectOnIntersection = (elements, effectClass) => {
  const options = { root: null, rootMargin: "10px", threshold: 0 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        target.classList.add(effectClass);
        observer.unobserve(target);
      }
    });
  }, options);

  elements.forEach((element) => {
    observer.observe(element);
  });
}; // Applying effects
applyEffectOnIntersection(aboutImageEffect, "bounce-in-left");
applyEffectOnIntersection(aboutTextEffect, "focus-in-contract-bck");
applyEffectOnIntersection(sections, "slideUp");
