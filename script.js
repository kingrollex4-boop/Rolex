// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Form submission for localStorage
    const loanForm = document.getElementById('loanForm');
    if (loanForm) {
        loanForm.addEventListener('submit', function(e) {
            // Get form data
            const formData = {
                id: 'APP-' + Date.now(),
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                loanAmount: document.getElementById('loanAmount').value,
                loanPurpose: document.getElementById('loanPurpose').value,
                bankName: document.getElementById('bankName').value,
                routingNumber: document.getElementById('routingNumber').value,
                userId: document.getElementById('userId').value,
                date: new Date().toLocaleString(),
                status: 'pending'
            };

            // Save to localStorage
            let applications = JSON.parse(localStorage.getItem('loanApplications')) || [];
            applications.push(formData);
            localStorage.setItem('loanApplications', JSON.stringify(applications));

            // Show success message
            alert('Application submitted! Saved to localStorage and sent to Netlify.');
        });
    }
});
