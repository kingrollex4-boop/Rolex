// Admin Dashboard JavaScript

let applications = [];
let currentPage = 1;
const itemsPerPage = 10;
let filteredApplications = [];

document.addEventListener('DOMContentLoaded', function() {
    // Load applications from localStorage
    loadApplications();
    
    // Initialize charts
    initializeCharts();
    
    // Load initial data
    updateStats();
    renderApplicationsTable();
});

// Load applications from localStorage
function loadApplications() {
    applications = JSON.parse(localStorage.getItem('loanApplications')) || [];
    filteredApplications = [...applications];
}

// Update statistics
function updateStats() {
    const total = applications.length;
    const pending = applications.filter(app => app.status === 'pending').length;
    const approved = applications.filter(app => app.status === 'approved').length;
    const rejected = applications.filter(app => app.status === 'rejected').length;
    
    document.getElementById('totalApplications').textContent = total;
    document.getElementById('pendingApplications').textContent = pending;
    document.getElementById('approvedApplications').textContent = approved;
    document.getElementById('rejectedApplications').textContent = rejected;
    
    updateCharts();
}

// Render applications table
function renderApplicationsTable() {
    const tbody = document.getElementById('applicationsTableBody');
    tbody.innerHTML = '';
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageApplications = filteredApplications.slice(startIndex, endIndex);
    
    if (pageApplications.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 15px; display: block;"></i>
                    <h3>No applications found</h3>
                    <p>Start by submitting loan applications through the main site.</p>
                </td>
            </tr>
        `;
        return;
    }
    
    pageApplications.forEach(app => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${app.id}</td>
            <td>${app.fullName}</td>
            <td>${app.email}</td>
            <td>$${parseInt(app.loanAmount).toLocaleString()}</td>
            <td>${formatLoanPurpose(app.loanPurpose)}</td>
            <td>${app.dateApplied}</td>
            <td><span class="status-badge status-${app.status}">${app.status.toUpperCase()}</span></td>
            <td>
                <div class="table-actions-btn">
                    <button class="action-btn view" onclick="viewApplication('${app.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="action-btn delete" onclick="deleteApplication('${app.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    updatePagination();
}

// Format loan purpose for display
function formatLoanPurpose(purpose) {
    const purposes = {
        'debt_consolidation': 'Debt Consolidation',
        'home_improvement': 'Home Improvement',
        'business': 'Business Investment',
        'education': 'Education',
        'medical': 'Medical Expenses',
        'other': 'Other'
    };
    return purposes[purpose] || purpose;
}

// View application details
function viewApplication(appId) {
    const app = applications.find(a => a.id === appId);
    if (!app) return;
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="application-details-grid">
            <div class="detail-item">
                <label>Application ID</label>
                <div class="value">${app.id}</div>
            </div>
            <div class="detail-item">
                <label>Date Applied</label>
                <div class="value">${app.dateApplied}</div>
            </div>
            <div class="detail-item">
                <label>Full Name</label>
                <div class="value">${app.fullName}</div>
            </div>
            <div class="detail-item">
                <label>Email</label>
                <div class="value">${app.email}</div>
            </div>
            <div class="detail-item">
                <label>Phone</label>
                <div class="value">${app.phone}</div>
            </div>
            <div class="detail-item">
                <label>Date of Birth</label>
                <div class="value">${app.dob}</div>
            </div>
            <div class="detail-item full-width">
                <label>Address</label>
                <div class="value">${app.address}, ${app.city}, ${app.state} ${app.zipCode}</div>
            </div>
            <div class="detail-item">
                <label>Loan Amount</label>
                <div class="value">$${parseInt(app.loanAmount).toLocaleString()}</div>
            </div>
            <div class="detail-item">
                <label>Loan Purpose</label>
                <div class="value">${formatLoanPurpose(app.loanPurpose)}</div>
            </div>
            <div class="detail-item">
                <label>Employment Status</label>
                <div class="value">${app.employmentStatus.replace('_', ' ').toUpperCase()}</div>
            </div>
            <div class="detail-item">
                <label>Annual Income</label>
                <div class="value">$${parseInt(app.annualIncome).toLocaleString()}</div>
            </div>
        </div>
        ${app.additionalInfo ? `
            <div class="detail-item full-width">
                <label>Additional Information</label>
                <div class="value" style="background: #f8f9fa; padding: 15px; border-radius: 8px;">${app.additionalInfo}</div>
            </div>
        ` : ''}
    `;
    
    // Store current app ID for actions
    modalBody.dataset.currentAppId = appId;
    
    // Show modal
    document.getElementById('applicationModal').style.display = 'flex';
}

// Approve application
function approveApplication() {
    const appId = document.getElementById('modalBody').dataset.currentAppId;
    updateApplicationStatus(appId, 'approved');
}

// Reject application
function rejectApplication() {
    const appId = document.getElementById('modalBody').dataset.currentAppId;
    updateApplicationStatus(appId, 'rejected');
}

// Update application status
function updateApplicationStatus(appId, status) {
    const index = applications.findIndex(app => app.id === appId);
    if (index !== -1) {
        applications[index].status = status;
        applications[index].reviewedDate = new Date().toISOString().split('T')[0];
        
        // Save to localStorage
        localStorage.setItem('loanApplications', JSON.stringify(applications));
        
        // Update UI
        updateStats();
        renderApplicationsTable();
        closeModal();
        
        alert(`Application ${appId} has been ${status}.`);
    }
}

// Delete application
function deleteApplication(appId) {
    if (confirm('Are you sure you want to delete this application?')) {
        applications = applications.filter(app => app.id !== appId);
        filteredApplications = filteredApplications.filter(app => app.id !== appId);
        
        // Save to localStorage
        localStorage.setItem('loanApplications', JSON.stringify(applications));
        
        // Update UI
        updateStats();
        renderApplicationsTable();
        
        alert(`Application ${appId} has been deleted.`);
    }
}

// Search applications
function searchTable() {
    const searchTerm = document.getElementById('searchApplications').value.toLowerCase();
    
    if (searchTerm === '') {
        filteredApplications = [...applications];
    } else {
        filteredApplications = applications.filter(app => 
            app.fullName.toLowerCase().includes(searchTerm) ||
            app.email.toLowerCase().includes(searchTerm) ||
            app.id.toLowerCase().includes(searchTerm)
        );
    }
    
    currentPage = 1;
    renderApplicationsTable();
}

// Filter by status
function filterByStatus() {
    const status = document.getElementById('statusFilter').value;
    
    if (status === '') {
        filteredApplications = [...applications];
    } else {
        filteredApplications = applications.filter(app => app.status === status);
    }
    
    currentPage = 1;
    renderApplicationsTable();
}

// Pagination functions
function nextPage() {
    const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderApplicationsTable();
    }
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderApplicationsTable();
    }
}

