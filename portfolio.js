const _$ = (x) => document.querySelector(x),
  $$ = (x) => document.querySelectorAll(x);

const hamburger = _$(".hamburger");
const hamburgerIcon = _$("#hamburger-icon");
const asideMenu = _$(".side-menu"),
  nav = _$(".nav-list"),
  body = _$(".body");
hamburger.addEventListener("click", () => {
 
  const visibility = nav.getAttribute("data-visible");
  if (visibility === "false") {
    nav.setAttribute("data-visible", true);
    hamburger.setAttribute("aria-expanded", true);
    body.classList.remove("no-scroll");
  } else {
    nav.setAttribute("data-visible", false);
    hamburger.setAttribute("aria-expanded", false);
    body.classList.add("no-scroll");
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
        // observer.disconnect();
      }
    });
  }, options);
  io.observe(element);
};
let sections = $$(".obs");
// console.log(sections);
sections.forEach((section) => pageEffect(section));
