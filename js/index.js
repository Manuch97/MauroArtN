(() => {
  const contentEl         = document.getElementById('main-content');
  const links             = document.querySelectorAll('[data-page]');
  const wrapper           = document.getElementById('wrapper');
  const fullscreenOverlay = document.getElementById('fullscreen-overlay');
  const fullscreenImg     = document.getElementById('fullscreen-image');

  // Map page IDs to their image arrays
  const galleries = {
    poetica: [
      'uploads/opere/1.jpg',
      'uploads/opere/2.jpg',
      'uploads/opere/3.jpg',
      'uploads/opere/4.jpg',
      'uploads/opere/5.jpg'
    ],
    lab: [
      'uploads/labyrinthus/1.jpg',
      'uploads/labyrinthus/2.jpg',
      'uploads/labyrinthus/3.jpg',
      'uploads/labyrinthus/4.jpg',
      'uploads/labyrinthus/5.jpg'
    ],
    cats: [
      'uploads/eudaimonia/1.png'
    ]
  };

  // Sidebar toggle
  document.getElementById('sidebarToggle')
    .addEventListener('click', () => {
      wrapper.classList.toggle('toggled');
      const rightLogo = document.getElementById("rightLogoContainer");
      rightLogo.classList.toggle("hidden");
      rightLogo.classList.toggle("fading-in");

      const isCollapsed = wrapper.classList.contains('toggled');
      document.getElementById('sidebarToggleText').textContent = isCollapsed ? 'Mostra' : 'Nascondi';
    });

  // Navigation links
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      loadPage(link.dataset.page);
    });
  });

  function loadPage(page) {
    // 1) Clear out old content & fullscreen
    contentEl.innerHTML = '';
    fullscreenOverlay.classList.add('d-none');

    // 2) Stamp in the new template
    const tmpl  = document.getElementById(`${page}-template`);
    const clone = tmpl.content.cloneNode(true);
    contentEl.appendChild(clone);

    const contentDiv = contentEl.querySelector('.content');

    // 3) Setup the “Proceed” button
    const btn = contentEl.querySelector('#proceed-btn');
    if (!btn) return;

    if (galleries[page]) {
      // If this page has a gallery defined, hook initGallery with its images
      btn.addEventListener('click', () => {
        if (contentDiv) contentDiv.classList.add('collapsed');
        btn.classList.add('d-none');
        initGallery(page);
      });
    } else {
      // Otherwise just a generic proceed
      btn.addEventListener('click', () => console.log(`Proceed ${page}`));
    }
  }

  function initGallery(page) {
    const placeholder = contentEl.querySelector('#carousel-placeholder');
    if (!placeholder) return;

    // 1) Destroy any old carousel
    placeholder.innerHTML = '';

    // 2) Clone fresh carousel skeleton
    const carouselTmpl   = document.getElementById('carousel-template');
    const carouselClone  = document.importNode(carouselTmpl.content, true);
    const wrapperDiv     = carouselClone.querySelector('.carousel-wrapper');
    const innerContainer = carouselClone.querySelector('.carousel-inner');

    // 3) Populate slides
    galleries[page].forEach((src, i) => {
      const item = document.createElement('div');
      item.classList.add('carousel-item');
      if (i === 0) item.classList.add('active');

      const img = document.createElement('img');
      img.src = src;
      img.className = 'square-img';
      item.appendChild(img);
      innerContainer.appendChild(item);

      // fullscreen on click
      img.addEventListener('click', () => {
        fullscreenImg.src = src;
        fullscreenOverlay.classList.remove('d-none');
      });
    });

    // 4) Insert & show it
    placeholder.appendChild(carouselClone);
    wrapperDiv.classList.remove('d-none');
  }

  // Close fullscreen on overlay click
  fullscreenOverlay.addEventListener('click',
    () => fullscreenOverlay.classList.add('d-none')
  );

  // Load the initial page
  loadPage('bio');
})();
