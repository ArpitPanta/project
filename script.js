const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");
const menuClose = document.querySelector(".menu-close");
const desktopMenu = window.matchMedia("(min-width: 901px)");
let menuIsOpen = desktopMenu.matches;

function setMenu(open) {
  if (!sidebar || !menuToggle) return;

  menuIsOpen = open;
  sidebar.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.classList.toggle("menu-open", open && !desktopMenu.matches);
  document.body.classList.toggle(
    "menu-collapsed",
    !open && desktopMenu.matches,
  );
}

desktopMenu.addEventListener("change", () => {
  setMenu(desktopMenu.matches);
});

setMenu(menuIsOpen);
menuToggle?.addEventListener("click", () => setMenu(!menuIsOpen));

menuClose?.addEventListener("click", () => setMenu(false));

sidebar?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
    closeVideo();
  }
});

const modal = document.querySelector(".video-modal");
const videoFrame = document.querySelector(".video-frame");

function openVideo() {
  if (!modal || !videoFrame) return;

  modal.hidden = false;
  document.body.classList.add("modal-open");
  videoFrame.innerHTML = `
    <iframe
      src="https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1&rel=0"
      title="A Forma Studio film"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowfullscreen
    ></iframe>`;
  modal.querySelector(".modal-close")?.focus();
}

function closeVideo() {
  if (!modal || modal.hidden) return;

  modal.hidden = true;
  videoFrame.innerHTML = "";
  document.body.classList.remove("modal-open");
}

document.querySelector("[data-video-open]")?.addEventListener("click", openVideo);
modal?.querySelector(".modal-close")?.addEventListener("click", closeVideo);
modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeVideo();
});

document.querySelector(".contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const subject = encodeURIComponent(
    `Forma Studio enquiry: ${data.get("topic")}`,
  );
  const body = encodeURIComponent(
    `From: ${data.get("name")} (${data.get("email")})\n\n${data.get("message")}`,
  );
  const status = form.querySelector(".form-status");

  if (status) {
    status.textContent = "Your email app is opening with your note ready to send.";
  }

  window.location.href = `mailto:hello@formastudio.design?subject=${subject}&body=${body}`;
});
