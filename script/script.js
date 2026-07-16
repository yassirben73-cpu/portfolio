// ════════════════════════════════════════════
// Portfolio JavaScript
// ════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

    // ── EmailJS Initialization ──
    // IMPORTANT: Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    // Get your public key from https://www.emailjs.com/
    emailjs.init('dQgObJvaS8qTQlE9m');

    // ── i18n (Internationalization) ──
    const translations = {};
    let currentLang = 'fr';

    // Load translations
    async function loadTranslations() {
      try {
        const frResponse = await fetch('i18n/fr.json');
        const enResponse = await fetch('i18n/en.json');
        translations.fr = await frResponse.json();
        translations.en = await enResponse.json();
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    }

    // Detect browser language or use localStorage
    function detectLanguage() {
      const savedLang = localStorage.getItem('lang');
      if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
        return savedLang;
      }
      const browserLang = navigator.language || navigator.userLanguage;
      return browserLang.startsWith('fr') ? 'fr' : 'en';
    }

    // Apply translations to the page
    function applyTranslations(lang) {
      currentLang = lang;
      localStorage.setItem('lang', lang);
      document.documentElement.lang = lang;
      
      // Update language toggle button
      const langToggle = document.getElementById('currentLang');
      if (langToggle) {
        langToggle.textContent = lang.toUpperCase();
      }

      // Translate all elements with data-i18n attribute
      document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(translations[lang], key);
        if (translation) {
          element.innerHTML = translation;
        }
      });

      // Translate placeholders
      document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = getNestedTranslation(translations[lang], key);
        if (translation) {
          element.placeholder = translation;
        }
      });

      // Update typing effect roles based on language
      updateTypingEffectRoles(lang);
      
      // Re-initialize skill bars after language switch
      setTimeout(initSkillBars, 50);
    }

    // Get nested translation from object using dot notation
    function getNestedTranslation(obj, path) {
      return path.split('.').reduce((o, i) => o ? o[i] : null, obj);
    }

    // Update typing effect roles for different languages
    function updateTypingEffectRoles(lang) {
      const roles = lang === 'fr' 
        ? ['Développeur Full Stack', 'Designer UI/UX', 'Dev Back-End', 'Dev Front-End']
        : ['Full Stack Developer', 'UI/UX Designer', 'Back-End Dev', 'Front-End Dev'];
      
      // Store roles globally for the typing effect
      window.typingRoles = roles;
    }

    // Initialize i18n
    async function initI18n() {
      await loadTranslations();
      const detectedLang = detectLanguage();
      applyTranslations(detectedLang);

      // Language toggle button
      const langToggle = document.getElementById('langToggle');
      if (langToggle) {
        langToggle.addEventListener('click', () => {
          const newLang = currentLang === 'fr' ? 'en' : 'fr';
          applyTranslations(newLang);
        });
      }
    }

    initI18n();

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
    function initSkillBars() {
      const skillBars = document.querySelectorAll('.skill-bar .progress-bar');
      
      skillBars.forEach(bar => {
        // Get width from data-width attribute or fallback to style.width
        const targetWidth = bar.getAttribute('data-width') || bar.style.width;
        bar.dataset.targetWidth = targetWidth;
        bar.style.width = '0%';
      });

      const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const targetWidth = bar.dataset.targetWidth;
            bar.style.width = '0%';
            setTimeout(() => { 
              bar.style.width = targetWidth; 
            }, 100);
            barObserver.unobserve(bar);
          }
        });
      }, { threshold: 0.5 });

      skillBars.forEach(bar => {
        barObserver.observe(bar);
      });
    }

    // Initialize skill bars on load
    initSkillBars();
  
    // ── Contact form with EmailJS ──
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
          alert(currentLang === 'fr' ? 'Veuillez remplir tous les champs.' : 'Please fill in all fields.');
          return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert(currentLang === 'fr' ? 'Veuillez entrer une adresse email valide.' : 'Please enter a valid email address.');
          return;
        }
        
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>' + (currentLang === 'fr' ? 'Envoi en cours...' : 'Sending...');
        
        // Send email using EmailJS
        // IMPORTANT: Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS credentials
        emailjs.send('service_1gym2bn', 'template_hipd2fa', {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message,
          to_email: 'yassirbensmina73@gmail.com'
        })
        .then(function() {
          btn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>' + (currentLang === 'fr' ? 'Message envoyé avec succès !' : 'Message sent successfully!');
          btn.style.background = '#22c55e';
          form.reset();
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
          }, 4000);
        })
        .catch(function(error) {
          console.error('EmailJS error:', error);
          btn.innerHTML = '<i class="bi bi-x-circle-fill me-2"></i>' + (currentLang === 'fr' ? 'Erreur lors de l\'envoi' : 'Error sending');
          btn.style.background = '#ef4444';
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
          }, 3000);
        });
      });
    }
  
    // ── Typing effect on hero ──
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      let roleIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      function type() {
        const roles = window.typingRoles || ['Développeur Full Stack', 'Designer UI/UX', 'Dev Back-End', 'Dev Front-End'];
        const role = roles[roleIndex];
        const dynamic = isDeleting
          ? role.substring(0, charIndex - 1)
          : role.substring(0, charIndex + 1);

        heroTitle.innerHTML = currentLang === 'fr' 
          ? `Développeur <span class="text-violet">${dynamic}</span>`
          : `Full Stack <span class="text-violet">${dynamic}</span>`;

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
