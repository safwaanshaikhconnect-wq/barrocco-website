document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        // Filter only intersecting entries
        const intersectingEntries = entries.filter(entry => entry.isIntersecting);

        // Sort by DOM order to ensure consistent animation order
        intersectingEntries.sort((a, b) => {
            return (a.target.compareDocumentPosition(b.target) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1;
        });

        let menuCardCount = 0;

        intersectingEntries.forEach((entry) => {
            if (entry.target.classList.contains('menu-card')) {
                // Group by 3: First 3 get 0 delay, next 3 get 200ms delay, etc.
                const batchIndex = Math.floor(menuCardCount / 3);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, batchIndex * 200);
                menuCardCount++;
            } else {
                // Default behavior for other elements
                entry.target.classList.add('visible');
            }
            observer.unobserve(entry.target);
        });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in, .fade-in-down');
    elements.forEach(el => observer.observe(el));
});
