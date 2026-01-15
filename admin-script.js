document.addEventListener('DOMContentLoaded', function() {
    // Load applications from localStorage
    loadApplications();
    
    // Modal functionality
    const modal = document.getElementById('applicationModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            if (modal) modal.style.display = 'none';
        });
    }
    
    globalThis.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
        
        // Handle view button clicks
        if (event.target.classList.contains('action-btn-view')) {
            const index = parseInt(event.target.dataset.index);
            viewApplication(index);
        }
        
        // Handle approve button clicks
        if (event.target.classList.contains('action-btn-approve')) {
            const index = parseInt(event.target.dataset.index);
            approveApplication(index);
        }
    });
});

function loadApplications() {
    const applications = JSON.parse(localStorage.getItem('loanApplications')) || [];
    
    // Update stats
    const totalEl = document.getElementById('totalApplications');
    const pendingEl = document.getElementById('pendingApplications');
    const approvedEl = document.getElementById('approvedApplications');
    
    if (totalEl) totalEl.textContent = applications.length;
    if (pendingEl) pendingEl.textContent = applications.filter(app => app.status === 'pending').length;
    if (approvedEl) approvedEl.textContent = applications.filter(app => app.status === 'approved').length;
    
    // Update table
    const tbody = document.getElementById('applicationsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (applications.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No applications yet</td></tr>';
        return;
    }
    
    applications.forEach((app, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${app.id}</td>
            <td>${app.fullName}</td>
            <td>${app.email}</td>
            <td>$${app.loanAmount}</td>
            <td><span class="status-${app.status}">${app.status}</span></td>
            <td>
                <button class="action-btn action-btn-view" data-index="${index}">View</button>
                <button class="action-btn action-btn-approve" data-index="${index}" ${app.status === 'approved' ? 'disabled' : ''}>Approve</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function viewApplication(index) {
    const applications = JSON.parse(localStorage.getItem('loanApplications')) || [];
    const app = applications[index];
    
    const modalBody = document.getElementById('modalBody');
    if (!modalBody) return;
    
    modalBody.innerHTML = `
        <div class="application-details">
            <p><strong>Application ID:</strong> ${app.id}</p>
            <p><strong>Name:</strong> ${app.fullName}</p>
            <p><strong>Email:</strong> ${app.email}</p>
            <p><strong>Phone:</strong> ${app.phone}</p>
            <p><strong>Loan Amount:</strong> $${app.loanAmount}</p>
            <p><strong>Purpose:</strong> ${app.loanPurpose}</p>
            <p><strong>Bank Name:</strong> ${app.bankName}</p>
            <p><strong>Routing Number:</strong> ${app.routingNumber}</p>
            <p><strong>User ID:</strong> ${app.userId}</p>
            <p><strong>Date Applied:</strong> ${app.date}</p>
            <p><strong>Status:</strong> ${app.status}</p>
        </div>
    `;
    
    const modal = document.getElementById('applicationModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function approveApplication(index) {
    const applications = JSON.parse(localStorage.getItem('loanApplications')) || [];
    applications[index].status = 'approved';
    localStorage.setItem('loanApplications', JSON.stringify(applications));
    loadApplications();
    alert('Application approved!');
}
