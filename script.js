const container = document.getElementById("container");
const form = document.getElementById("registerForm");
const notification = document.getElementById("notification");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strength");
const strengthText = document.getElementById("strengthText");
const regionSelect = document.getElementById("region");
const provinceSelect = document.getElementById("province");
const citySelect = document.getElementById("city");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirm = document.getElementById("confirmPassword").value;
  const terms = document.getElementById("terms").checked;

  const nameRegex = /^[A-Za-z\s]{2,}$/;
  const phoneRegex = /^09\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  if (!nameRegex.test(firstName))
    return showNotification("Invalid first name ❌", "error");

  if (!nameRegex.test(lastName))
    return showNotification("Invalid last name ❌", "error");

  if (!phoneRegex.test(phone))
    return showNotification("Phone must be 09XXXXXXXXX ❌", "error");

  if (!emailRegex.test(email))
    return showNotification("Invalid email address ❌", "error");

  if (!passwordRegex.test(password))
    return showNotification("Weak password ❌", "error");

  if (password !== confirm)
    return showNotification("Passwords do not match ❌", "error");

  if (!terms)
    return showNotification("Accept the terms ❌", "error");

  showNotification("Registration successful ✅", "success");
});

function showNotification(message, type) {
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.style.display = "block";

  setTimeout(() => notification.style.display = "none", 3000);
}


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

/* PASSWORD STRENGTH */
passwordInput.addEventListener("input", () => {
  const value = passwordInput.value;
  let strength = 0;

  if (value.length >= 8) strength++;
  if (/[A-Z]/.test(value)) strength++;
  if (/[a-z]/.test(value)) strength++;
  if (/[0-9]/.test(value)) strength++;
  if (/[^A-Za-z0-9]/.test(value)) strength++;

  strengthBar.className = "";

  if (strength <= 2) {
    strengthBar.classList.add("strength-weak");
    strengthText.textContent = "Weak password";
  } else if (strength <= 4) {
    strengthBar.classList.add("strength-medium");
    strengthText.textContent = "Medium strength";
  } else {
    strengthBar.classList.add("strength-strong");
    strengthText.textContent = "Strong password";
  }
});

/* FORM SUBMIT */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const password = passwordInput.value;
  const confirm = document.getElementById("confirmPassword").value;
  const terms = document.getElementById("terms").checked;

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  if (!regex.test(password))
    return showNotification("Password requirements not met ❌", "error");

  if (password !== confirm)
    return showNotification("Passwords do not match ❌", "error");

  if (!terms)
    return showNotification("You must accept the terms ❌", "error");

  showNotification("Registration successful ✅", "success");
});

/* NOTIFICATION */
function showNotification(message, type) {
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.style.display = "block";

  setTimeout(() => notification.style.display = "none", 3000);
}

/* ADDRESS DATA */
const addressData = {
  metro_manila: { "Metro Manila": ["Manila","Quezon City","Makati"] },
  north_luzon: { "Ilocos Norte": ["Laoag"] },
  south_luzon: { "Laguna": ["Calamba","Biñan"] },
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
