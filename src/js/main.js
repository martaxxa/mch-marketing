"use strict";

//Query
const header = document.querySelector(".js_header");

//Fondo del header al hacer scroll
const scrollThreshold = 50;

window.addEventListener("scroll", () => {
  if (window.scrollY > scrollThreshold) {
    header.classList.add("header--scrolled");
  } else {
    header.classList.remove("header--scrolled");
  }
});

//Form footers
document.addEventListener("DOMContentLoaded", () => {
  const contactBtn = document.querySelector(".contact-btn");
  const contactForm = document.getElementById("contactForm");

  contactBtn.addEventListener("click", () => {
    const isVisible = contactForm.classList.contains("visible");
    if (isVisible) {
      contactForm.classList.remove("visible");
    } else {
      contactForm.classList.add("visible");
    }
  });
});
