// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Loan Calculator
    const loanAmount = document.getElementById('calcAmount');
    const loanAmountSlider = document.getElementById('calcAmountSlider');
    const calcTermSlider = document.getElementById('calcTermSlider');
    const termButtons = document.querySelectorAll('.term-btn');
    const amountButtons = document.querySelectorAll('.amount-btn');
    const amountValue = document.getElementById('amountValue');
    
    // Form Elements
    const loanForm = document.getElementById('loanApplicationForm');
    const contactForm = document.getElementById('contactForm');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    // Modal Elements
    const termsModal = document.getElementById('terms-modal');
    const closeModal = document.querySelector('.close-modal');
    const termsLink = document.querySelector('a[href="#terms-modal"]');
    
    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    // Initialize Loan Calculator
    function initCalculator() {
        // Sync amount inputs
        loanAmount.addEventListener('input', function() {
            loanAmountSlider.value = this.value;
            updateCalculator();
        });
        
        loanAmountSlider.addEventListener('input', function() {
            loanAmount.value = this.value;
            updateCalculator();
        });
        
        // Term buttons
        termButtons.forEach(button => {
            button.addEventListener('click', function() {
                termButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                calcTermSlider.value = this.dataset.days;
                updateCalculator();
            });
        });
        
        // Amount buttons in form
        amountButtons.forEach(button => {
            button.addEventListener('click', function() {
                amountButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                const loanAmountInput = document.getElementById('loanAmount');
                loanAmountInput.value = this.dataset.amount;
                updateFormAmountDisplay();
            });
        });
        
        // Form amount slider
        const formAmountSlider = document.getElementById('loanAmount');
        if (formAmountSlider) {
            formAmountSlider.addEventListener('input', updateFormAmountDisplay);
        }
        
        // Initial calculation
        updateCalculator();
        updateFormAmountDisplay();
    }
    
    // Update Calculator Display
    function updateCalculator() {
        const amount = parseFloat(loanAmount.value);
        const term = parseInt(calcTermSlider.value);
        
        // Calculate finance charge (typical payday loan: $15 per $100)
        const financeCharge = (amount / 100) * 15;
        const totalRepayment = amount + financeCharge;
        
        // Calculate APR
        const apr = ((financeCharge / amount) * (365 / term) * 100).toFixed(2);
        
        // Update display
        document.getElementById('resultAmount').textContent = `$${amount.toFixed(2)}`;
        document.getElementById('resultFee').textContent = `$${financeCharge.toFixed(2)}`;
        document.getElementById('resultTotal').textContent = `$${totalRepayment.toFixed(2)}`;
        document.getElementById('resultAPR').textContent = `${apr}%`;
    }
    
    // Update Form Amount Display
    function updateFormAmountDisplay() {
        const amountSlider = document.getElementById('loanAmount');
        if (amountSlider) {
            const value = amountSlider.value;
            amountValue.textContent = `$${value}`;
            
            // Update active button
            amountButtons.forEach(button => {
                if (parseInt(button.dataset.amount) === parseInt(value)) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });
        }
    }
    
    // Form Submission Handler
    function initFormHandlers() {
        if (loanForm) {
            loanForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                if (!validateForm(this)) {
                    return;
                }
                
                try {
                    showLoading();
                    
                    // Collect form data
                    const formData = new FormData(this);
                    formData.append('form_type', 'loan_application');
                    
                    // Submit form via AJAX
                    const response = await fetch(this.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    
                    const result = await response.json();
                    
                    if (result.success) {
                        // Redirect to thank you page
                        window.location.href = 'thankyou.html';
                    } else {
                        showError('Submission failed. Please try again.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    showError('Network error. Please check your connection.');
                } finally {
                    hideLoading();
                }
            });
        }
        
        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                if (!validateForm(this)) {
                    return;
                }
                
                try {
                    showLoading();
                    
                    const formData = new FormData(this);
                    
                    const response = await fetch(this.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    
                    const result = await response.json();
                    
                    if (result.success) {
                        showSuccess('Message sent successfully! We\'ll get back to you soon.');
                        this.reset();
                    } else {
                        showError('Failed to send message. Please try again.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    showError('Network error. Please check your connection.');
                } finally {
                    hideLoading();
                }
            });
        }
    }
    
    // Form Validation
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                showInputError(input, 'This field is required');
            } else if (input.type === 'email' && !isValidEmail(input.value)) {
                isValid = false;
                showInputError(input, 'Please enter a valid email address');
            } else if (input.type === 'tel' && !isValidPhone(input.value)) {
                isValid = false;
                showInputError(input, 'Please enter a valid phone number');
            } else {
                clearInputError(input);
            }
        });
        
        // Check terms agreement for loan application
        const termsCheckbox = form.querySelector('input[name="terms"]');
        if (termsCheckbox && !termsCheckbox.checked) {
            isValid = false;
            showError('You must agree to the terms and conditions');
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isValidPhone(phone) {
        const re = /^[\+]?[1-9][\d]{0,15}$/;
        const cleaned = phone.replace(/[^\d+]/g, '');
        return re.test(cleaned);
    }
    
    function showInputError(input, message) {
        clearInputError(input);
        input.style.borderColor = '#dc3545';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'input-error';
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.85rem';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        
        input.parentNode.appendChild(errorDiv);
    }
    
    function clearInputError(input) {
        input.style.borderColor = '';
        const errorDiv = input.parentNode.querySelector('.input-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    // Modal Functions
    function initModal() {
        if (termsLink && termsModal) {
            termsLink.addEventListener('click', function(e) {
                e.preventDefault();
                termsModal.style.display = 'flex';
            });
        }
        
        if (closeModal && termsModal) {
            closeModal.addEventListener('click', function() {
                termsModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === termsModal) {
                termsModal.style.display = 'none';
            }
        });
    }
    
    // Mobile Menu
    function initMobileMenu() {
        if (mobileMenuBtn && mainNav) {
            mobileMenuBtn.addEventListener('click', function() {
                mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
                this.innerHTML = mainNav.style.display === 'block' ? 
                    '<i class="fas fa-times"></i>' : 
                    '<i class="fas fa-bars"></i>';
            });
            
            // Close menu when clicking on a link
            mainNav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mainNav.style.display = 'none';
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
        }
    }
    
    // Smooth Scrolling for Anchor Links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip modal links and empty hrefs
                if (href === '#' || href.includes('modal')) {
                    return;
                }
                
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Utility Functions
    function showLoading() {
        if (loadingSpinner) {
            loadingSpinner.style.display = 'flex';
        }
    }
    
    function hideLoading() {
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
    }
    
    function showError(message) {
        alert(message); // Replace with a better notification system
    }
    
    function showSuccess(message) {
        alert(message); // Replace with a better notification system
    }
    
    // Initialize everything
    initCalculator();
    initFormHandlers();
    initModal();
    initMobileMenu();
    initSmoothScrolling();
    
    // Handle thank you page redirection
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('thankyou')) {
        showSuccess('Thank you for your application! We will contact you shortly.');
    }
});
