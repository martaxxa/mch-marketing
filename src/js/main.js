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
