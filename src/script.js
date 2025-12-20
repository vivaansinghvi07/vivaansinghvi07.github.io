document.addEventListener("DOMContentLoaded", () => {
  const router = new Navigo('/');
  router
    .on('/', () => {
      document.documentElement.style.setProperty('--bg-solid', 'transparent');
      document.documentElement.style.setProperty('--bg-image', 'repeating-linear-gradient(to bottom right in hsl, var(--bg-col-1), var(--bg-col-2), var(--bg-col-1), var(--bg-col-2), var(--bg-col-1))');
      document.getElementById('background-canvas').style.opacity = '0';
      document.body.style.overflow = 'hidden';
    })
    .on('/portfolio', () => {
      togglePortfolioPage(router, true);
      if (!animationRunning) {
        document.querySelectorAll('.tile').forEach((ele) => {
          ele.style.opacity = '0';
        });
      }
      document.documentElement.style.setProperty('--bg-solid', 'rgb(15, 15, 15)');
      document.documentElement.style.setProperty('--bg-image', 'none');
      document.getElementById('background-canvas').style.opacity = '1';
      document.body.style.overflow = 'auto';
    })
    .resolve();
  loadBackground(router);

  // Intersection Observer for section animations
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