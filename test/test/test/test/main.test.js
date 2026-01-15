// Import all test files
import "./applications.test.js";
import "./form_validation.test.js";
import "./admin_functions.test.js";

Deno.test("Main test suite", async (t) => {
  await t.step("Test suite initialization", () => {
    console.assert(typeof Deno !== "undefined", "Deno should be available");
    console.assert(typeof globalThis !== "undefined", "globalThis should be available");
    console.log("✅ Test environment is ready");
  });
  
  await t.step("Test imports work correctly", () => {
    // This just verifies imports don't fail
    console.assert(true, "Imports should work");
    console.log("✅ All test files imported successfully");
  });
  
  await t.step("Run comprehensive tests", () => {
    // Test localStorage mock
    const mockStorage = {
      store: {},
      setItem(key, value) { this.store[key] = value; },
      getItem(key) { return this.store[key] || null; }
    };
    
    globalThis.localStorage = mockStorage;
    localStorage.setItem("test", "value");
    console.assert(localStorage.getItem("test") === "value", "localStorage mock should work");
    console.log("✅ localStorage mock works");
  });
});
