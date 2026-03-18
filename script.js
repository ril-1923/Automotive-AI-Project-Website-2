// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initForms();
    initPasswordToggles();
    initBackToTop();
    initNavbar();
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-fade class
    document.querySelectorAll('.scroll-fade').forEach(function(element) {
        observer.observe(element);
    });
}

// Form Handling
function initForms() {
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Feedback Form
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFeedbackSubmit);
    }

    // Login Forms
    const loginForm = document.getElementById('loginForm');
    const pageLoginForm = document.getElementById('pageLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    if (pageLoginForm) {
        pageLoginForm.addEventListener('submit', handleLoginSubmit);
    }

    // Register Forms
    const registerForm = document.getElementById('registerForm');
    const pageRegisterForm = document.getElementById('pageRegisterForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }
    if (pageRegisterForm) {
        pageRegisterForm.addEventListener('submit', handleRegisterSubmit);
    }

    // Password matching validation
    setupPasswordMatching();
}

// Newsletter Form Handler
function handleNewsletterSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('newsletterEmail').value;
    const emailError = document.getElementById('emailError');
    const successMessage = document.getElementById('newsletterSuccess');
    
    // Reset previous states
    emailError.classList.add('d-none');
    successMessage.classList.add('d-none');
    
    // Validate email
    if (!isValidEmail(email)) {
        emailError.classList.remove('d-none');
        return;
    }
    
    // Simulate form submission
    showLoadingState(event.target.querySelector('button[type="submit"]'));
    
    setTimeout(function() {
        hideLoadingState(event.target.querySelector('button[type="submit"]'), 'Subscribe');
        event.target.reset();
        successMessage.classList.remove('d-none');
        
        // Auto-hide success message after 5 seconds
        setTimeout(function() {
            successMessage.classList.add('d-none');
        }, 5000);
    }, 1500);
}

// Contact Form Handler
function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const successMessage = document.getElementById('contactSuccess');
    
    // Reset success message
    successMessage.classList.add('d-none');
    
    // Show loading state
    showLoadingState(submitButton);
    
    // Simulate form submission
    setTimeout(function() {
        hideLoadingState(submitButton, 'Send Message');
        form.reset();
        successMessage.classList.remove('d-none');
        
        // Auto-hide success message after 5 seconds
        setTimeout(function() {
            successMessage.classList.add('d-none');
        }, 5000);
    }, 2000);
}

// Feedback Form Handler
function handleFeedbackSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const successMessage = document.getElementById('feedbackSuccess');
    
    // Reset success message
    successMessage.classList.add('d-none');
    
    // Show loading state
    showLoadingState(submitButton);
    
    // Simulate form submission
    setTimeout(function() {
        hideLoadingState(submitButton, 'Submit Feedback');
        form.reset();
        successMessage.classList.remove('d-none');
        
        // Auto-hide success message after 5 seconds
        setTimeout(function() {
            successMessage.classList.add('d-none');
        }, 5000);
    }, 2000);
}

// Login Form Handler
function handleLoginSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Show loading state
    showLoadingState(submitButton);
    
    // Simulate login process
    setTimeout(function() {
        hideLoadingState(submitButton, 'Login');
        
        // Close modal if it exists
        const modal = form.closest('.modal');
        if (modal) {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
        }
        
        // Show success message
        showNotification('Login successful! Welcome back.', 'success');
        form.reset();
    }, 1500);
}

// Register Form Handler
function handleRegisterSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Check password matching
    if (!validatePasswordMatch(form)) {
        return;
    }
    
    // Show loading state
    showLoadingState(submitButton);
    
    // Simulate registration process
    setTimeout(function() {
        hideLoadingState(submitButton, form.id === 'registerForm' ? 'Register' : 'Create Account');
        
        // Close modal if it exists
        const modal = form.closest('.modal');
        if (modal) {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
        }
        
        // Show success message
        showNotification('Account created successfully! Welcome to DriveSmart Auto.', 'success');
        form.reset();
    }, 2000);
}

// Password Toggle Functionality
function initPasswordToggles() {
    // Get all password toggle buttons
    const toggleButtons = [
        'toggleLoginPassword',
        'toggleRegisterPassword',
        'togglePageLoginPassword',
        'togglePageRegisterPassword'
    ];
    
    toggleButtons.forEach(function(buttonId) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', function() {
                const input = this.parentElement.querySelector('input[type="password"], input[type="text"]');
                const icon = this.querySelector('i');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            });
        }
    });
}

// Password Matching Validation
function setupPasswordMatching() {
    const passwordInputs = [
        { password: 'registerPassword', confirm: 'confirmPassword', error: 'passwordError' },
        { password: 'pageRegisterPassword', confirm: 'pageConfirmPassword', error: 'pagePasswordError' }
    ];
    
    passwordInputs.forEach(function(inputs) {
        const passwordField = document.getElementById(inputs.password);
        const confirmField = document.getElementById(inputs.confirm);
        const errorElement = document.getElementById(inputs.error);
        
        if (passwordField && confirmField && errorElement) {
            [passwordField, confirmField].forEach(function(field) {
                field.addEventListener('input', function() {
                    validatePasswordMatch(field.closest('form'));
                });
            });
        }
    });
}

function validatePasswordMatch(form) {
    const passwordField = form.querySelector('input[id*="Password"]:not([id*="confirm"]):not([id*="Confirm"])');
    const confirmField = form.querySelector('input[id*="confirm" i]');
    const errorElement = form.querySelector('[id*="passwordError" i], [id*="PasswordError"]');
    
    if (passwordField && confirmField && errorElement) {
        if (passwordField.value !== confirmField.value && confirmField.value !== '') {
            errorElement.classList.remove('d-none');
            confirmField.classList.add('is-invalid');
            return false;
        } else {
            errorElement.classList.add('d-none');
            confirmField.classList.remove('is-invalid');
            return true;
        }
    }
    return true;
}

// Back to Top Button
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
                setTimeout(function() {
                    backToTopButton.style.opacity = '1';
                }, 10);
            } else {
                backToTopButton.style.opacity = '0';
                setTimeout(function() {
                    backToTopButton.style.display = 'none';
                }, 300);
            }
        });
        
        // Smooth scroll to top
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Navbar Scroll Effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                navbar.style.background = 'rgba(44, 90, 160, 0.98)';
                navbar.style.backdropFilter = 'blur(15px)';
            } else {
                navbar.style.background = 'rgba(44, 90, 160, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        });
    }
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showLoadingState(button) {
    if (button) {
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
        button.classList.add('loading');
    }
}

function hideLoadingState(button, originalText) {
    if (button) {
        button.disabled = false;
        button.innerHTML = originalText;
        button.classList.remove('loading');
    }
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(function() {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form Input Animations
document.querySelectorAll('.form-control').forEach(function(input) {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Initialize Bootstrap Tooltips and Popovers
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});

// Carousel Auto-play Control
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('#testimonialCarousel');
    if (carousel) {
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true
        });
        
        // Pause on hover
        carousel.addEventListener('mouseenter', function() {
            carouselInstance.pause();
        });
        
        carousel.addEventListener('mouseleave', function() {
            carouselInstance.cycle();
        });
    }
});

// Performance Optimization: Lazy Loading Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(function(img) {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading if there are lazy images
if (document.querySelectorAll('img[data-src]').length > 0) {
    initLazyLoading();
}

// Service Worker Registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Dark Mode Toggle (if needed in future)
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        
        // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
}

// Initialize dark mode if toggle exists
initDarkMode();