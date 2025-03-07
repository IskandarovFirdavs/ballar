// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Variables
  const body = document.body;
  const cursorOuter = document.querySelector(".cursor-outer");
  const cursorInner = document.querySelector(".cursor-inner");
  const loadingScreen = document.querySelector(".loading-screen");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav ul");
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  const parallaxElements = document.querySelectorAll("[data-speed]");
  const navLinks = document.querySelectorAll(".nav-link");
  const formInputs = document.querySelectorAll(".form-input");
  const glitchElements = document.querySelectorAll(".glitch");

  // Initialize the page
  initPage();

  function initPage() {
    // Hide loading screen after animations complete
    setTimeout(() => {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500);
    }, 3000);

    // Initialize custom cursor
    initCustomCursor();

    // Initialize parallax effect
    initParallax();

    // Initialize smooth scrolling
    initSmoothScroll();

    // Initialize tab functionality
    initTabs();

    // Initialize mobile menu
    initMobileMenu();

    // Initialize form animations
    initFormAnimations();

    // Initialize glitch animations
    initGlitchAnimations();
  }

  // Custom cursor functionality
  function initCustomCursor() {
    document.addEventListener("mousemove", (e) => {
      const x = e.clientX;
      const y = e.clientY;

      cursorOuter.style.transform = `translate(${x}px, ${y}px)`;
      cursorInner.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .project-card, .video-card"
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursorOuter.style.width = "60px";
        cursorOuter.style.height = "60px";
        cursorOuter.style.backgroundColor = "rgba(107, 0, 221, 0.1)";
        cursorOuter.style.borderColor = "var(--accent-color-pink)";
        cursorOuter.style.boxShadow = "var(--neon-shadow-pink)";
      });

      element.addEventListener("mouseleave", () => {
        cursorOuter.style.width = "40px";
        cursorOuter.style.height = "40px";
        cursorOuter.style.backgroundColor = "transparent";
        cursorOuter.style.borderColor = "var(--accent-color-blue)";
        cursorOuter.style.boxShadow = "var(--neon-shadow-blue)";
      });
    });
  }

  // Parallax effect
  function initParallax() {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;

      parallaxElements.forEach((element) => {
        const speed = element.getAttribute("data-speed");
        element.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  }

  // Smooth scrolling for anchor links
  function initSmoothScroll() {
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (nav.classList.contains("active")) {
          nav.classList.remove("active");
          menuToggle.classList.remove("active");
        }
      });
    });
  }

  // Tab functionality
  function initTabs() {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        tabBtns.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        btn.classList.add("active");

        // Hide all tab contents
        tabContents.forEach((content) => content.classList.remove("active"));

        // Show corresponding tab content
        const tabId = btn.getAttribute("data-tab");
        document.getElementById(`${tabId}-projects`).classList.add("active");
      });
    });
  }

  // Mobile menu functionality
  function initMobileMenu() {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");

      if (menuToggle.classList.contains("active")) {
        nav.style.display = "flex";
        setTimeout(() => {
          nav.style.opacity = "1";
          nav.style.transform = "translateY(0)";
        }, 10);

        // Animate hamburger into X
        const bars = menuToggle.querySelectorAll(".bar");
        bars[0].style.transform = "rotate(45deg) translate(5px, 6px)";
        bars[1].style.opacity = "0";
        bars[2].style.transform = "rotate(-45deg) translate(5px, -6px)";
      } else {
        nav.style.opacity = "0";
        nav.style.transform = "translateY(-20px)";

        setTimeout(() => {
          nav.style.display = "none";
        }, 300);

        // Animate X back to hamburger
        const bars = menuToggle.querySelectorAll(".bar");
        bars[0].style.transform = "rotate(0) translate(0)";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "rotate(0) translate(0)";
      }
    });

    // Add mobile menu styles
    const style = document.createElement("style");
    style.textContent = `
      @media (max-width: 768px) {
        nav ul {
          position: absolute;
          top: 80px;
          left: 0;
          width: 100%;
          flex-direction: column;
          background-color: rgba(10, 10, 18, 0.95);
          backdrop-filter: blur(10px);
          padding: 20px;
          gap: 15px;
          text-align: center;
          opacity: 0;
          transform: translateY(-20px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          display: none;
        }
        
        .menu-toggle.active .bar:nth-child(1) {
          transform: rotate(45deg) translate(5px, 6px);
        }
        
        .menu-toggle.active .bar:nth-child(2) {
          opacity: 0;
        }
        
        .menu-toggle.active .bar:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -6px);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Form animations
  function initFormAnimations() {
    formInputs.forEach((input) => {
      // Check if input has a value on page load
      if (input.value !== "") {
        const label = input.nextElementSibling;
        label.style.transform = "translateY(-20px)";
        label.style.fontSize = "12px";
        label.style.color = "var(--accent-color-blue)";
      }

      // Handle input focus
      input.addEventListener("focus", () => {
        const label = input.nextElementSibling;
        label.style.transform = "translateY(-20px)";
        label.style.fontSize = "12px";
        label.style.color = "var(--accent-color-blue)";
      });

      // Handle input blur
      input.addEventListener("blur", () => {
        if (input.value === "") {
          const label = input.nextElementSibling;
          label.style.transform = "translateY(0)";
          label.style.fontSize = "16px";
          label.style.color = "var(--text-secondary)";
        }
      });
    });

    // Handle form submission
    const contactForm = document.querySelector(".contact-form");
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Simple form validation
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      if (name && email && message) {
        // Show success message (in a real site, you'd send the form data to a server)
        contactForm.innerHTML = `
          <div class="success-message">
            <svg viewBox="0 0 24 24" width="48" height="48" stroke="var(--accent-color-green)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <h3>Message Sent!</h3>
            <p>Thank you for reaching out. We'll get back to you soon.</p>
          </div>
        `;
      }
    });
  }

  // Initialize glitch animations
  function initGlitchAnimations() {
    // Apply glitch effect on hover for glitch elements
    glitchElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        element.classList.add("active-glitch");
      });

      element.addEventListener("mouseleave", () => {
        element.classList.remove("active-glitch");
      });
    });

    // Add additional glitch styling
    const style = document.createElement("style");
    style.textContent = `
      .active-glitch::before {
        animation: glitch-anim-1 0.2s infinite linear alternate-reverse;
      }
      
      .active-glitch::after {
        animation: glitch-anim-2 0.2s infinite linear alternate-reverse;
      }
    `;
    document.head.appendChild(style);
  }

  // Add scroll-based animations for elements
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe all sections
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);

    // Add animation class
    section.classList.add("fade-in");
  });

  // Add project card hover effects
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.querySelector(".project-img img").style.transform = "scale(1.1)";
    });

    card.addEventListener("mouseleave", () => {
      card.querySelector(".project-img img").style.transform = "scale(1)";
    });
  });

  // Handle video card hover animations
  document.querySelectorAll(".video-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.querySelector(".video-overlay").style.opacity = "1";
      card.querySelector(".play-icon").style.transform = "scale(1)";
    });

    card.addEventListener("mouseleave", () => {
      card.querySelector(".video-overlay").style.opacity = "0";
      card.querySelector(".play-icon").style.transform = "scale(0.8)";
    });
  });

  // Add scroll indicator
  const scrollIndicator = document.createElement("div");
  scrollIndicator.className = "scroll-indicator";
  scrollIndicator.innerHTML = `
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
  `;
  document.querySelector(".hero").appendChild(scrollIndicator);

  // Animate scroll indicator
  const style = document.createElement("style");
  style.textContent = `
    .scroll-indicator {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      color: var(--text-color);
      animation: bounce 2s infinite;
      cursor: pointer;
      z-index: 10;
    }
    
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateX(-50%) translateY(0);
      }
      40% {
        transform: translateX(-50%) translateY(-20px);
      }
      60% {
        transform: translateX(-50%) translateY(-10px);
      }
    }
    
    .fade-in {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .animate-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // Scroll indicator click functionality
  scrollIndicator.addEventListener("click", () => {
    window.scrollTo({
      top: document.querySelector("#about").offsetTop - 80,
      behavior: "smooth",
    });
  });

  // Add header scroll effect
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
      header.style.backgroundColor = "rgba(10, 10, 18, 0.9)";
      header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.2)";
    } else {
      header.style.backgroundColor = "transparent";
      header.style.boxShadow = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const premiumProjects = document.getElementById("premium-projects");
  const freeProjects = document.getElementById("free-projects");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Barcha tugmalardan "active" klassini olib tashlash
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // "Premium" tugmasi bosilganda
      if (this.dataset.tab === "premium") {
        premiumProjects.classList.add("active");
        freeProjects.classList.remove("active");
      }
      // "Tekin" tugmasi bosilganda
      else if (this.dataset.tab === "Tekin") {
        premiumProjects.classList.remove("active");
        freeProjects.classList.add("active");
      }
    });
  });
});
