import { assertEquals, assertThrows } from "https://deno.land/std@0.200.0/assert/mod.ts";

Deno.test("Form validation helper functions", () => {
  // Test application ID generation
  const generateAppId = () => {
    return 'APP-' + Date.now().toString().slice(-6);
  };
  
  const id1 = generateAppId();
  const id2 = generateAppId();
  
  assert(id1.startsWith('APP-'));
  assert(id1.length >= 10);
  assert(id1 !== id2); // Different timestamps
  
  // Test encryption/decryption
  const encrypt = (text) => {
    return btoa(text).split('').reverse().join('');
  };
  
  const decrypt = (text) => {
    return atob(text.split('').reverse().join(''));
  };
  
  const secret = "123456789";
  const encrypted = encrypt(secret);
  const decrypted = decrypt(encrypted);
  
  assertEquals(decrypted, secret);
  assert(encrypted !== secret); // Should be different
});

Deno.test("Form data validation", () => {
  const validateFormData = (data) => {
    const errors = [];
    
    if (!data.fullName || data.fullName.trim().length < 2) {
      errors.push("Full name must be at least 2 characters");
    }
    
    if (!data.email || !data.email.includes('@')) {
      errors.push("Valid email required");
    }
    
    if (!data.loanAmount || data.loanAmount < 1000 || data.loanAmount > 100000) {
      errors.push("Loan amount must be between $1,000 and $100,000");
    }
    
    if (!data.routingNumber || !/^\d{9}$/.test(data.routingNumber)) {
      errors.push("Routing number must be 9 digits");
    }
    
    return errors;
  };
  
  // Test valid data
  const validData = {
    fullName: "John Doe",
    email: "john@example.com",
    loanAmount: 15000,
    routingNumber: "123456789"
  };
  
  const validErrors = validateFormData(validData);
  assertEquals(validErrors.length, 0);
  
  // Test invalid data
  const invalidData = {
    fullName: "J",
    email: "invalid-email",
    loanAmount: 500,
    routingNumber: "123"
  };
  
  const invalidErrors = validateFormData(invalidData);
  assertEquals(invalidErrors.length, 4);
});
