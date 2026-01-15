// Enhanced JavaScript for SwiftFund Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Check if user is logged in and update navigation
    updateNavigation();

    // EMI Calculator
    initializeEMICalculator();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize sample data if none exists
    initializeSampleData();
});

// Update navigation based on login status
function updateNavigation() {
    const authButtons = document.querySelector('.auth-buttons');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (authButtons) {
        if (currentUser) {
            authButtons.innerHTML = `
                <a href="user-dashboard.html" class="btn-dashboard">
                    <i class="fas fa-user-circle"></i> Dashboard
                </a>
                <button onclick="logout()" class="btn-logout">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </button>
            `;
        }
    }
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    updateNavigation();
    window.location.href = 'index.html';
}

// Generate unique application ID
function generateApplicationId() {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return 'SWIFT-' + timestamp + random;
}

// Save application to localStorage
function saveApplication(application) {
    let applications = JSON.parse(localStorage.getItem('loanApplications')) || [];
    applications.push(application);
    localStorage.setItem('loanApplications', JSON.stringify(applications));
}

// Simple encryption/decryption functions
function encrypt(text) {
    return btoa(text).split('').reverse().join('');
}

function decrypt(text) {
    try {
        return atob(text.split('').reverse().join(''));
    } catch {
        return text;
    }
}

// Format currency
function formatCurrency(amount) {
    return '$' + parseInt(amount).toLocaleString();
}

// Initialize EMI Calculator
function initializeEMICalculator() {
    const amountInput = document.getElementById('calcAmount');
    const tenureInput = document.getElementById('calcTenure');
    const interestInput = document.getElementById('calcInterest');
    
    const amountValue = document.getElementById('amountValue');
    const tenureValue = document.getElementById('tenureValue');
    const interestValue = document.getElementById('interestValue');
    
    const emiValue = document.getElementById('emiValue');
    const totalInterest = document.getElementById('totalInterest');
    const totalAmount = document.getElementById('totalAmount');

    if (!amountInput) return;

    function updateCalculator() {
        const amount = parseFloat(amountInput.value);
        const tenure = parseFloat(tenureInput.value);
        const interest = parseFloat(interestInput.value);

        // Update display values
        amountValue.textContent = '$' + amount.toLocaleString();
        tenureValue.textContent = tenure + ' Months';
        interestValue.textContent = interest + '%';

        // Calculate EMI
        const monthlyInterest = interest / 12 / 100;
        const emi = amount * monthlyInterest * Math.pow(1 + monthlyInterest, tenure) / 
                    (Math.pow(1 + monthlyInterest, tenure) - 1);
        
        const totalPayable = emi * tenure;
        const totalInterestAmount = totalPayable - amount;

        // Update results
        emiValue.textContent = '$' + emi.toFixed(2);
        totalInterest.textContent = '$' + totalInterestAmount.toFixed(2);
        totalAmount.textContent = '$' + totalPayable.toFixed(2);
    }

    // Initialize calculator
    updateCalculator();

    // Add event listeners
    amountInput.addEventListener('input', updateCalculator);
    tenureInput.addEventListener('input', updateCalculator);
    interestInput.addEventListener('input', updateCalculator);
}

// Initialize sample data
function initializeSampleData() {
    if (!localStorage.getItem('users')) {
        const sampleUsers = [
            {
                id: 'USR-001001',
                userId: 'demo_user',
                email: 'demo@swiftfund.com',
                password: 'Demo@123',
                fullName: 'Demo User',
                phone: '(555) 123-4567',
                dob: '1985-05-15',
                ssn: '123-45-6789',
                address: '123 Financial District',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                bankName: 'Demo Bank',
                accountType: 'checking',
                routingNumber: '123456789',
                accountNumber: encrypt('987654321'),
                dateRegistered: '2024-01-01',
                status: 'active'
            }
        ];
        
        localStorage.setItem('users', JSON.stringify(sampleUsers));
    }
    
    if (!localStorage.getItem('loanApplications')) {
        const sampleApplications = [
            {
                applicationId: 'SWIFT-123456',
                userId: 'demo_user',
                fullName: 'Demo User',
                email: 'demo@swiftfund.com',
                phone: '(555) 123-4567',
                dob: '1985-05-15',
                ssn: '123-45-6789',
                address: '123 Financial District',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                employmentStatus: 'employed',
                annualIncome: '75000',
                loanAmount: '25000',
                loanPurpose: 'home_improvement',
                loanTerm: '24',
                bankName: 'Demo Bank',
                accountType: 'checking',
                routingNumber: '123456789',
                accountNumber: encrypt('987654321'),
                dateApplied: '2024-01-10',
                status: 'approved',
                reviewedDate: '2024-01-11',
                comments: 'Application approved based on good credit history.'
            }
        ];
        
        localStorage.setItem('loanApplications', JSON.stringify(sampleApplications));
    }
    
    // Initialize admin account
    if (!localStorage.getItem('adminAuth')) {
        localStorage.setItem('adminAuth', btoa('admin:Admin@123'));
    }
}

// Form validation helper
function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'var(--danger)';
        } else {
            input.style.borderColor = 'var(--gray-light)';
        }
    });

    return isValid;
}

// Alert helper
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}
