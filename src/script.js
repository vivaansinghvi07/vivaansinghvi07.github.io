document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.style.setProperty('--bg-solid', 'transparent');
  document.documentElement.style.setProperty('--bg-image', 'repeating-linear-gradient(to bottom right in hsl, var(--bg-col-1), var(--bg-col-2), var(--bg-col-1), var(--bg-col-2), var(--bg-col-1))');
  document.getElementById('background-canvas').style.opacity = '0';
  document.body.style.overflow = 'hidden';

  loadBackground();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.portfolio-content section').forEach(section => {
    observer.observe(section);
  });
});
