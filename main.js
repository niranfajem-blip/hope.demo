document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const successOverlay = document.getElementById('successOverlay');
    const resetBtn = document.getElementById('resetBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Show Loading Spinner
            if (loadingOverlay) loadingOverlay.classList.add('active');

            // Simulate Network Delay (for effect)
            setTimeout(() => {
                // Get Values
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const company = document.getElementById('company').value;
                const inquiryType = document.getElementById('inquiry-type').value;
                const message = document.getElementById('message').value;

                // Construct Subject and Body (Same as before)
                const subject = `New Contact Inquiry: ${inquiryType}`;
                const body = `Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company}
Inquiry Type: ${inquiryType}

Message:
${message}`;

                // Create Mailto Link
                const mailtoLink = `mailto:info@hopesconnect.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                // Open Email Client
                window.location.href = mailtoLink;

                // Hide Loading & Show Success
                if (loadingOverlay) loadingOverlay.classList.remove('active');
                if (successOverlay) successOverlay.classList.add('active');

            }, 1500); // 1.5s delay
        });
    }

    // Reset Button Handler
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (successOverlay) successOverlay.classList.remove('active');
            contactForm.reset();
        });
    }

    // Auto-fill form from URL parameters (e.g. ?service=Project+Management)
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');

    if (serviceParam && contactForm) {
        const inquirySelect = document.getElementById('inquiry-type');
        const messageBox = document.getElementById('message');

        // Try to match specific options, otherwise default to "Request a Quote"
        // and put the service name in the message body
        let matchFound = false;

        if (inquirySelect) {
            for (let i = 0; i < inquirySelect.options.length; i++) {
                if (inquirySelect.options[i].value === serviceParam) {
                    inquirySelect.selectedIndex = i;
                    matchFound = true;
                    break;
                }
            }

            if (!matchFound) {
                // Default to 'Request a Quote' for specific services
                inquirySelect.value = "Request a Quote";
            }
        }

        if (messageBox) {
            messageBox.value = `I am interested in learning more about your ${serviceParam} services.`;
        }
    }
});