function updatePagination() {
    const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
}

// Close modal
function closeModal() {
    document.getElementById('applicationModal').style.display = 'none';
}

// Export data
function exportData() {
    const dataStr = JSON.stringify(applications, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `loan-applications-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Refresh data
function refreshData() {
    loadApplications();
    updateStats();
    renderApplicationsTable();
    alert('Data refreshed successfully!');
}

// Charts
let statusChart, trendChart;

function initializeCharts() {
    // Status Chart
    const statusCtx = document.getElementById('statusChart').getContext('2d');
    statusChart = new Chart(statusCtx, {
        type: 'doughnut',
        data: {
            labels: ['Pending', 'Approved', 'Rejected'],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: [
                    '#ff9800',
                    '#4caf50',
                    '#f44336'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Trend Chart
    const trendCtx = document.getElementById('trendChart').getContext('2d');
    trendChart = new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Applications',
                data: [],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function updateCharts() {
    // Update status chart
    const pending = applications.filter(app => app.status === 'pending').length;
    const approved = applications.filter(app => app.status === 'approved').length;
    const rejected = applications.filter(app => app.status === 'rejected').length;
    
    statusChart.data.datasets[0].data = [pending, approved, rejected];
    statusChart.update();
    
    // Update trend chart (last 7 days)
    const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
    }).reverse();
    
    const dailyCounts = last7Days.map(date => {
        return applications.filter(app => app.dateApplied === date).length;
    });
    
    trendChart.data.labels = last7Days.map(date => 
        new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    );
    trendChart.data.datasets[0].data = dailyCounts;
    trendChart.update();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('applicationModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Initialize sample data if none exists
if (!localStorage.getItem('loanApplications')) {
    const sampleApplications = [
        {
            id: 'APP-123456',
            fullName: 'John Smith',
            email: 'john.smith@example.com',
            phone: '(555) 123-4567',
            dob: '1985-05-15',
            address: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            loanAmount: '25000',
            loanPurpose: 'home_improvement',
            employmentStatus: 'employed',
            annualIncome: '75000',
            additionalInfo: 'Planning kitchen renovation',
            status: 'approved',
            dateApplied: '2024-01-10'
        },
        {
            id: 'APP-123457',
            fullName: 'Sarah Johnson',
            email: 'sarah.j@example.com',
            phone: '(555) 987-6543',
            dob: '1990-08-22',
            address: '456 Oak Ave',
            city: 'Los Angeles',
            state: 'CA',
            zipCode: '90001',
            loanAmount: '15000',
            loanPurpose: 'debt_consolidation',
            employmentStatus: 'self_employed',
            annualIncome: '65000',
            additionalInfo: 'Credit card debt consolidation',
            status: 'pending',
            dateApplied: '2024-01-12'
        },
        {
            id: 'APP-123458',
            fullName: 'Robert Chen',
            email: 'r.chen@example.com',
            phone: '(555) 456-7890',
            dob: '1978-11-30',
            address: '789 Pine St',
            city: 'Chicago',
            state: 'IL',
            zipCode: '60601',
            loanAmount: '50000',
            loanPurpose: 'business',
            employmentStatus: 'employed',
            annualIncome: '120000',
            additionalInfo: 'Starting new business venture',
            status: 'rejected',
            dateApplied: '2024-01-08'
        }
    ];
    
    localStorage.setItem('loanApplications', JSON.stringify(sampleApplications));
}
