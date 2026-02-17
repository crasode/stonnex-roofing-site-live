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

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
