import { assertEquals, assertExists, assert } from "https://deno.land/std@0.200.0/assert/mod.ts";

// Mock localStorage for testing
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

// Set mock localStorage for tests
globalThis.localStorage = mockLocalStorage;

Deno.test("Application submission saves to localStorage", () => {
  // Clear storage
  localStorage.clear();
  
  const testApplication = {
    id: "APP-123",
    fullName: "John Doe",
    email: "john@example.com",
    loanAmount: "10000",
    status: "pending"
  };
  
  // Save application
  let applications = JSON.parse(localStorage.getItem("loanApplications")) || [];
  applications.push(testApplication);
  localStorage.setItem("loanApplications", JSON.stringify(applications));
  
  // Verify
  const saved = JSON.parse(localStorage.getItem("loanApplications"));
  assertEquals(saved.length, 1);
  assertEquals(saved[0].fullName, "John Doe");
  assertEquals(saved[0].status, "pending");
});

Deno.test("Application approval updates status", () => {
  localStorage.clear();
  
  const testApplications = [
    { id: "APP-1", fullName: "Alice", status: "pending" },
    { id: "APP-2", fullName: "Bob", status: "pending" }
  ];
  
  localStorage.setItem("loanApplications", JSON.stringify(testApplications));
  
  // Approve first application
  let applications = JSON.parse(localStorage.getItem("loanApplications"));
  applications[0].status = "approved";
  localStorage.setItem("loanApplications", JSON.stringify(applications));
  
  // Verify
  const saved = JSON.parse(localStorage.getItem("loanApplications"));
  assertEquals(saved[0].status, "approved");
  assertEquals(saved[1].status, "pending");
});

Deno.test("Count applications by status", () => {
  localStorage.clear();
  
  const testApplications = [
    { id: "APP-1", status: "pending" },
    { id: "APP-2", status: "approved" },
    { id: "APP-3", status: "pending" },
    { id: "APP-4", status: "approved" },
    { id: "APP-5", status: "approved" }
  ];
  
  localStorage.setItem("loanApplications", JSON.stringify(testApplications));
  
  const applications = JSON.parse(localStorage.getItem("loanApplications")) || [];
  const pendingCount = applications.filter(app => app.status === "pending").length;
  const approvedCount = applications.filter(app => app.status === "approved").length;
  
  assertEquals(pendingCount, 2);
  assertEquals(approvedCount, 3);
  assertEquals(applications.length, 5);
});
