(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const params = new URLSearchParams(window.location.search);
  document.querySelectorAll('[data-utm]').forEach((input) => {
    const key = input.getAttribute('data-utm');
    if (!key) return;
    input.value = params.get(`utm_${key}`) || '';
  });

  document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const label = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Submitted';
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = label;
        form.reset();
        window.alert('Thank you. A Stonnex advisor will contact you shortly.');
      }, 750);
    });
  });

  document.querySelectorAll('.ba-slider').forEach((slider) => {
    const range = slider.querySelector('input[type="range"]');
    const afterWrap = slider.querySelector('.after-wrap');
    const divider = slider.querySelector('.divider');
    if (!range || !afterWrap || !divider) return;

    const update = (val) => {
      afterWrap.style.width = `${val}%`;
      divider.style.left = `${val}%`;
    };

    update(range.value || 50);
    range.addEventListener('input', () => update(range.value));
  });

  const filterButtons = document.querySelectorAll('[data-filter-btn]');
  const projectCards = document.querySelectorAll('[data-project-cat]');
  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-filter-btn');
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        projectCards.forEach((card) => {
          const cat = card.getAttribute('data-project-cat');
          card.style.display = target === 'all' || target === cat ? '' : 'none';
        });
      });
    });
  }

  document.querySelectorAll('[data-video-shell]').forEach((shell) => {
    const video = shell.querySelector('video');
    const fallback = shell.querySelector('[data-video-fallback]');
    if (!video || !fallback) return;

    const showFallback = () => fallback.classList.remove('hidden');
    const hideFallback = () => fallback.classList.add('hidden');

    video.addEventListener('loadeddata', hideFallback);
    video.addEventListener('canplay', hideFallback);
    video.addEventListener('error', showFallback);

    const canQuickTime = video.canPlayType('video/quicktime');
    const canMp4 = video.canPlayType('video/mp4');
    if (!canQuickTime && !canMp4) showFallback();
  });

  const overlay = document.getElementById('exitPopup');
  const closeBtn = document.getElementById('popupClose');
  if (overlay && closeBtn) {
    const popupKey = 'stonnex_exit_popup_seen';
    let shown = localStorage.getItem(popupKey) === '1';

    const open = () => {
      if (shown) return;
      shown = true;
      localStorage.setItem(popupKey, '1');
      overlay.classList.add('active');
    };

    const close = () => overlay.classList.remove('active');

    document.addEventListener('mouseleave', (e) => {
      if (e.clientY <= 8) open();
    });

    setTimeout(() => {
      if (!shown && window.innerWidth < 900) open();
    }, 12000);

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
  }
})();
