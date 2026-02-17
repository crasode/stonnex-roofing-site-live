document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Request Sent';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = original;
      form.reset();
      alert('Thank you. A Stonnex advisor will contact you shortly to confirm next steps.');
    }, 800);
  });
});

const params = new URLSearchParams(window.location.search);
document.querySelectorAll('[data-utm]').forEach((input) => {
  const key = input.getAttribute('data-utm');
  if (!key) return;
  input.value = params.get(`utm_${key}`) || '';
});

document.querySelectorAll('[data-video-shell]').forEach((shell) => {
  const video = shell.querySelector('video');
  const fallback = shell.querySelector('[data-video-fallback]');
  if (!video || !fallback) return;

  const showFallback = () => {
    fallback.classList.remove('hidden');
  };

  const hideFallback = () => {
    fallback.classList.add('hidden');
  };

  video.addEventListener('loadeddata', hideFallback);
  video.addEventListener('error', showFallback);

  // If browser cannot play MOV well, show fallback immediately.
  const canPlayQuicktime = video.canPlayType('video/quicktime');
  const canPlayMp4 = video.canPlayType('video/mp4');
  if (!canPlayQuicktime && !canPlayMp4) showFallback();
});

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
