// Smooth Scrolling for Navigation Links
document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor behavior

        const targetId = this.getAttribute('href'); // Get target section's ID
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerOffset = 80; // Adjust for header height
            const elementPosition = targetElement.offsetTop - headerOffset;
            const startPosition = window.pageYOffset;
            const distance = elementPosition - startPosition;
            const duration = 1500; // Adjust this value to slow it down (in milliseconds)
            let start = null;

            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const ease = progress / duration; // Linear easing
                const easedPosition = startPosition + distance * Math.min(ease, 1); // Eased position
                window.scrollTo({ top: easedPosition, behavior: "smooth" });

                if (progress < duration) {
                    requestAnimationFrame(step); // Continue scrolling
                }
            }

            requestAnimationFrame(step); // Start the animation
        }
    });
});

// Fixing Testimonial Auto-Change Issue
document.addEventListener("DOMContentLoaded", function () {
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');

    if (testimonials.length === 0 || dots.length === 0) return; // Avoid errors if elements are missing

    function changeTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove("active");
            dots[i].classList.remove("active");
        });

        testimonials[index].classList.add("active");
        dots[index].classList.add("active");
    }

    function autoChange() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        changeTestimonial(currentTestimonial);
    }

    // Initial active state
    changeTestimonial(0);

    // Auto change every 4 seconds
    setInterval(autoChange, 4000);

    // Add click event for manual change via dots
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => changeTestimonial(index));
    });
});
