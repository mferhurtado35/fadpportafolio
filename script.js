
/* =========================================
   1. MENÚ DE NAVEGACIÓN RESPONSIVO
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-navigation");

    if (menuToggle && navigation) {
        const closeMenu = () => {
            navigation.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menú");
        };

        menuToggle.addEventListener("click", () => {
            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            navigation.classList.toggle("is-open", !isOpen);

            menuToggle.setAttribute("aria-expanded", String(!isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Abrir menú" : "Cerrar menú"
            );
        });

        navigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
                menuToggle.focus();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth >= 900) {
                closeMenu();
            }
        });
    }


    /* =========================================
       2. FORMULARIO DE CONTACTO
       ========================================= */

    const contactForm = document.querySelector("#contact-form");
    const feedback = document.querySelector("#form-feedback");

    if (contactForm && feedback) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            feedback.textContent = "";
            feedback.className = "form-feedback";

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();

                feedback.textContent =
                    "Por favor, revisa los campos e inténtalo de nuevo.";

                feedback.classList.add("error");
                return;
            }

            const formData = new FormData(contactForm);

            const name = String(formData.get("name") || "").trim();
            const email = String(formData.get("email") || "").trim();
            const service = String(formData.get("service") || "");
            const message = String(formData.get("message") || "").trim();

            if (!name || !email || !service || !message) {
                feedback.textContent =
                    "Completa todos los campos antes de continuar.";

                feedback.classList.add("error");
                return;
            }

            console.log("Formulario de contacto de demostración:", {
                name,
                email,
                service,
                message
            });

            feedback.textContent =
                `¡Gracias, ${name}! Tu formulario se ha validado correctamente. ` +
                "Esta es una demostración: el mensaje no se ha enviado por correo.";

            feedback.classList.add("success");

            contactForm.reset();
        });
    }
});
