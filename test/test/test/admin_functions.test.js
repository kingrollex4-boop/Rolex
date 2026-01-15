import { assertEquals, assert } from "https://deno.land/std@0.200.0/assert/mod.ts";

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
  
  assertEquals(applications.length, 2);
  assertEquals(applications[0].fullName, "Alice Johnson");
  assertEquals(applications[1].status, "approved");
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
  
  assertEquals(stats.total, 6);
  assertEquals(stats.pending, 3);
  assertEquals(stats.approved, 2);
  assertEquals(stats.rejected, 1);
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
  assertEquals(johnResults.length, 2); // John Doe and Bob Johnson
  
  const exampleResults = searchApplications(applications, "example");
  assertEquals(exampleResults.length, 3); // All have example.com
  
  const noResults = searchApplications(applications, "xyz");
  assertEquals(noResults.length, 0);
});
