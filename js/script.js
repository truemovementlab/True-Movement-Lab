\
(function () {
  const btn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  if (btn && nav) {
    btn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });
    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("open")) return;
      if (nav.contains(e.target) || btn.contains(e.target)) return;
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) en.target.classList.add("visible");
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));

  // Testimonials slider (if present)
  const slider = document.querySelector("[data-slider]");
  if (slider) {
    const track = slider.querySelector("[data-track]");
    const slides = slider.querySelectorAll("[data-slide]");
    const prev = slider.querySelector("[data-prev]");
    const next = slider.querySelector("[data-next]");
    let idx = 0;

    function update() {
      track.style.transform = `translateX(${-idx * 100}%)`;
    }
    function go(delta) {
      idx = (idx + delta + slides.length) % slides.length;
      update();
    }
    if (prev) prev.addEventListener("click", () => go(-1));
    if (next) next.addEventListener("click", () => go(1));

    let t = setInterval(() => go(1), 7000);
    slider.addEventListener("mouseenter", () => clearInterval(t));
    slider.addEventListener("mouseleave", () => t = setInterval(() => go(1), 7000));
  }

  // Questionnaire: require at least one activity checkbox
  const form = document.querySelector("form.form");
  const checksWrap = document.getElementById("activityChecks");
  const activityRequired = document.getElementById("activityRequired");
  if (form && checksWrap && activityRequired) {
    const hasChecked = () => !!checksWrap.querySelector('input[type="checkbox"]:checked');
    form.addEventListener("submit", (e) => {
      if (!hasChecked()) {
        e.preventDefault();
        activityRequired.setCustomValidity("Please select at least one activity.");
        activityRequired.reportValidity();
        activityRequired.setCustomValidity("");
      }
    });
  }
})();
