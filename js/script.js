// ── LOADER ──
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1800);
});

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── MOBILE MENU ──
function openMobileMenu() {
  document.getElementById('mobileMenu').classList.add('open');
}

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── FLAMES ──
const flamesContainer = document.getElementById('flames');
for (let i = 0; i < 20; i++) {
  const f = document.createElement('div');
  f.className = 'flame';
  f.style.left = Math.random() * 100 + '%';
  const h = 20 + Math.random() * 60;
  f.style.height = h + 'px';
  f.style.background = `linear-gradient(180deg, transparent, hsl(${20 + Math.random()*30}, 90%, ${30 + Math.random()*30}%))`;
  f.style.animationDelay = (Math.random() * 4) + 's';
  f.style.animationDuration = (2 + Math.random() * 3) + 's';
  flamesContainer.appendChild(f);
}

// ── HAPPY HOUR COUNTDOWN ──
function updateCountdown() {
  const ch = document.getElementById('ch');
  const cm = document.getElementById('cm');
  const cs = document.getElementById('cs');
  if (!ch || !cm || !cs) return;

  const now = new Date();
  const end = new Date(now);
  end.setHours(20, 0, 0, 0);
  if (now >= end) end.setDate(end.getDate() + 1);
  const diff = end - now;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  ch.textContent = String(h).padStart(2,'0');
  cm.textContent = String(m).padStart(2,'0');
  cs.textContent = String(s).padStart(2,'0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ── MENU FILTER ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.menu-item').forEach(item => {
      const cat = item.dataset.cat;
      if (filter === 'all' || cat === filter) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ── MENU IMAGES FROM PUBLIC DATABASE ──
const menuImageMap = {
  petiscos: 'images/batatafrita.jpg',
  parrilla: 'images/galeria4.jpg',
  burgers: 'images/kibe.jpg',
  drinks: 'images/bolinho_queijo.jpg',
  cervejas: 'images/galeria2.jpg',
  semalcool: 'images/galeria3.jpg',
  shots: 'images/galeria1.jpg',
  sobremesas: 'images/bolo_macaxeira.jpg',
  especiais: 'images/petisco_1.jpg'
};

document.querySelectorAll('.menu-item').forEach(item => {
  const cat = item.dataset.cat;
  const imageUrl = menuImageMap[cat];
  const imgElement = item.querySelector('.menu-item-img') || item.querySelector('img');
  if (imageUrl && imgElement) {
    if (imgElement.tagName === 'IMG') {
      imgElement.src = imageUrl;
      imgElement.alt = `${cat} imagem`;
    } else {
      imgElement.style.backgroundImage = `url('${imageUrl}')`;
    }
  }
});

document.querySelectorAll('.evento-card').forEach(card => {
  if (card.dataset.eventActive === 'false') {
    card.style.display = 'none';
  }
});

// ── TOAST ──
let toastTimeout;

function addToast(name) {
  clearTimeout(toastTimeout);
  document.getElementById('toastMsg').textContent = name + ' selecionado!';
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── RESERVA SUBMIT ──
function submitReserva() {
  addToast('Reserva enviada!');
  document.getElementById('toastMsg').textContent = 'Aguarde — entraremos em contato em breve via WhatsApp!';
  setTimeout(() => {
    window.open('https://wa.me/5582999999999?text=Olá!+Acabei+de+fazer+uma+reserva+pelo+site+do+El+Porteño+Pub!', '_blank');
  }, 1000);
}

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
