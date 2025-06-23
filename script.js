/**
 * CodeCraft: Script refactorizado para Corvaglia AI
 *
 * Funcionalidades:
 * 1. Manejo del menú de navegación móvil (hamburguesa).
 * 2. Desplazamiento suave (smooth scroll) para los enlaces ancla.
 * 3. Validación básica del formulario de contacto.
 */

// --- 1. MANEJO DEL MENÚ MÓVIL ---
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    // Para mostrar/ocultar el menú, cambiaremos su estilo de display
    const isVisible = navMenu.style.display === 'flex';
    navMenu.style.display = isVisible ? 'none' : 'flex';
    
    // Cambiamos el estilo de la navegación para que sea vertical en móvil
    navMenu.style.flexDirection = 'column';
    navMenu.style.position = 'absolute';
    navMenu.style.top = '60px'; // Ajusta según la altura de tu header
    navMenu.style.right = '5%';
    navMenu.style.backgroundColor = 'white';
    navMenu.style.padding = '1rem';
    navMenu.style.borderRadius = 'var(--border-radius)';
    navMenu.style.boxShadow = 'var(--box-shadow)';
  });
}

// --- 2. SMOOTH SCROLL ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del ancla

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth', // La magia del desplazamiento suave
        block: 'start'
      });
    }
  });
});

// --- 3. VALIDACIÓN DEL FORMULARIO DE CONTACTO ---
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevenimos el envío real para este ejemplo

    // Obtenemos los valores de los campos
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validación simple
    if (name === '' || email === '' || message === '') {
      alert('Por favor, completa todos los campos del formulario.');
      return; // Detiene la ejecución si hay un error
    }

    // Si todo está bien, mostramos un mensaje de éxito
    alert(`Gracias por tu mensaje, ${name}. Te contactaremos pronto.`);
    
    // Aquí iría la lógica para enviar el formulario a un servidor (backend)
    // Por ahora, simplemente lo reseteamos
    contactForm.reset();
  });
}
