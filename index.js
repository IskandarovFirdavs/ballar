// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });
  
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  
  requestAnimationFrame(raf);
  
  // Custom cursor
  const cursorOuter = document.querySelector('.cursor-outer');
  const cursorInner = document.querySelector('.cursor-inner');
  const links = document.querySelectorAll('a, button, .btn, .filter-btn, .video-thumbnail');
  
  document.addEventListener('mousemove', (e) => {
    cursorOuter.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      cursorOuter.style.width = '50px';
      cursorOuter.style.height = '50px';
      cursorInner.style.width = '5px';
      cursorInner.style.height = '5px';
    });
    
    link.addEventListener('mouseleave', () => {
      cursorOuter.style.width = '40px';
      cursorOuter.style.height = '40px';
      cursorInner.style.width = '8px';
      cursorInner.style.height = '8px';
    });
  });
  
  // Loading animation
  window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
      
      // Animate elements after loading
      gsap.from('.logo', { opacity: 0, y: -50, duration: 1, delay: 0.2 });
      gsap.from('nav ul li', { opacity: 0, y: -50, duration: 1, stagger: 0.1, delay: 0.3 });
      gsap.from('.hero-content h1', { opacity: 0, y: 50, duration: 1, delay: 0.5 });
      gsap.from('.subtitle', { opacity: 0, y: 50, duration: 1, delay: 0.7 });
      gsap.from('.cta-buttons', { opacity: 0, y: 50, duration: 1, delay: 0.9 });
    }, 2000);
  });
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
    });
  });
  
  // Header scroll effect
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
      header.style.padding = '15px 5%';
      header.style.background = 'rgba(10, 10, 18, 0.9)';
    } else {
      header.style.padding = '20px 5%';
      header.style.background = 'rgba(10, 10, 18, 0.8)';
    }
  });
  
  // Project filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          gsap.to(card, { opacity: 1, scale: 1, duration: 0.5 });
          card.style.display = 'block';
        } else {
          gsap.to(card, { opacity: 0, scale: 0.8, duration: 0.5, onComplete: () => {
            card.style.display = 'none';
          }});
        }
      });
    });
  });
  
  // GSAP animations with ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // About section animations
  gsap.from('.about .section-title', {
    scrollTrigger: {
      trigger: '.about',
      start: 'top 80%',
    },
    opacity: 0,
    y: 50,
    duration: 1
  });
  
  gsap.from('.glass-card', {
    scrollTrigger: {
      trigger: '.about-content',
      start: 'top 80%',
    },
    opacity: 0,
    y: 100,
    stagger: 0.2,
    duration: 1
  });
  
  // Projects section animations
  gsap.from('.projects .section-title', {
    scrollTrigger: {
      trigger: '.projects',
      start: 'top 80%',
    },
    opacity: 0,
    y: 50,
    duration: 1
  });
  
  gsap.from('.projects-filter', {
    scrollTrigger: {
      trigger: '.projects-filter',
      start: 'top 80%',
    },
    opacity: 0,
    y: 50,
    duration: 1
  });
  
  gsap.from('.project-card', {
    scrollTrigger: {
      trigger: '.projects-grid',
      start: 'top 80%',
    },
    opacity: 0,
    y: 100,
    stagger: 0.1,
    duration: 1
  });
  
  // Videos section animations
  gsap.from('.videos .section-title', {
    scrollTrigger: {
      trigger: '.videos',
      start: 'top 80%',
    },
    opacity: 0,
    y: 50,
    duration: 1
  });
  
  gsap.from('.video-card', {
    scrollTrigger: {
      trigger: '.videos-grid',
      start: 'top 80%',
    },
    opacity: 0,
    y: 100,
    stagger: 0.1,
    duration: 1

})