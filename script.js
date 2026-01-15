// Main JavaScript for Quick Lending Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Loan Amount Slider
    const loanAmountInput = document.getElementById('loanAmount');
    const amountRange = document.getElementById('amountRange');
    
    if (loanAmountInput && amountRange) {
        // Sync slider with input
        amountRange.addEventListener('input', function() {
            loanAmountInput.value = this.value;
        });
        
        // Sync input with slider
        loanAmountInput.addEventListener('input', function() {
            amountRange.value = this.value;
        });
    }

    // Form Submission
    const loanForm = document.getElementById('loanForm');
    
    if (loanForm) {
        loanForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                id: generateApplicationId(),
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                dob: document.getElementById('dob').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                zipCode: document.getElementById('zipCode').value,
                loanAmount: document.getElementById('loanAmount').value,
                loanPurpose: document.getElementById('loanPurpose').value,
                employmentStatus: document.getElementById('employmentStatus').value,
                annualIncome: document.getElementById('annualIncome').value,
                additionalInfo: document.getElementById('additionalInfo').value,
                status: 'pending',
                dateApplied: new Date().toISOString().split('T')[0],
                timestamp: new Date().toISOString()
            };

            // Save to localStorage
            saveApplication(formData);
            
            // Show success message
            alert('Application submitted successfully! Your application ID: ' + formData.id);
            
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }

    // Initialize form date limits
    const dobInput = document.getElementById('dob');
    if (dobInput) {
        const today = new Date();
        const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        dobInput.max = minDate.toISOString().split('T')[0];
    }
});

// Generate unique application ID
function generateApplicationId() {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return 'APP-' + timestamp + random;
}

// Save application to localStorage
function saveApplication(application) {
    let applications = JSON.parse(localStorage.getItem('loanApplications')) || [];
    applications.push(application);
    localStorage.setItem('loanApplications', JSON.stringify(applications));
}
