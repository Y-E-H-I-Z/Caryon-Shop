const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");
const roleSelect = document.getElementById("role");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = roleSelect.value; // "user" o "admin"

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Guardamos token, nombre y rol en localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("userName", data.name);
            localStorage.setItem("userRole", role);

            // Redirigir según rol seleccionado
            if (role === "admin") {
                window.location.href = "admin-dashboard.html";
            } else {
                window.location.href = "user-dashboard.html";
            }
        } else {
            loginMessage.textContent = data.message || "Correo o contraseña incorrectos";
            loginMessage.style.color = "red";
        }
    } catch (error) {
        loginMessage.textContent = "Error de conexión con el servidor";
        loginMessage.style.color = "red";
        console.error(error);
    }
});
