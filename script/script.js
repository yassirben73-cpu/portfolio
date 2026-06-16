// ════════════════════════════════════════════
// Portfolio JavaScript
// ════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

    // ── Navbar scroll effect ──
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  
    // ── Active nav link on scroll ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
  
    function activateNavLink() {
      let current = '';
      sections.forEach(section => {
        const top = section.offsetTop - 80;
        if (window.scrollY >= top) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    }
    window.addEventListener('scroll', activateNavLink);
  
    // ── Smooth close mobile menu on link click ──
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const collapse = document.getElementById('navbarNav');
        if (collapse.classList.contains('show')) {
          bootstrap.Collapse.getInstance(collapse)?.hide();
        }
      });
    });
  
    // ── Scroll reveal animation ──
    const revealEls = document.querySelectorAll('.section-pad, .project-card, .skill-item, .contact-info-item, .about-img-wrapper');
    revealEls.forEach(el => el.classList.add('reveal'));
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  
    // ── Progress bars animate on scroll ──
    const skillBars = document.querySelectorAll('.skill-bar .progress-bar');
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => { bar.style.width = width; }, 100);
          barObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });
  
    skillBars.forEach(bar => {
      const originalWidth = bar.style.width;
      bar.dataset.width = originalWidth;
      bar.style.width = '0%';
      barObserver.observe(bar);
    });
  
    // ── Contact form ──
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Message envoyé !';
        btn.style.background = '#22c55e';
        btn.disabled = true;
        setTimeout(() => {
          btn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Envoyer le message';
          btn.style.background = '';
          btn.disabled = false;
          form.reset();
        }, 3500);
      });
    }
  
    // ── Typing effect on hero ──
    const roles = ['Développeur Full Stack', 'Designer UI/UX', 'Dev Back-End', 'Dev Front-End'];
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      let roleIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      const fixedStart = 'Développeur ';
  
      function type() {
        const role = roles[roleIndex];
        const dynamic = isDeleting
          ? role.substring(0, charIndex - 1)
          : role.substring(0, charIndex + 1);
  
        heroTitle.innerHTML = `Développeur <span class="text-violet">${dynamic}</span>`;
  
        if (!isDeleting && dynamic === role) {
          setTimeout(() => { isDeleting = true; type(); }, 1800);
          return;
        } else if (isDeleting && dynamic === '') {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
  
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        setTimeout(type, isDeleting ? 60 : 100);
      }
  
      // Start after a brief delay
      setTimeout(type, 1200);
    }
  
  });