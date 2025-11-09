import "./style.css";

const q = (s) => document.querySelector(s);
const form = q("#login-form");
const emailInput = q("#email");
const passwordInput = q("#password");
const toggleBtn = q("#openEye");
const submitMessage = q("#submit-message");

function setFieldError(input, msg) {
  const el = input.closest(".field").querySelector(".field-error");
  el.textContent = msg || "";
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    toggleBtn.textContent = isHidden ? "Hide" : "Show";
    toggleBtn.setAttribute("aria-pressed", String(isHidden));
    toggleBtn.setAttribute(
      "aria-label",
      isHidden ? "Hide password" : "Show password"
    );
  });
}

if (form) {
  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    // clear previous messages
    setFieldError(emailInput, "");
    setFieldError(passwordInput, "");
    submitMessage.textContent = "";

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    let ok = true;
    if (!email) {
      setFieldError(emailInput, "Email is required");
      ok = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setFieldError(emailInput, "Enter a valid email");
      ok = false;
    }

    if (!password) {
      setFieldError(passwordInput, "Password is required");
      ok = false;
    } else if (password.length < 6) {
      setFieldError(passwordInput, "Password must be at least 6 characters");
      ok = false;
    }

    if (!ok) return;

    // fake async login
    submitMessage.textContent = "Signing in...";
    try {
      await new Promise((r) => setTimeout(r, 900));
      // fake success
      submitMessage.textContent = "Signed in — redirecting...";
      // simulate redirect
      setTimeout(() => {
        submitMessage.textContent = "Welcome! (no real backend in this demo)";
      }, 700);
    } catch (err) {
      submitMessage.textContent = "Unexpected error";
    }
  });
}
