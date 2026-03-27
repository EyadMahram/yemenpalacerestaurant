/* ─── Yemen Palace Restaurant — Main JS ─── */

/* Navbar scroll */
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.pageYOffset > 60);
  }, { passive: true });
}

/* Mobile menu */
const toggle  = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-links');
const overlay = document.querySelector('.nav-overlay');

function closeMenu() {
  toggle?.classList.remove('active');
  navList?.classList.remove('open');
  overlay?.classList.remove('active');
  document.body.classList.remove('menu-open');
}

toggle?.addEventListener('click', () => {
  const open = navList.classList.toggle('open');
  toggle.classList.toggle('active', open);
  overlay.classList.toggle('active', open);
  document.body.classList.toggle('menu-open', open);
});
overlay?.addEventListener('click', closeMenu);

/* Active nav link */
const page = location.pathname.split('/').pop().replace('.html', '') || 'index';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href').replace('.html', '').replace('/', '');
  const p    = href || 'index';
  if (p === page) link.classList.add('active');
});

/* Smooth scroll for anchors */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    closeMenu();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* Scroll reveal */
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
if (reveals.length) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) target.classList.add('revealed');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -56px 0px' });
  reveals.forEach(el => io.observe(el));
}

/* Menu tabs */
const tabBtns = document.querySelectorAll('.tab-btn');
if (tabBtns.length) {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      document.querySelectorAll('.menu-category').forEach(sec => {
        sec.classList.toggle('active', sec.id === target);
      });
    });
  });
}

/* Gallery filters */
const filterBtns  = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const show = filter === 'all' || item.dataset.cat === filter;
        item.style.display = show ? '' : 'none';
      });
    });
  });
}

/* Reservation form */
const resForm = document.getElementById('reservation-form');
if (resForm) {
  resForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = resForm.querySelector('button[type="submit"]');
    btn.textContent = '✓ Request Sent!';
    btn.style.background = 'linear-gradient(135deg,#5a8a40,#3d6028)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Request Reservation';
      btn.style.background = '';
      btn.disabled = false;
      resForm.reset();
    }, 4000);
  });
}

/* Contact form */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = '✓ Message Sent!';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      contactForm.reset();
    }, 4000);
  });
}

/* Highlight today's hours */
const dayMap = { 0:'sun',1:'mon',2:'tue',3:'wed',4:'thu',5:'fri',6:'sat' };
const todayKey = dayMap[new Date().getDay()];
document.querySelectorAll('[data-day="' + todayKey + '"]').forEach(el => el.classList.add('today'));
