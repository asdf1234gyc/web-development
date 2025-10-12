// Karoomba! - Themed Party Event Management Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initThemeSlider();
    initTestimonialSlider();
    initScrollAnimation();
    initFormValidation();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Toggle menu button appearance
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on a nav link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mobileMenuBtn.classList.remove('active');
                    mainNav.classList.remove('active');
                    
                    // Reset menu button appearance
                    const spans = mobileMenuBtn.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }
}

// Theme Slider
function initThemeSlider() {
    const themeSlider = document.querySelector('.theme-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (themeSlider && prevBtn && nextBtn) {
        // For mobile scrolling
        let isDown = false;
        let startX;
        let scrollLeft;
        
        // Only apply these controls on mobile/tablet
        if (window.innerWidth <= 992) {
            themeSlider.style.display = 'flex';
            themeSlider.style.overflowX = 'scroll';
            themeSlider.style.scrollBehavior = 'smooth';
            themeSlider.style.scrollSnapType = 'x mandatory';
            
            const themeCards = themeSlider.querySelectorAll('.theme-card');
            themeCards.forEach(card => {
                card.style.flex = '0 0 85%';
                card.style.scrollSnapAlign = 'center';
                card.style.marginRight = '15px';
            });
            
            // Mouse events for drag scrolling
            themeSlider.addEventListener('mousedown', (e) => {
                isDown = true;
                themeSlider.style.cursor = 'grabbing';
                startX = e.pageX - themeSlider.offsetLeft;
                scrollLeft = themeSlider.scrollLeft;
            });
            
            themeSlider.addEventListener('mouseleave', () => {
                isDown = false;
                themeSlider.style.cursor = 'grab';
            });
            
            themeSlider.addEventListener('mouseup', () => {
                isDown = false;
                themeSlider.style.cursor = 'grab';
            });
            
            themeSlider.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - themeSlider.offsetLeft;
                const walk = (x - startX) * 2; // Scroll speed
                themeSlider.scrollLeft = scrollLeft - walk;
            });
        }
        
        // Navigation buttons
        prevBtn.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                themeSlider.scrollBy({ left: -300, behavior: 'smooth' });
            } else {
                // Desktop version could use a different approach
                // For example, showing/hiding cards or using a carousel library
                console.log('Previous theme');
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                themeSlider.scrollBy({ left: 300, behavior: 'smooth' });
            } else {
                console.log('Next theme');
            }
        });
    }
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonials.length > 0 && dots.length > 0) {
        let currentIndex = 0;
        
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Function to show a specific testimonial
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
                testimonial.style.opacity = '0';
                testimonial.style.transform = 'translateY(20px)';
                
                if (i === index) {
                    // Trigger animation
                    setTimeout(() => {
                        testimonial.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        testimonial.style.opacity = '1';
                        testimonial.style.transform = 'translateY(0)';
                    }, 50);
                }
            });
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentIndex = index;
        }
        
        // Add click event to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            let nextIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(nextIndex);
        }, 5000);
    }
}

// Scroll Animation
function initScrollAnimation() {
    const elements = document.querySelectorAll('.service-card, .theme-card, .gallery-item, .booking-steps li, .contact-item');
    
    // Add initial classes
    elements.forEach(element => {
        element.classList.add('fadeIn');
        element.style.opacity = '0';
    });
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animation
    function handleScrollAnimation() {
        elements.forEach(element => {
            if (isInViewport(element) && element.style.opacity === '0') {
                element.style.opacity = '1';
            }
        });
    }
    
    // Initial check on page load
    handleScrollAnimation();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimation);
}

// Form Validation
function initFormValidation() {
    const bookingForm = document.getElementById('event-booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formInputs = this.querySelectorAll('input, select, textarea');
            
            // Basic validation
            formInputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                    
                    // Add error message if it doesn't exist
                    let errorMsg = input.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('p');
                        errorMsg.classList.add('error-message');
                        errorMsg.style.color = 'red';
                        errorMsg.style.fontSize = '1.2rem';
                        errorMsg.style.marginTop = '0.5rem';
                        errorMsg.textContent = 'This field is required';
                        input.parentNode.insertBefore(errorMsg, input.nextSibling);
                    }
                } else {
                    input.style.borderColor = '';
                    
                    // Remove error message if it exists
                    const errorMsg = input.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }
            });
            
            // Email validation
            const emailInput = this.querySelector('#email');
            if (emailInput && emailInput.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value.trim())) {
                    isValid = false;
                    emailInput.style.borderColor = 'red';
                    
                    // Add error message if it doesn't exist
                    let errorMsg = emailInput.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('p');
                        errorMsg.classList.add('error-message');
                        errorMsg.style.color = 'red';
                        errorMsg.style.fontSize = '1.2rem';
                        errorMsg.style.marginTop = '0.5rem';
                        errorMsg.textContent = 'Please enter a valid email address';
                        emailInput.parentNode.insertBefore(errorMsg, emailInput.nextSibling);
                    } else {
                        errorMsg.textContent = 'Please enter a valid email address';
                    }
                }
            }
            
            // If form is valid, show success message
            if (isValid) {
                // Hide form
                bookingForm.style.display = 'none';
                
                // Create and show success message
                const successMsg = document.createElement('div');
                successMsg.classList.add('success-message');
                successMsg.style.backgroundColor = '#4ecdc4';
                successMsg.style.color = 'white';
                successMsg.style.padding = '2rem';
                successMsg.style.borderRadius = '8px';
                successMsg.style.textAlign = 'center';
                
                const heading = document.createElement('h3');
                heading.textContent = 'Thank you!';
                heading.style.marginBottom = '1rem';
                
                const message = document.createElement('p');
                message.textContent = 'Your booking request has been successfully submitted. Our team will contact you within 24 hours.';
                
                successMsg.appendChild(heading);
                successMsg.appendChild(message);
                
                bookingForm.parentNode.appendChild(successMsg);
                
                // Optional: Reset form
                bookingForm.reset();
            }
        });
        
        // Remove error styling on input
        const formInputs = bookingForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
                
                // Remove error message if it exists
                const errorMsg = this.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.remove();
                }
            });
        });
    }

    
}