// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('verification-form');
  const employeeIdInput = document.getElementById('employee-id');
  const companyNameInput = document.getElementById('company-name');
  const verificationCodeInput = document.getElementById('verification-code');
  const submitBtn = document.getElementById('submit-btn');
  const verificationResultDiv = document.getElementById('verification-result');

  // Add event listener to submit button
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Get input values
    const employeeId = parseInt(employeeIdInput.value);
    const companyName = companyNameInput.value;
    const verificationCode = verificationCodeInput.value;

    // Input validation
    if (!employeeId || !companyName || !verificationCode) {
      verificationResultDiv.innerText = "Please fill in all fields";
      verificationResultDiv.style.color = "red";
      return;
    }

    // API endpoint URL
    const apiUrl = '/api/EmployeeVerification';

    // Create API request payload
    const payload = {
      employeeId,
      companyName,
      verificationCode
    };

    // Make API call using Fetch API
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
      if (data.verified) {
        verificationResultDiv.innerText = "Verified";
        verificationResultDiv.style.color = "green";
      } else {
        verificationResultDiv.innerText = "Not Verified";
        verificationResultDiv.style.color = "red";
      }
    })
    .catch(error => {
      console.error('Error:', error);
      verificationResultDiv.innerText = "Error verifying employment";
      verificationResultDiv.style.color = "red";
    });
  });
});
