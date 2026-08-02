const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 30); });

const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => { navLinks.classList.toggle('open'); });
navLinks.querySelectorAll('a').forEach(a => { a.addEventListener('click', () => navLinks.classList.remove('open')); });

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href.length > 1) { const el = document.querySelector(href); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const portrait = document.getElementById('portrait');
if (portrait && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('mousemove', (e) => {
    const rect = portrait.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    portrait.style.transform = `perspective(800px) rotateY(${dx * 14}deg) rotateX(${-dy * 14}deg)`;
  });
}

const discordBtn = document.getElementById('discordBtn');
const discordLabel = document.getElementById('discordLabel');
const discordIcon = document.getElementById('discordIcon');
let copiedTimer;
discordBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('guscraftvideo');
    discordBtn.classList.add('copied');
    discordLabel.textContent = 'Copied!';
    discordIcon.innerHTML = '<polyline points="20 6 9 17 4 12"/>';
    clearTimeout(copiedTimer);
    copiedTimer = setTimeout(() => {
      discordBtn.classList.remove('copied');
      discordLabel.textContent = 'Discord: guscraftvideo';
      discordIcon.innerHTML = '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>';
    }, 2000);
  } catch (err) {}
});
