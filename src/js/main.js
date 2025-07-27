"use strict";

//Queries
const header = document.querySelector(".js_header");
const toggleBtn = document.querySelector('.js_toggle');
const menu = document.querySelector('.js_menu');
const contactBtn = document.querySelector(".contact-btn");
const contactForm = document.getElementById("contactForm");
const video = document.getElementById("mockupVideo");

//Fondo del header al hacer scroll
const scrollThreshold = 50;
window.addEventListener("scroll", () => {
  if (window.scrollY > scrollThreshold) {
    header.classList.add("header--scrolled");
  } else {
    header.classList.remove("header--scrolled");
  }
});

//Menú hamburguesa
toggleBtn.addEventListener('click', () => {
  menu.classList.toggle('is-open');
});

//Form footers
document.addEventListener("DOMContentLoaded", () => {
  contactBtn.addEventListener("click", () => {
    const isVisible = contactForm.classList.contains("visible");
    if (isVisible) {
      contactForm.classList.remove("visible");
    } else {
      contactForm.classList.add("visible");
    }
  });
});

//Video TikTok
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.play().catch((e) =>
            console.warn("No se pudo reproducir el video:", e)
          );
        }
      });
    },
    { threshold: 0.5 }
  );

  if (video) {
    observer.observe(video);
  }
});
