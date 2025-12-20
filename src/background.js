/*
 * This code is taken from Hyperplexed video https://www.youtube.com/watch?v=bAwEj_mSzOs
 */
let isPortfolioPageActive = false;
let animationRunning = false;

function togglePortfolioPage(router, on) {
  if (on !== undefined && on === isPortfolioPageActive) {
    return;
  }
  isPortfolioPageActive = !isPortfolioPageActive;
  ['.main-page-intro', '.main-page-portfolio'].map((x, index) => {
    isPortfolioPageActive == index ? show(x) : hide(x);
  });
  router.navigate(isPortfolioPageActive ? '/portfolio' : '/');
}

function loadBackground(router) {

  const container = document.body;
  const wrapper = document.querySelector("#tiles");

  let columns = 0, rows = 0;

  function handleOnClick(index) {
    if (isPortfolioPageActive) return; // Prevent toggling back
    animationRunning = true;
    togglePortfolioPage(router);
    if (isPortfolioPageActive) {
      document.documentElement.style.setProperty('--bg-solid', 'rgb(15, 15, 15)');
      document.documentElement.style.setProperty('--bg-image', 'none');
      document.getElementById('background-canvas').style.opacity = '1';
      // Calculate click position
      const col = index % columns;
      const row = Math.floor(index / columns);
      const tileWidth = container.clientWidth / columns;
      const tileHeight = container.clientHeight / rows;
      const x = col * tileWidth + tileWidth / 2;
      const y = row * tileHeight + tileHeight / 2;
      window.rippleParticles(x, y);
    } else {
      document.documentElement.style.setProperty('--bg-solid', 'transparent');
      document.documentElement.style.setProperty('--bg-image', 'repeating-linear-gradient(to bottom right in hsl, var(--bg-col-1), var(--bg-col-2), var(--bg-col-1), var(--bg-col-2), var(--bg-col-1))');
      document.getElementById('background-canvas').style.opacity = '0';
    }
    anime({
      targets: ".tile",
      opacity: isPortfolioPageActive ? 0 : 1,
      delay: anime.stagger(50, {
        grid: [columns, rows],
        from: index
      }),
      complete: () => { animationRunning = false; }
    });
  }

  function createTile(index) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.style.opacity = isPortfolioPageActive ? 0 : 1;
    tile.onclick = _ => handleOnClick(index);
    return tile;
  }

  function createTiles(quantity) {
    Array.from(Array(quantity)).map((_, index) => {
      wrapper.appendChild(createTile(index));
    });
  }

  function createGrid() {
    wrapper.innerHTML = "";
    
    const size = 60;
    
    columns = Math.floor(container.clientWidth / size);
    rows = Math.floor(container.clientHeight / size);
    
    wrapper.style.setProperty("--columns", columns);
    wrapper.style.setProperty("--rows", rows);
    
    createTiles(columns * rows);
  }

  createGrid();
  window.onresize = createGrid;
}
