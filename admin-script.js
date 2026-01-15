document.addEventListener('DOMContentLoaded', function() {
    // Load applications from localStorage
    loadApplications();
    
    // Modal functionality
    const modal = document.getElementById('applicationModal');
    const closeModal = document.querySelector('.close-modal');
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

function loadApplications() {
    const applications = JSON.parse(localStorage.getItem('loanApplications')) || [];
    
    // Update stats
    document.getElementById('totalApplications').textContent = applications.length;
    document.getElementById('pendingApplications').textContent = applications.filter(app => app.status === 'pending').length;
    document.getElementById('approvedApplications').textContent = applications.filter(app => app.status === 'approved').length;
    
    // Update table
    const tbody = document.getElementById('applicationsTableBody');
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
                <button class="action-btn" onclick="viewApplication(${index})">View</button>
                <button class="action-btn" onclick="approveApplication(${index})" ${app.status === 'approved' ? 'disabled' : ''}>Approve</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function viewApplication(index) {
    const applications = JSON.parse(localStorage.getItem('loanApplications')) || [];
    const app = applications[index];
    
    const modalBody = document.getElementById('modalBody');
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
    
    document.getElementById('applicationModal').style.display = 'flex';
}

function approveApplication(index) {
    const applications = JSON.parse(localStorage.getItem('loanApplications')) || [];
    applications[index].status = 'approved';
    localStorage.setItem('loanApplications', JSON.stringify(applications));
    loadApplications();
    alert('Application approved!');
}
