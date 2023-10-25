// Smooth scrolling when clicking on navigation links for both up and down scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const offset = 100; // Adjust this value to control the scrolling offset
            const targetPosition = targetElement.offsetTop - offset;
            const currentPosition = window.scrollY;
            const distance = targetPosition - currentPosition;
            const duration = 1000; // Adjust this value to control the scroll duration
            let start = null;

            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                window.scrollTo(0, easeInOutCubic(progress, currentPosition, distance, duration));
                if (progress < duration) {
                    requestAnimationFrame(step);
                }
            }

            function easeInOutCubic(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            }

            requestAnimationFrame(step);
        }
    });
});
