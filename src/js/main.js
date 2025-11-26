"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Queries
  const header = document.querySelector(".js_header");
  const toggleBtn = document.querySelector('.js_toggle');
  const menu = document.querySelector('.js_menu');
  const contactBtn = document.querySelector(".contact-btn");
  const footerContactForm = document.getElementById("footerContactForm");
  const video = document.getElementById("mockupVideo");

  // Fondo del header al hacer scroll
  const scrollThreshold = 50;
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > scrollThreshold) {
        header.classList.add("header--scrolled");
      } else {
        header.classList.remove("header--scrolled");
      }
    });
  }

  // Menú hamburguesa
  if (toggleBtn && menu) {
    toggleBtn.addEventListener('click', () => {
      menu.classList.toggle('is-open');
    });
  }

  // Form footers
  if (contactBtn && footerContactForm) {
    contactBtn.addEventListener("click", () => {
      footerContactForm.classList.toggle("visible");
    });
  }

  // Video TikTok
  if (video) {
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

    observer.observe(video);
  }

  // Función para formularios
  const handleContactForm = (formId, messageId) => {
    const form = document.getElementById(formId);
    const formMessage = document.getElementById(messageId);

    if (!form || !formMessage) return;

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
      const actionUrl = form.getAttribute('action') || 'https://formspree.io/f/mgvldkwg';

      try {
        const response = await fetch(actionUrl, {
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
  };

  handleContactForm('contactPageForm', 'contactPageFormMessage');
  handleContactForm('footerContactForm', 'footerFormMessage');

  // Cookies
  const cookieConsent = document.getElementById('cookieConsent');
  const acceptCookiesBtn = document.getElementById('acceptCookies');
  const rejectCookiesBtn = document.getElementById('rejectCookies');

  if (cookieConsent && acceptCookiesBtn && rejectCookiesBtn) {
    const accepted = localStorage.getItem('cookiesAccepted');

    if (!accepted) {
      cookieConsent.style.display = 'block';
    }

    acceptCookiesBtn.addEventListener('click', function() {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieConsent.style.display = 'none';
    });

    rejectCookiesBtn.addEventListener('click', function() {
      localStorage.setItem('cookiesAccepted', 'false');
      cookieConsent.style.display = 'none';
    });
  }
});
