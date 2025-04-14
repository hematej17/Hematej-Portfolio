// Toggle mobile menu
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
  
  // Theme toggle functionality
  const themeToggle = document.querySelector('.theme-toggle');
  
  if (themeToggle) {
    // Check for saved theme preference or use user's system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.body.setAttribute('data-theme', 'dark');
      themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', function() {
      const icon = this.querySelector('i');
      if (document.body.getAttribute('data-theme') === 'dark') {
        document.body.removeAttribute('data-theme');
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
      } else {
        document.body.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
  
  // Scroll to top button
  const scrollTopBtn = document.getElementById('scroll-to-top');
  
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });
    
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Contact form validation
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      
      // Validate name
      const nameInput = document.getElementById('name');
      const nameError = document.getElementById('name-error');
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Name is required';
        isValid = false;
      } else {
        nameError.textContent = '';
      }
      
      // Validate email
      const emailInput = document.getElementById('email');
      const emailError = document.getElementById('email-error');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Email is required';
        isValid = false;
      } else if (!emailPattern.test(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
      } else {
        emailError.textContent = '';
      }
      
      // Validate subject
      const subjectInput = document.getElementById('subject');
      const subjectError = document.getElementById('subject-error');
      if (!subjectInput.value.trim()) {
        subjectError.textContent = 'Subject is required';
        isValid = false;
      } else {
        subjectError.textContent = '';
      }
      
      // Validate message
      const messageInput = document.getElementById('message');
      const messageError = document.getElementById('message-error');
      if (!messageInput.value.trim()) {
        messageError.textContent = 'Message is required';
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        isValid = false;
      } else {
        messageError.textContent = '';
      }
      
      // If valid, show success message
      if (isValid) {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Reset form (in case they navigate back)
        contactForm.reset();
        
        // In a real application, you would send the form data to a server here
        console.log('Form submitted with values:', {
          name: nameInput.value,
          email: emailInput.value,
          subject: subjectInput.value,
          message: messageInput.value
        });
      }
    });
  }
  
  // Animate skill bars on scroll if we're on the about page
  const skillBars = document.querySelectorAll('.skill-progress');
  
  if (skillBars.length > 0) {
    const animateSkills = () => {
      skillBars.forEach(bar => {
        const barPos = bar.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;
        
        if (barPos < screenPos) {
          const percent = bar.getAttribute('data-percent');
          bar.style.width = percent + '%';
        }
      });
    };
    
    // Run once on page load
    animateSkills();
    
    // Run on scroll
    window.addEventListener('scroll', animateSkills);
  }
});