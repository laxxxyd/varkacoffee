document.addEventListener('DOMContentLoaded', () => {
    // --- Burger Menu Toggle ---
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav__link');

    function toggleMenu() {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }

    burger.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // --- Sticky Header Scroll Effect ---
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Form Validation & Simulated Submission ---
    const form = document.getElementById('feedbackForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('formSuccess');

    // Simple phone mask formatting helper
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.startsWith('7') || value.startsWith('8')) {
            value = value.substring(1);
        }
        let formatted = '+7 ';
        if (value.length > 0) {
            formatted += '(' + value.substring(0, 3);
        }
        if (value.length >= 3) {
            formatted += ') ' + value.substring(3, 6);
        }
        if (value.length >= 6) {
            formatted += '-' + value.substring(6, 8);
        }
        if (value.length >= 8) {
            formatted += '-' + value.substring(8, 10);
        }
        e.target.value = value.length === 0 ? '' : formatted;
    });

    function validateField(input, condition) {
        const group = input.closest('.form__group');
        if (!condition) {
            group.classList.add('has-error');
            input.classList.add('error');
            return false;
        } else {
            group.classList.remove('has-error');
            input.classList.remove('error');
            return true;
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const isNameValid = validateField(nameInput, nameInput.value.trim().length >= 2);
        
        // Check phone validity (at least 10 digits entered after +7)
        const rawPhone = phoneInput.value.replace(/\D/g, '');
        const isPhoneValid = validateField(phoneInput, rawPhone.length >= 10);
        
        const isMessageValid = validateField(messageInput, messageInput.value.trim().length >= 5);

        if (isNameValid && isPhoneValid && isMessageValid) {
            // --- DEMONSTRATION SUBMISSION VIA JAVASCRIPT ---
            // NOTE: Since backend is not implemented in this static template, 
            // you can connect this part to a real API endpoint or backend service 
            // (e.g., fetch('https://your-api-url.com/contact', { method: 'POST', body: ... }))
            
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.textContent = 'ОТПРАВКА...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = 'ОТПРАВИТЬ';
                submitBtn.disabled = false;
                successMessage.style.display = 'block';
                form.reset();

                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 6000);
            }, 1000);
        }
    });

    // Real-time input error clearing on typing
    [nameInput, phoneInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                input.classList.remove('error');
                input.closest('.form__group').classList.remove('has-error');
            }
        });
    });
});
