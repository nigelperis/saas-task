async function register() {
  try {
    const res = await fetch(`${CONFIG.API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: document.getElementById("r-name").value,
        email: document.getElementById("r-email").value,
        password: document.getElementById("r-pass").value,
        organizationName: document.getElementById("r-org").value,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.message || "Registration failed");
      return;
    }

    if (res.ok) {
      document.getElementById("r-name").value = "";
      document.getElementById("r-email").value = "";
      document.getElementById("r-pass").value = "";
      document.getElementById("r-org").value = "";

      alert("Registered successfully. Please login.");
    }

    alert("Registered successfully. Please login.");
  } catch (err) {
    console.error("Register error:", err);
  }
}

async function login() {
  try {
    const res = await fetch(`${CONFIG.API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: document.getElementById("l-email").value,
        password: document.getElementById("l-pass").value,
      }),
    });

    console.log("Login response status:", res.status);

    if (!res.ok) {
      const err = await res.json();
      alert(err.message || "Login failed");
      return;
    }

    const data = await res.json();
    console.log("Login response data:", data);

    localStorage.setItem("token", data.token);

    window.location.href = "tasks.html";
  } catch (err) {
    console.error("Login error:", err);
  }
}
