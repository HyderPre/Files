
    document.querySelectorAll('.scroll-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior

            const targetId = this.getAttribute('href'); // Get the target section's ID
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
                    window.scrollTo(0, easedPosition);

                    if (progress < duration) {
                        requestAnimationFrame(step); // Continue scrolling
                    }
                }

                requestAnimationFrame(step); // Start the animation
            }
        });
    });

