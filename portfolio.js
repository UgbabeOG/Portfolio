const _$ = (x) => document.querySelector(x),
  $$ = (x) => document.querySelectorAll(x),
  hamburgerIcon = _$("#hamburger-icon"),
  body = _$(".body"),
  hamburger = _$(".hamburger"),
  navLinks = $$("#navlinks"),
  navList = _$(".nav-list-mobile"),
  isVisible = navList.dataset.visible === "true";

hamburger.addEventListener("click", () => {
  navList.dataset.visible = !isVisible;
  hamburger.setAttribute("aria-expanded", !isVisible);
  body.classList.toggle("no-scroll");
  hamburgerIcon.classList.replace(
    isVisible ? "fa-x" : "fa-bars",
    isVisible ? "fa-bars" : "fa-x"
  );

  navList.style.transform = isVisible ? "translateX(100%)" : "translateX(0%)";
});
const closeSidebar = () => {
  navList.dataset.visible = !isVisible;
  hamburger.setAttribute("aria-expanded", !isVisible);
  navList.style.transform = "translateX(100%)";
  body.classList.remove("no-scroll");
}; //fix this code asap
navLinks.forEach((link) => {
  link.addEventListener("click", () => closeSidebar())//edit the function check if navList is display flex direction column;
});

// intersection observer
const options = { root: null, rootMargin: "0px", threshold: 0 };
const pageEffect = (element) => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let target = entry.target;

        target.classList.add("slideUp");
        // observer.disconnect();
      }
    });
  }, options);
  io.observe(element);
};
let sections = $$(".obs");
// console.log(sections);
sections.forEach((section) => pageEffect(section));
