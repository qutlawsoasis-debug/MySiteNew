/**
 * MIRON PORTFOLIO - LIGHT THEME INTERACTIVITY ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.getElementById('customCursor');
  const scrollIndicator = document.getElementById('scrollIndicator');
  const emailBtn = document.getElementById('emailBtn');
  const toast = document.getElementById('toast');
  const accordionRows = document.querySelectorAll('[data-accordion]');

  /* --------------------------------------------------------------------------
   * 1. Custom Green Pointer Cursor (#10B981)
   * -------------------------------------------------------------------------- */
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;

    if (cursor) {
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    }

    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  // Add hover state to interactive elements
  const hoverables = document.querySelectorAll('a, button, .project-row, .hero-scroll-indicator');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor?.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor?.classList.remove('hovered'));
  });

  /* --------------------------------------------------------------------------
   * 2. Intersection Observer (Fade + Slide Up Reveal Animations)
   * -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optionally unobserve after revealing
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  /* --------------------------------------------------------------------------
   * 3. Project Rows Accordion Toggle (Hover / Click)
   * -------------------------------------------------------------------------- */
  accordionRows.forEach(row => {
    // Click toggle
    row.addEventListener('click', (e) => {
      // Don't trigger toggle if user clicked direct external link inside row
      if (e.target.tagName.toLowerCase() === 'a') return;

      const isActive = row.classList.contains('active');

      // Optional: close other rows
      accordionRows.forEach(r => r.classList.remove('active'));

      if (!isActive) {
        row.classList.add('active');
      }
    });
  });

  /* --------------------------------------------------------------------------
   * 4. Scroll Down Indicator Click
   * -------------------------------------------------------------------------- */
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* --------------------------------------------------------------------------
   * 5. Email Copy & Toast Notification
   * -------------------------------------------------------------------------- */
  if (emailBtn) {
    emailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = emailBtn.getAttribute('data-email') || 'miron@builder.dev';

      navigator.clipboard.writeText(email).then(() => {
        showToast('Email скопирован в буфер обмена');
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }
});
