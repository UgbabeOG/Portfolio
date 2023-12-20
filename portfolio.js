const $ = (x) => {
    const elements = document.querySelectorAll(x);
    return elements.length === 1 ? elements[0] : elements;
  },
  hamburgerIcon = $("#hamburger-icon"),
  body = $(".body"),
  hamburger = $(".hamburger"),
  navList = $(".nav-list-mobile");

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
navList.addEventListener("click", (event) => {
  if (event.target.closest("#navlinks")) {
    closeSidebar();
  }
});

// intersection observer
const options = { root: null, rootMargin: "0px", threshold: 0 };
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
