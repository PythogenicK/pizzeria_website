document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll('.container');
    let stickyTops = [];
    let containerHeights = [];

    function calculatePositions() {
        let accumulatedHeight = 0;
        stickyTops = [];
        containerHeights = [];
        
        containers.forEach(container => {
            stickyTops.push(accumulatedHeight);
            const height = container.offsetHeight;
            containerHeights.push(height);
            accumulatedHeight += height;
        });
    }

    function updateContainers() {
        const scrollY = window.scrollY;
        let stickyHeight = 0;

        containers.forEach((container, index) => {
            if (scrollY + stickyHeight >= stickyTops[index]) {
                container.style.position = 'sticky';
                container.style.top = `${stickyHeight}px`;
                stickyHeight += containerHeights[index];
            } else {
                container.style.position = 'relative';
                container.style.top = '0';
            }
        });
    }

    window.addEventListener('scroll', updateContainers);
    window.addEventListener('resize', () => {
        calculatePositions();
        updateContainers();
    });

    calculatePositions();
    updateContainers();
});