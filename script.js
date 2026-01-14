const container = document.getElementById("container");
const form = document.getElementById("registerForm");
const notification = document.getElementById("notification");
const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strength");
const strengthText = document.getElementById("strengthText");
const regionSelect = document.getElementById("region");
const provinceSelect = document.getElementById("province");
const citySelect = document.getElementById("city");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");

/* SWITCH FORMS */
function showRegister() {
  container.classList.add("active");

  form.reset();

  notification.style.display = "none";
  notification.className = "notification";

  strengthBar.className = "";
  strengthText.textContent = "Password strength";

  provinceSelect.innerHTML = `<option value="">Select Province</option>`;
  citySelect.innerHTML = `<option value="">Select City</option>`;
  provinceSelect.disabled = true;
  citySelect.disabled = true;
}

function showLogin() {
  container.classList.remove("active");
}

/* NAME VALIDATION */
const nameRegex = /^[A-Za-z\s]+$/;

function validateName(input, fieldName) {
  if (!nameRegex.test(input.value.trim())) {
    showNotification(`${fieldName} can only contain letters and spaces. ❌`, "error");
    input.value = input.value.replace(/[^A-Za-z\s]/g, ""); // Remove invalid characters
  }
}

firstNameInput.addEventListener("input", () => validateName(firstNameInput, "First Name"));
lastNameInput.addEventListener("input", () => validateName(lastNameInput, "Last Name"));

/* PASSWORD STRENGTH */
passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  switch (strength) {
    case 1:
      strengthBar.className = "weak";
      strengthText.textContent = "Weak";
      break;
    case 2:
      strengthBar.className = "fair";
      strengthText.textContent = "Fair";
      break;
    case 3:
      strengthBar.className = "good";
      strengthText.textContent = "Good";
      break;
    case 4:
      strengthBar.className = "strong";
      strengthText.textContent = "Strong";
      break;
    case 5:
      strengthBar.className = "very-strong";
      strengthText.textContent = "Very Strong";
      break;
    default:
      strengthBar.className = "";
      strengthText.textContent = "Password strength";
  }
});

/* ADDRESS DATA */
const addressData = {
  metro_manila: { "Metro Manila": ["Manila", "Quezon City", "Makati"] },
  north_luzon: { "Ilocos Norte": ["Laoag"] },
  south_luzon: { "Laguna": ["Calamba", "Biñan"] },
  visayas: { "Cebu": ["Cebu City"] },
  mindanao: { "Davao del Sur": ["Davao City"] }
};

regionSelect.addEventListener("change", () => {
  provinceSelect.innerHTML = `<option value="">Select Province</option>`;
  citySelect.innerHTML = `<option value="">Select City</option>`;
  citySelect.disabled = true;

  if (!regionSelect.value) return;

  provinceSelect.disabled = false;

  for (let p in addressData[regionSelect.value]) {
    provinceSelect.add(new Option(p, p));
  }
});

provinceSelect.addEventListener("change", () => {
  citySelect.innerHTML = `<option value="">Select City</option>`;
  citySelect.disabled = false;

  addressData[regionSelect.value][provinceSelect.value]
    .forEach(c => citySelect.add(new Option(c, c)));
});

/* NOTIFICATION FUNCTION */
function showNotification(message, type) {
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.style.display = "block";

  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}