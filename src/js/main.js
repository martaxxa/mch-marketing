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

//Mensaje de formulario de contacto
const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  form.addEventListener('submit', async function(e) {
    e.preventDefault(); // Evita que se recargue la página

    // Validación básica de required
    if (!form.checkValidity()) {
      formMessage.style.display = 'block';
      formMessage.style.color = 'red';
      formMessage.textContent = 'Por favor, rellena los campos obligatorios.';
      return;
    }

    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mgvldkwg', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      if (response.ok) {
        formMessage.style.display = 'block';
        formMessage.style.color = '#f8ad19';
        formMessage.textContent = '¡Mensaje enviado con éxito!';
        form.reset();
      } else {
        formMessage.style.display = 'block';
        formMessage.style.color = 'red';
        formMessage.textContent = 'Hubo un error al enviar el mensaje. Inténtalo de nuevo.';
      }
    } catch (error) {
      formMessage.style.display = 'block';
      formMessage.style.color = 'red';
      formMessage.textContent = 'Hubo un error al enviar el mensaje. Inténtalo de nuevo.';
    }
  });