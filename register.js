const registerForm = document.getElementById("register-form");
const registerMessage = document.getElementById("register-message");
const roleSelect = document.getElementById("role");
const adminSecretGroup = document.getElementById("admin-secret-group");

// Mostrar u ocultar campo de clave secreta según rol
roleSelect.addEventListener("change", () => {
    if (roleSelect.value === "admin") {
        adminSecretGroup.style.display = "block";
    } else {
        adminSecretGroup.style.display = "none";
    }
});

// Manejo del formulario
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = roleSelect.value;
    const adminSecret = document.getElementById("adminSecret").value;

    // Validar clave secreta si es admin (ejemplo)
    if (role === "admin" && adminSecret !== "CaryonAdmin2025") {
        registerMessage.textContent = "Clave de administrador incorrecta";
        registerMessage.style.color = "red";
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role })
        });

        const data = await response.json();

        if (response.ok) {
            registerMessage.textContent = "Registro exitoso, redirigiendo al login...";
            registerMessage.style.color = "green";
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        } else {
            registerMessage.textContent = data.message || "Error en el registro";
            registerMessage.style.color = "red";
        }
    } catch (error) {
        registerMessage.textContent = "Error de conexión con el servidor";
        registerMessage.style.color = "red";
        console.error(error);
    }
});
