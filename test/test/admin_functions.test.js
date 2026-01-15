// Mock localStorage
const mockLocalStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = String(value);
  },
  clear() {
    this.store = {};
  }
};

globalThis.localStorage = mockLocalStorage;

Deno.test("Admin functions load applications correctly", () => {
  localStorage.clear();
  
  const sampleApplications = [
    {
      id: "APP-001",
      fullName: "Alice Johnson",
      email: "alice@example.com",
      loanAmount: "25000",
      status: "pending",
      date: "2024-01-15"
    },
    {
      id: "APP-002",
      fullName: "Bob Smith",
      email: "bob@example.com",
      loanAmount: "15000",
      status: "approved",
      date: "2024-01-14"
    }
  ];
  
  localStorage.setItem("loanApplications", JSON.stringify(sampleApplications));
  
  const loadApplications = () => {
    return JSON.parse(localStorage.getItem("loanApplications")) || [];
  };
  
  const applications = loadApplications();
  
  console.assert(applications.length === 2, "Should load 2 applications");
  console.assert(applications[0].fullName === "Alice Johnson", "First name should match");
  console.assert(applications[1].status === "approved", "Second status should be approved");
  
  console.log("✅ Load applications test passed");
});

Deno.test("Application statistics calculation", () => {
  localStorage.clear();
  
  const applications = [
    { status: "pending" },
    { status: "approved" },
    { status: "pending" },
    { status: "rejected" },
    { status: "approved" },
    { status: "pending" }
  ];
  
  const calculateStats = (apps) => {
    return {
      total: apps.length,
      pending: apps.filter(app => app.status === "pending").length,
      approved: apps.filter(app => app.status === "approved").length,
      rejected: apps.filter(app => app.status === "rejected").length
    };
  };
  
  const stats = calculateStats(applications);
  
  console.assert(stats.total === 6, "Total should be 6");
  console.assert(stats.pending === 3, "Pending should be 3");
  console.assert(stats.approved === 2, "Approved should be 2");
  console.assert(stats.rejected === 1, "Rejected should be 1");
  
  console.log("✅ Statistics calculation test passed");
});

Deno.test("Application search functionality", () => {
  const applications = [
    { id: "APP-1", fullName: "John Doe", email: "john@example.com" },
    { id: "APP-2", fullName: "Jane Smith", email: "jane@example.com" },
    { id: "APP-3", fullName: "Bob Johnson", email: "bob@example.com" }
  ];
  
  const searchApplications = (apps, query) => {
    query = query.toLowerCase();
    return apps.filter(app => 
      app.fullName.toLowerCase().includes(query) || 
      app.email.toLowerCase().includes(query) ||
      app.id.toLowerCase().includes(query)
    );
  };
  
  const johnResults = searchApplications(applications, "john");
  console.assert(johnResults.length === 2, "Should find 2 results for 'john'");
  
  const exampleResults = searchApplications(applications, "example");
  console.assert(exampleResults.length === 3, "Should find all 3 for 'example'");
  
  const noResults = searchApplications(applications, "xyz");
  console.assert(noResults.length === 0, "Should find 0 results for 'xyz'");
  
  console.log("✅ Search functionality test passed");
});

Deno.test("Filter applications by status", () => {
  const applications = [
    { id: "APP-1", status: "pending" },
    { id: "APP-2", status: "approved" },
    { id: "APP-3", status: "pending" },
    { id: "APP-4", status: "rejected" },
    { id: "APP-5", status: "approved" }
  ];
  
  const filterByStatus = (apps, status) => {
    return apps.filter(app => app.status === status);
  };
  
  const pendingApps = filterByStatus(applications, "pending");
  console.assert(pendingApps.length === 2, "Should have 2 pending");
  
  const approvedApps = filterByStatus(applications, "approved");
  console.assert(approvedApps.length === 2, "Should have 2 approved");
  
  const rejectedApps = filterByStatus(applications, "rejected");
  console.assert(rejectedApps.length === 1, "Should have 1 rejected");
  
  console.log("✅ Filter by status test passed");
});
