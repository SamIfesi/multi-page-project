const q = (s) => document.getElementById(s);
const u = (s) => document.querySelector(s);
const form = q("login-form");
const emailInput = q("email");
const passwordInput = q("password");
const submitMessage = q("submit-message");
const passView = document.querySelectorAll(".show-password");
const errorMsg = document.querySelectorAll(".field-error");
const emailErr = document.getElementById("emailErr");
const passErr = document.getElementById("passErr");

if (passView) {
  passView.forEach((pass) => {
    pass.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
      passView.forEach((pass) => pass.classList.toggle("hide"));
    });
  });
}

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let ok = true;
    if (!email) {
      emailErr.innerText = "Email is required";
      setTimeout(() => {
        errorMsg.forEach((err) => (err.innerText = ""));
      }, 5000);
      ok = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      emailErr.innerText = "Enter a valid email";
      setTimeout(() => {
        errorMsg.forEach((err) => (err.innerText = ""));
      }, 5000);
      ok = false;
    }

    if (!password) {
      passErr.innerText = "Password is required";
      ok = false;
      setTimeout(() => {
        errorMsg.forEach((err) => (err.innerText = ""));
      }, 5000);
    } else if (password.length < 6) {
      passErr.innerText = "Password must be at least 6 characters";
      setTimeout(() => {
        errorMsg.forEach((err) => (err.innerText = ""));
      }, 5000);
      ok = false;
    }

    if (!ok) return;

    // fake async login
    submitMessage.textContent = "Signing in...";
    try {
      await new Promise((r) => setTimeout(r, 900));
      // fake success
      submitMessage.textContent = "Signed in — redirecting...";
      setTimeout(() => {
        submitMessage.textContent = "Welcome! You have successfully logged in.";
      }, 700);
      setTimeout(() => {
        window.location.href = "/sign-up.html";
        submitMessage.textContent = "";
        errorMsg.forEach((err) => (err.innerText = ""));
        emailInput.value = "";
        passwordInput.value = "";
      }, 100);
    } catch (err) {
      submitMessage.textContent = "Unexpected error";
    }
  });
}

// const q = (s) => document.getElementById(s);
// const u = (s) => document.querySelector(s);
// const form = q("login-form");
// const emailInput = q("email");
// const passwordInput = q("password");
// const submitMessage = q("submit-message");
// const passView = document.querySelectorAll(".show-password");

// if (form) {
//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     emailInput.value = "";
//     passwordInput.value = "";
//     submitMessage.textContent = "";

//     const email = emailInput.value.trim();
//     const password = passwordInput.value.trim();

//     let ok = true;
//     if (!email) {
//       emailErr.innerText = "Email is required";
//       ok = false;
//     } else if (!/^\S+@\S+\.\S+$/.test(email)) {
//       emailErr.innerText = "Enter a valid email";
//       ok = false;
//     }

//     if (!password) {
//       passErr.innerText = "Password is required";
//       ok = false;
//     } else if (password.length < 6) {
//       passErr.innerText = "Password must be at least 6 characters";
//       ok = false;
//     }

//     if (!ok) return;

//     // fake async login
//     submitMessage.textContent = "Signing in...";
//     try {
//       await new Promise((r) => setTimeout(r, 900));
//       // fake success
//       submitMessage.textContent = "Signed in — redirecting...";
//       // simulate redirect
//       setTimeout(() => {
//         submitMessage.textContent = "Welcome! You have successfully logged in.";
//       }, 700);
//     } catch (err) {
//       submitMessage.textContent = "Unexpected error";
//     }
//   });
// }
