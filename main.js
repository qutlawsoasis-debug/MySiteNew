/**
 * MIRON PORTFOLIO - HORIZONTAL SCROLL & INTERACTION ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('horizontalTrack');
  const navDots = document.querySelectorAll('.nav-dot');
  const currentNumEl = document.getElementById('currentNum');
  const progressFillEl = document.getElementById('progressFill');
  const heroScrollHint = document.getElementById('heroScrollHint');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toast');

  const totalSections = 4;
  let currentIndex = 0;
  let isScrolling = false;

  /**
   * Navigate to a specific section index (0 to 3)
   */
  function goToSection(index) {
    if (index < 0) index = 0;
    if (index >= totalSections) index = totalSections - 1;

    currentIndex = index;

    // Translate horizontal track
    const offsetPercentage = -currentIndex * 100;
    track.style.transform = `translateX(${offsetPercentage}vw)`;

    // Update Nav Dots
    navDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });

    // Update Counter (e.g. 01, 02)
    const formattedNum = String(currentIndex + 1).padStart(2, '0');
    currentNumEl.textContent = formattedNum;

    // Update Progress Bar Width
    const progressPercent = ((currentIndex + 1) / totalSections) * 100;
    progressFillEl.style.width = `${progressPercent}%`;
  }

  /**
   * Handle Mouse Wheel Horizontal Conversion
   */
  function handleWheel(e) {
    // Prevent default page scroll
    e.preventDefault();

    if (isScrolling) return;

    // Determine direction based on deltaY or deltaX
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;

    if (delta > 30) {
      // Scroll Right
      if (currentIndex < totalSections - 1) {
        isScrolling = true;
        goToSection(currentIndex + 1);
        setTimeout(() => { isScrolling = false; }, 800);
      }
    } else if (delta < -30) {
      // Scroll Left
      if (currentIndex > 0) {
        isScrolling = true;
        goToSection(currentIndex - 1);
        setTimeout(() => { isScrolling = false; }, 800);
      }
    }
  }

  // Attach wheel listener to horizontal viewport
  const viewport = document.getElementById('horizontalViewport');
  viewport.addEventListener('wheel', handleWheel, { passive: false });

  /**
   * Handle Keyboard Navigation
   */
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      goToSection(currentIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      goToSection(currentIndex - 1);
    } else if (e.key === 'Home') {
      goToSection(0);
    } else if (e.key === 'End') {
      goToSection(totalSections - 1);
    }
  });

  /**
   * Handle Navigation Dots Click
   */
  navDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
      goToSection(idx);
    });
  });

  /**
   * Hero Scroll Hint Click
   */
  if (heroScrollHint) {
    heroScrollHint.addEventListener('click', () => {
      goToSection(1);
    });
  }

  /**
   * Touch / Swipe Gesture Engine
   */
  let touchStartX = 0;
  let touchEndX = 0;

  viewport.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  viewport.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeDistance = touchStartX - touchEndX;
    if (swipeDistance > 50) {
      // Swiped Left -> Move to Next Section
      goToSection(currentIndex + 1);
    } else if (swipeDistance < -50) {
      // Swiped Right -> Move to Previous Section
      goToSection(currentIndex - 1);
    }
  }

  /**
   * Email Copy to Clipboard
   */
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'miron@builder.dev';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email скопирован в буфер обмена');
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  // Initialize section 0
  goToSection(0);
});
