// ============================================
// EVEY'S BACH WEEKEND — MAIN JS
// Custom cursor, sparkles, and interactivity
// ============================================

// ---- CUSTOM CURSOR ----
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
const sparkleContainer = document.getElementById('sparkles');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
  maybeSparkle(e);
});

// Smooth trail
function animateTrail() {
  trailX += (mouseX - trailX) * 0.15;
  trailY += (mouseY - trailY) * 0.15;
  if (trail) {
    trail.style.left = trailX + 'px';
    trail.style.top = trailY + 'px';
  }
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Cursor hover effects
document.querySelectorAll('a, button, .nav-card, .movie-card, .packing-item, .guest-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor) { cursor.style.width = '30px'; cursor.style.height = '30px'; }
    if (trail) { trail.style.width = '50px'; trail.style.height = '50px'; }
  });
  el.addEventListener('mouseleave', () => {
    if (cursor) { cursor.style.width = '20px'; cursor.style.height = '20px'; }
    if (trail) { trail.style.width = '36px'; trail.style.height = '36px'; }
  });
});

// ---- SPARKLES ON MOVE ----
const sparkleChars = ['✦', '✧', '♡', '⋆', '★', '✿', '◇', '❀'];
let lastSparkle = 0;

function maybeSparkle(e) {
  const now = Date.now();
  if (now - lastSparkle < 80) return;
  lastSparkle = now;
  createSparkle(e.clientX, e.clientY);
}

function createSparkle(x, y) {
  if (!sparkleContainer) return;
  const s = document.createElement('div');
  s.className = 'sparkle';
  s.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
  s.style.left = (x + (Math.random() - 0.5) * 24) + 'px';
  s.style.top = (y + (Math.random() - 0.5) * 24) + 'px';
  s.style.fontSize = (10 + Math.random() * 10) + 'px';
  s.style.color = Math.random() > 0.5 ? '#B5002A' : '#FF85A1';
  sparkleContainer.appendChild(s);
  setTimeout(() => s.remove(), 800);
}

// ---- RSVP URL (update this one line to change all buttons) ----
const RSVP_URL = 'https://forms.gle/tmv11AztAjQAkCkg7';
document.querySelectorAll('.rsvp-hero-btn, .rsvp-float').forEach(el => {
  el.href = RSVP_URL;
});

// ---- FALLING PETALS ----
const petalEmojis = ['🌸', '♡', '🌸', '🌸', '♡'];

function spawnPetal() {
  const petal = document.createElement('div');
  petal.className = 'petal';
  petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
  const size = 14 + Math.random() * 16;
  const duration = 5 + Math.random() * 8;
  const delay = Math.random() * -duration;
  petal.style.left = (Math.random() * 100) + 'vw';
  petal.style.fontSize = size + 'px';
  petal.style.animationDuration = duration + 's';
  petal.style.animationDelay = delay + 's';
  document.body.appendChild(petal);
}

for (let i = 0; i < 18; i++) spawnPetal();

// ---- MOBILE NAV ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

// ---- PACKING LIST CHECKBOXES ----
document.querySelectorAll('.packing-item').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('checked');
    // Save to localStorage
    const id = item.dataset.id;
    if (id) {
      const checked = JSON.parse(localStorage.getItem('packing') || '{}');
      checked[id] = item.classList.contains('checked');
      localStorage.setItem('packing', JSON.stringify(checked));
    }
  });
});

// Restore packing state
const packingSaved = JSON.parse(localStorage.getItem('packing') || '{}');
document.querySelectorAll('.packing-item').forEach(item => {
  const id = item.dataset.id;
  if (id && packingSaved[id]) {
    item.classList.add('checked');
  }
});

// ---- MOVIE VOTING ----
function setupMovieVoting() {
  const votes = JSON.parse(localStorage.getItem('movieVotes') || '{}');

  document.querySelectorAll('.movie-card').forEach(card => {
    const id = card.dataset.id;
    if (!id) return;

    // Restore vote count display
    const countEl = card.querySelector('.vote-count');
    if (countEl && votes[id]) {
      countEl.textContent = `${votes[id]} vote${votes[id] !== 1 ? 's' : ''}`;
    }

    card.addEventListener('click', () => {
      const v = JSON.parse(localStorage.getItem('movieVotes') || '{}');
      if (card.classList.contains('voted')) {
        card.classList.remove('voted');
        v[id] = Math.max(0, (v[id] || 1) - 1);
      } else {
        card.classList.add('voted');
        v[id] = (v[id] || 0) + 1;
      }
      localStorage.setItem('movieVotes', JSON.stringify(v));
      if (countEl) countEl.textContent = `${v[id]} vote${v[id] !== 1 ? 's' : ''}`;
    });
  });
}
setupMovieVoting();

// ---- MOVIE SUGGESTION ----
function setupMovieSuggest() {
  const input = document.getElementById('movie-suggest-input');
  const btn = document.getElementById('movie-suggest-btn');
  const list = document.getElementById('suggested-movies');

  if (!input || !btn || !list) return;

  const suggestions = JSON.parse(localStorage.getItem('movieSuggestions') || '[]');
  renderSuggestions(suggestions, list);

  btn.addEventListener('click', () => {
    const val = input.value.trim();
    if (!val) return;
    suggestions.push(val);
    localStorage.setItem('movieSuggestions', JSON.stringify(suggestions));
    renderSuggestions(suggestions, list);
    input.value = '';
    createSparkle(btn.getBoundingClientRect().left, btn.getBoundingClientRect().top);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btn.click();
  });
}

function renderSuggestions(suggestions, container) {
  if (!container) return;
  container.innerHTML = '';
  suggestions.forEach((s, i) => {
    const el = document.createElement('div');
    el.className = 'movie-card fade-in';
    el.style.animationDelay = (i * 0.05) + 's';
    el.innerHTML = `
      <span class="movie-emoji">🎬</span>
      <div class="movie-title">${escapeHtml(s)}</div>
      <div class="movie-genre">suggested</div>
      <span class="vote-count">0 votes</span>
    `;
    container.appendChild(el);
  });
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

setupMovieSuggest();

// ---- FADE IN ANIMATION ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('fade-in');
      e.target.style.opacity = '1';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.day-item, .timeline-card, .guest-card, .menu-item, .packing-item').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});
