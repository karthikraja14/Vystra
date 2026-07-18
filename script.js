/* ========================================
   VYSTRA — Premium Animations & Interactions
   GSAP + Lenis + Custom Cursor + Web3Forms
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── Preloader ──────────────────────────
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
      initAnimations();
    }, 2200);
  });
  // Fallback if load already fired
  if (document.readyState === 'complete') {
    setTimeout(() => {
      preloader.classList.add('hidden');
      initAnimations();
    }, 2200);
  }

  // ── Lenis Smooth Scroll ────────────────
  let lenis;
  try {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  } catch(e) {
    // Lenis not loaded, degrade gracefully
  }

  // ── Custom Cursor ──────────────────────
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  
  if (cursor && follower && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let cx = 0, cy = 0, fx = 0, fy = 0;
    
    document.addEventListener('mousemove', (e) => {
      cx = e.clientX; cy = e.clientY;
      cursor.style.transform = `translate(${cx - 4}px, ${cy - 4}px)`;
    });

    function followCursor() {
      fx += (cx - fx) * 0.12;
      fy += (cy - fy) * 0.12;
      follower.style.transform = `translate(${fx - 18}px, ${fy - 18}px)`;
      requestAnimationFrame(followCursor);
    }
    followCursor();

    // Hover effect on interactive elements
    document.querySelectorAll('a, button, .magnetic, input, select, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => follower.classList.add('hovering'));
      el.addEventListener('mouseleave', () => follower.classList.remove('hovering'));
    });
  }

  // ── Navbar Scroll ──────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // ── Mobile Menu ────────────────────────
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  
  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ── Smooth anchor scrolling ────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(target, { offset: -80 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // ── WhatsApp Float ─────────────────────
  const waFloat = document.getElementById('waFloat');
  const waBtn = document.getElementById('waBtn');
  
  window.addEventListener('scroll', () => {
    waFloat.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  waBtn.addEventListener('click', () => {
    const msg = encodeURIComponent("Hi Vystra! I'm interested in your web development services. Can we discuss my project?");
    window.open(`https://wa.me/919087340087?text=${msg}`, '_blank', 'noopener,noreferrer');
  });

  // ── FAQ Accordion ──────────────────────
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-a').style.maxHeight = '0';
      });

      // Open if wasn't active
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ── Contact Form — Web3Forms ───────────
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validation
    if (!data.name || !data.email || !data.message) {
      showFormStatus('Please fill in all required fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      showFormStatus('Please enter a valid email address.', 'error');
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span class="btn-text">Sending...</span>';
    btn.disabled = true;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: data.access_key,
          name: data.name,
          email: data.email,
          phone: data.phone || 'Not provided',
          budget: data.budget || 'Not specified',
          service: data.service || 'Not specified',
          message: data.message,
          subject: data.subject,
          from_name: data.from_name,
        })
      });

      const result = await response.json();
      
      if (result.success) {
        showFormStatus('Message sent! We\'ll get back to you within 24 hours.', 'success');
        form.reset();
      } else {
        showFormStatus('Something went wrong. Please try WhatsApp or email us directly at admin@vystra.in', 'error');
      }
    } catch {
      showFormStatus('Network error. Please try WhatsApp or email us at admin@vystra.in', 'error');
    }

    btn.innerHTML = originalHTML;
    btn.disabled = false;
  });

  function showFormStatus(msg, type) {
    formStatus.textContent = msg;
    formStatus.className = 'form-status ' + type;
    setTimeout(() => {
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }, 6000);
  }

  // ── GSAP Animations ───────────────────
  function initAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      // Fallback: just show everything
      document.querySelectorAll('[data-animate]').forEach(el => el.classList.add('animated'));
      animateCounters();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Hero text reveal
    gsap.fromTo('.hero-line-inner', 
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 2.4 }
    );

    // Hero elements fade in
    gsap.fromTo('.hero-badge', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 2.2 }
    );
    gsap.fromTo('.hero-subtitle', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 2.8 }
    );
    gsap.fromTo('.hero-cta-group', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 3.0 }
    );
    gsap.fromTo('.hero-stats-bar', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 3.2 }
    );
    gsap.fromTo('.hero-scroll-indicator', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 3.5 }
    );

    // Floating orb animation
    gsap.to('.hero-orb-1', { x: 30, y: 20, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.hero-orb-2', { x: -20, y: -30, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.hero-orb-3', { x: 15, y: -15, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    // Scroll-triggered fade-up animations
    document.querySelectorAll('[data-animate]').forEach(el => {
      const delay = parseFloat(el.dataset.delay) || 0;
      
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: delay,
            ease: 'power2.out',
            onStart: () => el.classList.add('animated')
          });
        }
      });
    });

    // Parallax on hero orbs
    gsap.to('.hero-orb-1', {
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
      y: -100, opacity: 0.1
    });
    gsap.to('.hero-orb-2', {
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
      y: -80, opacity: 0.05
    });

    // Section parallax
    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.fromTo(header, 
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          scrollTrigger: { trigger: header, start: 'top 85%', once: true }
        }
      );
    });

    // Counter animation on scroll
    ScrollTrigger.create({
      trigger: '.hero-stats-bar',
      start: 'top 90%',
      once: true,
      onEnter: animateCounters
    });

    ScrollTrigger.create({
      trigger: '.big-numbers',
      start: 'top 80%',
      once: true,
      onEnter: () => animateCounters('.big-numbers')
    });

    // Browser mockup tilt on scroll
    gsap.to('.project-browser', {
      scrollTrigger: { trigger: '.project-showcase', start: 'top 70%', end: 'bottom 30%', scrub: 1 },
      rotateY: 2, rotateX: -1, scale: 1.02
    });

    // Bento card glow follow mouse
    document.querySelectorAll('.bento-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const glow = card.querySelector('.bento-glow');
        if (glow) {
          glow.style.left = (e.clientX - rect.left - 100) + 'px';
          glow.style.top = (e.clientY - rect.top - 100) + 'px';
        }
      });
    });

    // Magnetic button effect
    document.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.15, y: y * 0.15, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  // ── Counter Animation ──────────────────
  let heroCountersDone = false;
  let bigNumbersDone = false;

  function animateCounters(section) {
    let counters;
    
    if (section === '.big-numbers') {
      if (bigNumbersDone) return;
      bigNumbersDone = true;
      counters = document.querySelectorAll('.big-numbers [data-count]');
    } else {
      if (heroCountersDone) return;
      heroCountersDone = true;
      counters = document.querySelectorAll('.hero-stats-bar [data-count]');
    }

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
  }

  // Fallback: trigger counters on basic scroll if GSAP not loaded
  if (typeof gsap === 'undefined') {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('hero-stats-bar')) animateCounters();
          if (entry.target.classList.contains('numbers-grid')) animateCounters('.big-numbers');
          entry.target.querySelectorAll('[data-animate]').forEach(el => el.classList.add('animated'));
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hero-stats-bar, .numbers-grid, [data-animate]').forEach(el => observer.observe(el));
  }

  // ── Active nav link highlighting ───────
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        const id = section.getAttribute('id');
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
        });
      }
    });
  }, { passive: true });

});
